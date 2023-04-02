let handler = async (m, { conn, usedPrefix, command }) => {
	let quotedMsg = await m.getQuotedMessage() || m;
	if (quotedMsg && quotedMsg.hasMedia) {
		const chat = await m.getChat()
		let attachmentData = await quotedMsg.downloadMedia();
		await chat.setPicture(attachmentData)
	} else return m.reply(`Quote media with the command:\n${usedPrefix + command}`)
}

handler.help = ['setprofilepicturegroup'].map(v => v + ' <media>')
handler.tags = ['group']
handler.command = /^set(pic(ture)?|pp)group$/i

handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler;