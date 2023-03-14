import wweb from 'whatsapp-web.js'
const { MessageMedia } = wweb

let handler = async (m, { client }) => {
    let media = await client.pupPage.screenshot()
    m.reply(new MessageMedia("image/jpg", Buffer.from(media).toString("base64")))
}

handler.help = ['screenshot']
handler.tags = ['owner']
handler.command = /^screenshot$/i
handler.owner = true

export default handler;