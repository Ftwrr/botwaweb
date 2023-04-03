let handler = async (m, { conn, usedPrefix, command }) => {
	if (!m.hasQuotedMsg) return m.reply(`Quote message:\n${usedPrefix + command} message`);
	const quoted = await m.getQuotedMessage()
	const quotedOf = quoted.hasQuotedMsg ? await quoted.getQuotedMessage() : quoted
	await quotedOf.forward(m.id.remote)
}

handler.help = ['quoted'].map(v => v + ' <message>')
handler.tags = ['tools']
handler.command = /^(get)?quoted|q$/i

export default handler;