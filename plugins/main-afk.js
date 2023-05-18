import db from "../lib/database.js";

let handler = async (m, { text }) => {
  let user = db.data.users[m.sender];
  user.afk = +new Date();
  user.afkReason = text;
  m.reply(
    `${(await m.getContact()).pushname} is now AFK${
      text ? ": " + text : ""
    }`.trim()
  );
};
handler.help = ["afk"].map((v) => v + " (reason)");
handler.tags = ["main"];
handler.command = /^afk$/i;

export default handler;
