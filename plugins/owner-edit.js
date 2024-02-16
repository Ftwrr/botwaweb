let handler = async (m, { conn, usedPrefix, command, text }) => {
	if (!m.hasQuotedMsg) return m.reply(`Quote bot message:\n${usedPrefix + command} bot message`);
	let quoted = await m.getQuotedMessage()
    if (!quoted.fromMe) return m.reply(`Quote bot message:\n${usedPrefix + command} bot message `)
	quoted.edit(text);
}

handler.help = ['edit'].map(v => v + ' <message>')
handler.tags = ['owner']
handler.command = /^edit$/i

handler.owner = true
handler.disabled = true

export default handler;