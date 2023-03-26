let handler = async (m, { conn, usedPrefix, command }) => {
	if (!m.hasQuotedMsg) return m.reply(`Quote message:\n${usedPrefix + command} message`);
	let quoted = await m.getQuotedMessage()
	let quotedOf = quoted.hasQuotedMsg ? await quoted.getQuotedMessage() : quoted
	quotedOf.forward(m.id.remote)
}

handler.help = ['quoted'].map(v => v + ' <message>')
handler.tags = ['tools']
handler.command = /^(get)?quoted|q$/i

export default handler;