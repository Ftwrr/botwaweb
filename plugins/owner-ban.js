import db from '../lib/database.js'

let handler = async (m, { command }) => {
    let unBan = /un/i.test(command)
    let user = m._data.mentionedJidList
    if (m.hasQuotedMsg) user.push(m._data.quotedParticipant)
    if (user.length !== 0) db.data.users[user[0]].banned = !unBan
    else db.data.chats[m.chat].isBanned = !unBan
}

handler.tags = ['owner']
handler.command = /^(un)?ban(chats?)?$/i

handler.owner = true

export default handler;