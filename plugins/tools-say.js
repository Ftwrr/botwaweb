let handler = async (m, { conn, text }) => {
    conn.sendMessage(m.chat, `${text}`)
    //m.reply('pong')
}

handler.help = ['say']
handler.tags = ['main']
handler.command = /^say$/i

handler.limit = true

export default handler;