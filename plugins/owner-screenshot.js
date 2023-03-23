import { fileTypeFromBuffer } from 'file-type';
import wweb from 'whatsapp-web.js'
const { MessageMedia } = wweb

let handler = async (m, { conn }) => {
    await conn.pupPage.setViewport({ width: 720, height: 1600})
    let media = await conn.pupPage.screenshot({fullPage: true})
    m.reply(new MessageMedia((await fileTypeFromBuffer(media)).mime, media.toString("base64")))
}

handler.help = ['screenshot']
handler.tags = ['owner']
handler.command = /^(screenshot|ss)$/i

handler.owner = true

export default handler;