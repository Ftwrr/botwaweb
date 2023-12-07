import db from "../lib/database.js";

let handler = async (m, { command, usedPrefix }) => {
  let prem = /un/i.test(command);
  let user = m._data.mentionedJidList;
  if (m.hasQuotedMsg) user.push(m._data.quotedParticipant);
  if (user.length !== 0) db.data.users[user[0]].premium = !prem;
  else m.reply(`Mention ID:\n${usedPrefix + command} @user`);
};

handler.help = ["prem", "unprem"].map((v) => v + " <mention>");
handler.command = /^(un)?prem$/i;
handler.tags = ['owner']

handler.owner = true;

export default handler;
