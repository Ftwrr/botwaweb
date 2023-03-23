let handler = async (m, { conn, usedPrefix, command, args, text }) => {
	let resend = /^(resend|y(es)?)$/g.test(args[0])
	let chat = await m.getChat();
	await chat.revokeInvite()
	if (resend) m.reply('https://chat.whatsapp.com/' + await chat.getInviteCode())
}

handler.help = ['revoke'].map(v => v + ' (resend)')
handler.tags = ['group']
handler.command = /^re(voke|new)(invite|link)?$/i

handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler;