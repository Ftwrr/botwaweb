let handler = async (m, { conn, usedPrefix, command, args, text }) => {
	let chat = await m.getChat();
	await chat.leave()
}

handler.help = ['leavegroup']
handler.tags = ['owner']
handler.command = /^leave(gro?up)?$/i

handler.owner = true
handler.group = true

export default handler;