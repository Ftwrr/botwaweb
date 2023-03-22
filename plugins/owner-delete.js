let handler = async (m, { conn, usedPrefix, command }) => {
	if (!m.hasQuotedMsg) return m.reply(`Quote message:\n${usedPrefix + command} message`);
	let quoted = await m.getQuotedMessage()
	quoted.delete(true)
}

handler.help = ['delete'].map(v => v + ' <message>')
handler.tags = ['owner']
handler.command = /^del(ete)?$/i

handler.owner = true

export default handler;