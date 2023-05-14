import Helper from "./lib/helper.js";
import db, { loadDatabase } from "./lib/database.js";
import { plugins } from "./lib/plugins.js";
import { format } from "node:util";
import { fileURLToPath } from "node:url";
import path from "node:path";
import etc from "./etc.js";
import printMessage from "./lib/print.js";
import { conn } from "./main.js";

const isNumber = (x) => typeof x === "number" && !isNaN(x);

export async function handler(chatUpdate) {
  if (!chatUpdate) return;
  let m = chatUpdate;
  if (!m) return;
  if (db.data == null) await loadDatabase();
  try {
    m = m;
    if (!m) return;

    m.sender = (await m.getContact()).id._serialized;
    m.chat = (await m.getChat()).id._serialized;
    m.exp = 0;
    m.limit = false;

    try {
      let user = db.data.users[m.sender];
      if (typeof user !== "object") db.data.users[m.sender] = {};
      if (user) {
        if (!isNumber(user.exp)) user.exp = 0;
        if (!isNumber(user.limit)) user.limit = 10;

        if (!("banned" in user)) user.banned = false;
        if (!("premium" in user)) user.premium = false;
      } else
        db.data.users[m.sender] = {
          exp: 0,
          limit: 10,

          banned: false,
          premium: false,
        };
      let chat = db.data.chats[m.chat];
      if (typeof chat !== "object") db.data.chats[m.chat] = {};
      if (chat) {
        if (!("isBanned" in chat)) chat.isBanned = false;
      } else
        db.data.chats[m.chat] = {
          isBanned: false,
        };
      let settings = db.data.settings[conn.info.wid._serialized];
      if (typeof settings !== "object")
        db.data.settings[conn.info.wid._serialized] = {};
      if (settings) {
        if (!("self" in settings)) settings.self = true;
      } else
        db.data.settings[conn.info.wid._serialized] = {
          self: true,
        };
    } catch (e) {
      console.error(e);
    }
    if (
      !m.fromMe &&
      !Helper.isOwner(m) &&
      db.data.settings[conn.info.wid._serialized].self
    )
      return;
    m.exp += Math.ceil(Math.random() * 10);
    let usedPrefix;
    let _user = db.data?.users?.[m.sender];
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
        m.plugin = name;
        if (m.chat in db.data.chats || m.sender in db.data.users) {
          let chat = db.data.chats[m.chat];
          let user = db.data.users[m.sender];
          if (
            name != "plugins/owner-ban.js" &&
            (chat?.isBanned || user?.banned) &&
            !Helper.isOwner(m)
          )
            return;
          // if (name != 'plugins/owner-ban.js' && user?.banned && !Helper.isOwner(m))
          //   return
        }
        if (plugin.owner && !Helper.isOwner(m)) {
          fail("owner", m);
          continue;
        }
        if (plugin.premium && !Helper.isPrems(m)) {
          fail("premium", m);
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
          fail("private", m);
          continue;
        }
        m.isCommand = true;
        let xp = "exp" in plugin ? parseInt(plugin.exp) : 10;
        m.exp += xp;
        if (
          !Helper.isPrems(m) &&
          plugin.limit &&
          db.data.users[m.sender].limit < plugin.limit * 1
        ) {
          fail("limit", m);
          continue;
        }
        if (plugin.level > _user.level) {
          fail("level", m);
          continue;
        }

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
          if (!Helper.isPrems(m)) m.limit = m.limit || plugin.limit || false;
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
          if (m.limit && !Helper.isPrems(m)) m.reply(+m.limit + " Limits used");
        }
        break;
      }
    }
  } catch (e) {
    console.error(e);
  } finally {
    let user = db.data.stats;
    if (m) {
      if (m.sender && (user = db.data.users[m.sender])) {
        user.exp += m.exp;
        user.limit -= m.limit * 1;
      }
    }
    await printMessage(m, this);
  }
}

export async function participantsUpdate(notification) {
  if (db.data.settings[conn.info.wid._serialized].self) return;
  const contact = []
  for (const contactId of notification.recipientIds) {
    contact.push(await conn.getContactById(contactId))
  }
  console.log(notification)
  switch (notification.type) {
    case 'add':
    case 'invite':
      conn.sendMessage(notification.chatId, `Welcome ${contact.map((v) => `@${v.number}`).join(' ')}`, { mentions: contact })
      break
    case 'remove':
    case 'leave':
      conn.sendMessage(notification.chatId, `Bye ${contact.map((v) => `@${v.number}`).join(' ')}`, { mentions: contact })
      break
  }
}
