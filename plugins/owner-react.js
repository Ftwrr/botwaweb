let handler = async (m, { conn, usedPrefix, command, args }) => {
	if (!m.hasQuotedMsg) return m.reply(`Quote message:\n${usedPrefix + command} 🗿`);
	let quoted = await m.getQuotedMessage()
	quoted.react(args[0] || '')
}

handler.help = ['reaction'].map(v => v + ' <emoji>')
handler.tags = ['owner']
handler.command = /^react(ion)?$/i

handler.owner = true

export default handler;