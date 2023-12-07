let handler = async (m, { conn, text, usedPrefix, command }) => {
	const participants = (await m.getChat()).participants.map(v => v.id._serialized);
	let teks = m.hasQuotedMsg ? m._data.quotedMsg.body : text
	if (!teks) return m.reply(`Input text:\n${usedPrefix + command} hello world`)
	conn.sendMessage(m.chat, teks, { mentions: participants })
}

handler.help = ['hidetag'].map(v => v + ' <text>')
handler.tags = ['owner']
handler.command = /^(pengumuman|announce|hiddentag|hidetag)$/i

handler.owner = true
handler.group = true

export default handler;