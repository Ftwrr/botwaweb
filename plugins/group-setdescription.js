let handler = async (m, { conn, usedPrefix, command, args, text }) => {
	if (!text) return m.reply(`Input text:\n${usedPrefix + command} hello world`);
	let chat = await m.getChat();
	await chat.setDescription(text)
}

handler.help = ['setdescription'].map(v => v + ' <text>')
handler.tags = ['group']
handler.command = /^set((desc(ription)?)?)$/i

handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler;