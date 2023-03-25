let handler = async (m, { conn, usedPrefix, command, args, text }) => {
	if (!text) return m.reply(`Input text:\n${usedPrefix + command} hello world`);
	await conn.setStatus(text)
}

handler.help = ['setstatus'].map(v => v + ' <text>')
handler.tags = ['owner']
handler.command = /^setstatus$/i

handler.owner = true

export default handler;