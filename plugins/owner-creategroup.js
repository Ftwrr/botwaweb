let handler = async (m, { conn, usedPrefix, command, args, text }) => {
    if (!text) return m.reply(`Input subject:\n${usedPrefix + command} gc pekob | (mention)`);
    let user = m._data.mentionedJidList
    if (m.hasQuotedMsg) await user.push(m._data.quotedParticipant)
    let [subject, member] = text.split('@')
    const membertoadd = member ? user : m.sender
    let chat = await m.getChat();
    const creategc = await conn.createGroup(subject, membertoadd)
    const participantadd = Object.entries(creategc.participants).map(([number, participant], i) => {
        if (participant.statusCode === 403) {
            chat.addParticipants(number)
        }
        return `${i + 1}. ${number} ${participant.message}`;
    }).join('\n')
    const resultreply = `title: ${creategc.title}\ngid: ${creategc.gid._serialized}\n\nmember:\n` + participantadd

    m.reply(resultreply)
}

handler.help = ['creategroup'].map(v => v + ' <subject> | (mention)')
handler.tags = ['owner']
handler.command = /^c(reate)?g(ro?up)?c(hat)?$/i

handler.owner = true

export default handler;