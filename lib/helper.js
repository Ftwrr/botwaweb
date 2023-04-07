// @ts-check
//import yargs from 'yargs'
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";
import fs from "node:fs";
import Stream, { Readable } from "node:stream";
import etc from "../etc.js";
import { conn } from "../main.js";

/**
 * @param {ImportMeta | string} pathURL
 * @param {boolean?} rmPrefix if value is `'true'`, it will remove `'file://'` prefix, if windows it will automatically false
 */
const __filename = function filename(
  pathURL = import.meta,
  rmPrefix = os.platform() !== "win32"
) {
  const path =
    /** @type {ImportMeta} */ (pathURL).url || /** @type {String} */ (pathURL);
  return rmPrefix
    ? /file:\/\/\//.test(path)
      ? fileURLToPath(path)
      : path
    : /file:\/\/\//.test(path)
    ? path
    : pathToFileURL(path).href;
};

/** @param {ImportMeta | string} pathURL */
const __dirname = function dirname(pathURL) {
  const dir = __filename(pathURL, true);
  const regex = /\/$/;
  return regex.test(dir)
    ? dir
    : fs.existsSync(dir) && fs.statSync(dir).isDirectory()
    ? dir.replace(regex, "")
    : path.dirname(dir);
};

/** @param {ImportMeta | string} dir */
const __require = function require(dir = import.meta) {
  const path =
    /** @type {ImportMeta} */ (dir).url || /** @type {String} */ (dir);
  return createRequire(path);
};
/** @param {string} file */
const checkFileExists = (file) =>
  fs.promises
    .access(file, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);

/** @type {(name: string, path: string, query: { [Key: string]: any }, apikeyqueryname: string) => string} */
const API = (name, path = "/", query = {}, apikeyqueryname) =>
  (name in etc.APIs ? etc.APIs[name] : name) +
  path +
  (query || apikeyqueryname
    ? "?" +
      new URLSearchParams(
        Object.entries({
          ...query,
          ...(apikeyqueryname
            ? {
                [apikeyqueryname]:
                  etc.APIKeys[name in etc.APIs ? etc.APIs[name] : name],
              }
            : {}),
        })
      )
    : "");

//const opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
const prefix = new RegExp(
  "^[" +
    (etc.prefix || "‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-").replace(
      /[|\\{}()[\]^$+*?.\-\^]/g,
      "\\$&"
    ) +
    "]"
);

/**
 * @param {Readable} stream
 * @param {string} file
 * @returns {Promise<void>}
 */
const saveStreamToFile = (stream, file) =>
  new Promise((resolve, reject) => {
    const writable = stream.pipe(fs.createWriteStream(file));
    writable.once("finish", () => {
      resolve();
      writable.destroy();
    });
    writable.once("error", () => {
      reject();
      writable.destroy();
    });
  });

const kDestroyed = Symbol("kDestroyed");
const kIsReadable = Symbol("kIsReadable");
const isReadableNodeStream = (obj, strict = false) => {
  return !!(
    (
      obj &&
      typeof obj.pipe === "function" &&
      typeof obj.on === "function" &&
      (!strict ||
        (typeof obj.pause === "function" &&
          typeof obj.resume === "function")) &&
      (!obj._writableState || obj._readableState?.readable !== false) && // Duplex
      (!obj._writableState || obj._readableState)
    ) // Writable has .pipe.
  );
};
const isNodeStream = (obj) => {
  return (
    obj &&
    (obj._readableState ||
      obj._writableState ||
      (typeof obj.write === "function" && typeof obj.on === "function") ||
      (typeof obj.pipe === "function" && typeof obj.on === "function"))
  );
};
const isDestroyed = (stream) => {
  if (!isNodeStream(stream)) return null;
  const wState = stream._writableState;
  const rState = stream._readableState;
  const state = wState || rState;
  return !!(stream.destroyed || stream[kDestroyed] || state?.destroyed);
};
const isReadableFinished = (stream, strict) => {
  if (!isReadableNodeStream(stream)) return null;
  const rState = stream._readableState;
  if (rState?.errored) return false;
  if (typeof rState?.endEmitted !== "boolean") return null;
  return !!(
    rState.endEmitted ||
    (strict === false && rState.ended === true && rState.length === 0)
  );
};
const isReadableStream = (stream) => {
  if (typeof Stream.isReadable === "function") return Stream.isReadable(stream);
  if (stream && stream[kIsReadable] != null) return stream[kIsReadable];
  if (typeof stream?.readable !== "boolean") return null;
  if (isDestroyed(stream)) return false;
  return (
    (isReadableNodeStream(stream) &&
      !!stream.readable &&
      !isReadableFinished(stream)) ||
    stream instanceof fs.ReadStream ||
    stream instanceof Readable
  );
};

const dfail = (type, m) => {
  let msg = {
    owner: "Owner only",
    admin: "Admin only",
    group: "Group only",
    botAdmin: "botAdmin only",
    private: "private only",
  }[type];
  if (msg) return m.reply(msg);
};

const isOwner = (m) => {
  const isROwner = (etc.owner + "@c.us").includes(m.author || m.from);
  return isROwner || m.fromMe;
};

const isGroup = async (m) => {
  let chat = await m.getChat();
  return chat.isGroup;
};

const isAdmin = async (m) => {
  const groupChat = await m.getChat();
  const authorIsAdmin = groupChat.participants.find(
    (chatObj) => chatObj.id._serialized === m.author
  )?.isAdmin;
  return authorIsAdmin || isOwner(m);
};

const isBotAdmin = async (m) => {
  const groupChat = await m.getChat();
  const botIsAdmin = groupChat.participants.find(
    (chatObj) => chatObj.id.user === conn.info.wid.user
  )?.isAdmin;
  return botIsAdmin;
};

export default {
  __filename,
  __dirname,
  __require,
  checkFileExists,
  API,

  saveStreamToFile,
  isReadableStream,

  //opts,
  isBotAdmin,
  isGroup,
  isAdmin,
  isOwner,
  dfail,
  prefix,
};
