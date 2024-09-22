let handler = async (m, { conn, text, usedPrefix, command }) => {
    const participants = (await m.getChat()).participants.map(u => u.id);
    let pesan = m.hasQuotedMsg ? m._data.quotedMsg.body : text
    let teks = participants.map(v => '@' + v.user).join` `
    // if (!teks) return m.reply(`Input text:\n${usedPrefix + command} hello world`)
    conn.sendMessage(m.chat, `${pesan}\n${teks}`, { mentions: participants.map(v => v._serialized) })
}

handler.help = ['tagall'].map(v => v + ' <text>')
handler.tags = ['group']
handler.command = /^(tagall|everyone)$/i

handler.admin = true
handler.group = true

export default handler;