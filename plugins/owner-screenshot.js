import wweb from 'whatsapp-web.js'
const { MessageMedia } = wweb

let handler = async (m, { conn }) => {
    await conn.pupPage.setViewport({ width: 768, height: 1366})
    let media = await conn.pupPage.screenshot()
    m.reply(new MessageMedia("image/jpg", Buffer.from(media).toString("base64")))
}

handler.help = ['screenshot']
handler.tags = ['owner']
handler.command = /^screenshot$/i

handler.owner = true

export default handler;