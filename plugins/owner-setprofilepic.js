let handler = async (m, { conn, usedPrefix, command }) => {
	let quotedMsg = await m.getQuotedMessage() || m;
	if (quotedMsg && quotedMsg.hasMedia) {
		let attachmentData = await quotedMsg.downloadMedia();
		await conn.setProfilePicture(attachmentData)
	} else return m.reply(`Quote media with the command:\n${usedPrefix + command}`)
}

handler.help = ['setprofilepicture'].map(v => v + ' <media>')
handler.tags = ['owner']
handler.command = /^set(profilepic(ture)?|pp)$/i

handler.owner = true

export default handler;