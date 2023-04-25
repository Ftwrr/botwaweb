import Helper from "./lib/helper.js";
import { plugins } from "./lib/plugins.js";
import { format } from "node:util";
import { fileURLToPath } from 'node:url';
import path from "node:path";
import etc from "./etc.js";
import printMessage from "./lib/print.js";

export async function handler(chatUpdate) {
  if (!chatUpdate) return;
  let m = chatUpdate;
  try {
    m = m;
    if (!m && !m._data.isNewMsg && !m._data.recvFresh) return;
    if (!m.fromMe && !Helper.isOwner(m) && etc.opts.self) return;
    let usedPrefix;
    const ___dirname = path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      "./plugins"
    );
    for (let name in plugins) {
      let plugin = plugins[name];
      if (!plugin) continue;
      if (plugin.disabled) continue;
      const __filename = path.join(___dirname, name);
      if (typeof plugin.all === "function") {
        try {
          await plugin.all.call(this, m, {
            chatUpdate,
            __dirname: ___dirname,
            __filename,
          });
        } catch (e) {
          console.error(e);
        }
      }
      const str2Regex = (str) => str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
      let _prefix = plugin.customPrefix
        ? plugin.customPrefix
        : this.prefix
        ? this.prefix
        : Helper.prefix;
      let match = (
        _prefix instanceof RegExp // RegExp Mode?
          ? [[_prefix.exec(m.body), _prefix]]
          : Array.isArray(_prefix) // Array?
          ? _prefix.map((p) => {
              let re =
                p instanceof RegExp // RegExp in Array?
                  ? p
                  : new RegExp(str2Regex(p));
              return [re.exec(m.body), re];
            })
          : typeof _prefix === "string" // String?
          ? [
              [
                new RegExp(str2Regex(_prefix)).exec(m.body),
                new RegExp(str2Regex(_prefix)),
              ],
            ]
          : [[[], new RegExp()]]
      ).find((p) => p[1]);
      if (typeof plugin.before === "function") {
        if (
          await plugin.before.call(this, m, {
            match,
            conn: this,
            chatUpdate,
            __dirname: ___dirname,
            __filename,
          })
        )
          continue;
      }
      if (typeof plugin !== "function") continue;
      if ((usedPrefix = (match[0] || "")[0])) {
        let noPrefix = m.body.replace(usedPrefix, "");
        let [command, ...args] = noPrefix.trim().split` `.filter((v) => v);
        args = args || [];
        let _args = noPrefix.trim().split` `.slice(1);
        let text = _args.join` `;
        command = (command || "").toLowerCase();
        let fail = plugin.fail || Helper.dfail; // When failed
        let isAccept =
          plugin.command instanceof RegExp
            ? plugin.command.test(command)
            : Array.isArray(plugin.command)
            ? plugin.command.some((cmd) =>
                cmd instanceof RegExp ? cmd.test(command) : cmd === command
              )
            : typeof plugin.command === "string"
            ? plugin.command === command
            : false;
        if (!isAccept) continue;
        if (plugin.owner && !Helper.isOwner(m)) {
          fail("owner", m);
          continue;
        }
        if (plugin.group && !(await Helper.isGroup(m))) {
          fail("group", m);
          continue;
        } else if (plugin.botAdmin && !(await Helper.isBotAdmin(m))) {
          fail("botAdmin", m);
          continue;
        } else if (plugin.admin && !(await Helper.isAdmin(m))) {
          fail("admin", m);
          continue;
        }
        if (plugin.private && (await Helper.isGroup(m))) {
          fail("private", m, this);
          continue;
        }
        m.isCommand = true;
        let extra = {
          match,
          usedPrefix,
          noPrefix,
          _args,
          args,
          command,
          text,
          conn: this,
          chatUpdate,
          __dirname: ___dirname,
          __filename,
        };
        try {
          await plugin.call(this, m, extra);
        } catch (e) {
          m.error = e;
          console.error(e);
          if (e) {
            let text = format(e);
            for (let key of Object.values(etc.APIKeys))
              text = text.replace(new RegExp(key, "g"), "#HIDDEN#");
            m.reply(text);
          }
        } finally {
          if (typeof plugin.after === "function") {
            try {
              await plugin.after.call(this, m, extra);
            } catch (e) {
              console.error(e);
            }
          }
        }
        break;
      }
    }
  } catch (e) {
    console.error(e);
  } finally {
    await printMessage(m, this);
  }
}