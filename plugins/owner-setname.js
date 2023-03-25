let handler = async (m, { conn, usedPrefix, command, args, text }) => {
	if (!text) return m.reply(`Input text:\n${usedPrefix + command} hello world`);
	await conn.setDisplayName(text)
}

handler.help = ['setdisplayname'].map(v => v + ' <text>')
handler.tags = ['owner']
handler.command = /^set(display)?name$/i

handler.owner = true

export default handler;