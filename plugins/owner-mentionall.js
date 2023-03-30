// JamvanHax0r

let handler = async (m, { conn, text }) => {
	const participants = (await m.getChat()).participants.map(v => v.id._serialized);
	const mentions = await Promise.all(participants.map(jid => conn.getChatById(jid)));
	let teks = m.hasQuotedMsg ? m._data.quotedMsg.body : text
	conn.sendMessage(m.id.remote, teks, { mentions })
}

handler.help = ['hidetag']
handler.tags = ['owner']
handler.command = /^(pengumuman|announce|hiddentag|hidetag)$/i

handler.owner = true
handler.group = true

export default handler;