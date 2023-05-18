import db from "../lib/database.js";

export async function before(m) {
  let user = db.data.users[m.sender];
  if (user.afk > -1) {
    m.reply(
      `
  Kamu berhenti AFK${user.afkReason ? " setelah " + user.afkReason : ""}
  Selama ${toTimeString(new Date() - user.afk)}
  `.trim()
    );
    user.afk = -1;
    user.afkReason = "";
  }
  let jids = [
    ...new Set([
      ...(m._data.mentionedJidList || []),
      ...(m.hasQuotedMsg ? [m._data.quotedParticipant] : []),
    ]),
  ];
  for (let jid of jids) {
    let user = db.data.users[jid];
    if (!user) continue;
    let afkTime = user.afk;
    if (!afkTime || afkTime < 0) continue;
    let reason = user.afkReason || "";
    m.reply(
      `
  Jangan tag dia!
  Dia sedang AFK ${reason ? "dengan alasan " + reason : "tanpa alasan"}
  Selama ${toTimeString(new Date() - afkTime)}
  `.trim()
    );
  }
  return true;
}

function toTimeString(number) {
  // const milliseconds = this % 1000
  const seconds = Math.floor((number / 1000) % 60);
  const minutes = Math.floor((number / (60 * 1000)) % 60);
  const hours = Math.floor((number / (60 * 60 * 1000)) % 24);
  const days = Math.floor(number / (24 * 60 * 60 * 1000));
  return (
    (days ? `${days} day(s) ` : "") +
    (hours ? `${hours} hour(s) ` : "") +
    (minutes ? `${minutes} minute(s) ` : "") +
    (seconds ? `${seconds} second(s)` : "")
  ).trim();
}
