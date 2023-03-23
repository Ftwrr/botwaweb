let handler = async (m, { conn, usedPrefix, command, args, text }) => {
	let user = m._data.mentionedJidList
	if (m.hasQuotedMsg) await user.push(m._data.quotedParticipant)
	if (!user) return m.reply(`Mention ID:\n${usedPrefix + command} @user`);
	let chat = await m.getChat();
	await chat.demoteParticipants(user)
}

handler.help = ['demote'].map(v => v + ' <tag>')
handler.tags = ['group']
handler.command = /^(demote|member|↓)$/i

handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler;