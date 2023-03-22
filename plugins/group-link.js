let handler = async (m, { conn, usedPrefix, command, args, text }) => {
	let chat = await m.getChat();
	m.reply('https://chat.whatsapp.com/' + await chat.getInviteCode())
}

handler.help = ['grouplink']
handler.tags = ['group']
handler.command = /^(gro?up)?link(gro?up)?$/i

handler.group = true
handler.botAdmin = true

export default handler;