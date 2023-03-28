let handler = async (m, { conn, usedPrefix, command, args, text }) => {
	if (!text) return m.reply(`Input ID:\n${usedPrefix + command} 1234567891011`);
	let user = text.split(',').map(v => (v.replace(/[^0-9]/g, '')).replace(/\D/g, '') + '@c.us')
	let chat = await m.getChat();
	await chat.addParticipants(user)
}

handler.help = ['add'].map(v => v + ' <number>')
handler.tags = ['group']
handler.command = /^(add|\+)$/i

handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler;