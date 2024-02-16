let handler = async (m, { conn, usedPrefix, command }) => {
	if (!m.hasQuotedMsg) return m.reply(`Quote message:\n${usedPrefix + command} message`);
	let quoted = await m.getQuotedMessage()
	quoted.pin();
}

handler.help = ['delete'].map(v => v + ' <message>')
handler.tags = ['owner']
handler.command = /^pin$/i

handler.admin = true
handler.botAdmin = true

export default handler;