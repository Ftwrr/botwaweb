let handler = async (m, { conn, usedPrefix, command, args, text }) => {
	if (!text) return m.reply(`Input text:\n${usedPrefix + command} hello world`);
	const msgArr = await conn.searchMessages(text)
	const message = msgArr.map((v, i) => `*${i + 1}.*\n*Name:* ${v._data.notifyName}\n*ID:* ${JSON.stringify(v._data.from._serialized)}\n*Type:* ${v.type}\n*Timestamp:* ${v.timestamp}\n*Body:*\n\n${v.body}`).join('\n\n')
	m.reply(message)
}

handler.help = ['searchmessages'].map(v => v + ' <text>')
handler.tags = ['tools']
handler.command = /^s(earch)?(messages?|msg)$/i

export default handler;