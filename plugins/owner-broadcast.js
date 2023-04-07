let handler = async (m, { conn, args, usedPrefix, command }) => {
	const quoted = await m.getQuotedMessage()
	if (!quoted) return m.reply(`Quote message:\n${usedPrefix + command} message`);
	const chatsArr = await conn.getChats()
	for (let chats of chatsArr) {
		await quoted.forward(chats)
	}

}

handler.help = ['broadcast'].map(v => v + ` <message>`)
handler.tags = ['owner']
handler.command = /^(bc|broadcast)$/i

handler.owner = true

export default handler;