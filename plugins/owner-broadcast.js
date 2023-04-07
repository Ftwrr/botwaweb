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

// let handler = async (m, { conn, args, usedPrefix, command }) => {
// 	const quoted = await m.getQuotedMessage()
// 	if (!quoted) return m.reply(`Quote message:\n${usedPrefix + command} message`);
// 	const chatsArr = await conn.getChats()
// 	const allArr = []
// 	for (const chats of chatsArr) {
// 		await allArr.push(chats.id._serialized)
// 		if (chats.isGroup) allArr.push(chats.groupMetadata.participants.map(obj => obj.id._serialized))
// 	}
//     const flatArr = (allArr.flat()).filter(item => item !== 'status@broadcast')
//     let uniqueArr = [...new Set(flatArr)];
// 	for (let i of uniqueArr) {
// 		const chatId = await conn.getChatById(i)
// 		await quoted.forward(chatId)
// 	}
// }

// handler.help = ['broadcast'].map(v => v + ` <message>`)
// handler.tags = ['owner']
// handler.command = /^(bc|broadcast)$/i

// handler.owner = true

// export default handler;