let handler = async (m, { conn, usedPrefix, command, args, text }) => {
	let user = m._data.mentionedJidList
	if (m.hasQuotedMsg) await user.push(m._data.quotedParticipant)
	if (user.length === 0) return m.reply(`Mention ID:\n${usedPrefix + command} @user`);
	let chat = await m.getChat();
	await chat.removeParticipants(user)
}

handler.help = ['kick'].map(v => v + ' <mention>')
handler.tags = ['group']
handler.command = /^(kick|-)$/i

handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler;