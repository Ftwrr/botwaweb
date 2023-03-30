let handler = async (m, { conn, usedPrefix, command, args, text }) => {
	let chat = await m.getChat();
	m.reply('https://chat.whatsapp.com/' + await chat.getInviteCode())
}

handler.help = ['groupinvite']
handler.tags = ['group']
handler.command = /^(group)?invite$/i

handler.group = true
handler.botAdmin = true

export default handler;