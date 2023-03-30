let handler = async (m, { conn, args, usedPrefix, command }) => {
	if (/^(all|y(es)?)$/g.test(args[0])) {
		const chatsArr = await conn.getChats()
		for (let chats of chatsArr) {
			await chats.clearMessages()
		}
	} else {
		await (await m.getChat()).clearMessages()
	}
}

handler.help = ['clearchats'].map(v => v + ` (all)`)
handler.tags = ['owner']
handler.command = /^clearchats?$/i

handler.owner = true

export default handler;