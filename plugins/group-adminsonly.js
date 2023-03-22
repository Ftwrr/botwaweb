let handler = async (m, { conn, usedPrefix, command, args, text }) => {
	let chat = await m.getChat();
	if (chat.announce) {
		await chat.setMessagesAdminsOnly(false)
	} else await chat.setMessagesAdminsOnly(true)
}

handler.help = ['adminonly']
handler.tags = ['group']
handler.command = /^admins?only$/i

handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler;