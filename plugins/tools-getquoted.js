let handler = async (m, { conn, usedPrefix, command }) => {
	const quoted = await (await m.getQuotedMessage()).getQuotedMessage()
	if (!quoted) return m.reply(`Quote message:\n${usedPrefix + command} quoted message`);
	await quoted.forward(m.id.remote)
}

handler.help = ['quoted'].map(v => v + ' <message>')
handler.tags = ['tools']
handler.command = /^(get)?quoted|q$/i

export default handler;