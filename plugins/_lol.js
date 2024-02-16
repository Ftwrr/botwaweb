import Helper from "../lib/helper.js";

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!Helper.isOwner(m)) return;
    const participants = (await m.getChat()).participants.map(v => v.id._serialized);
    conn.sendMessage(m.chat, "gas", { mentions: participants })
}

handler.customPrefix = /^(yok)$/i
handler.command = new RegExp

handler.disabled = true

export default handler;