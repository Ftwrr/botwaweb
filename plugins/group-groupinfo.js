let handler = async (m, {}) => {
	let chat = (await m.getChat()).groupMetadata;
	m.reply(`
    *Group Details*
    Name: ${chat.subject}
    Description: ${chat.desc}
    Created At: ${Date(chat.descTime * 1000)}
    Created By: ${chat.descOwner.user}
    Participant count: ${chat.participants.length}
    `)
    console.log(chat)
}

handler.help = ['groupinfo']
handler.tags = ['group']
handler.command = /^(group|gc)i(nfo)?$/i

handler.group = true

export default handler;