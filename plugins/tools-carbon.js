import wweb from 'whatsapp-web.js'
const { MessageMedia } = wweb
import got from "got";

let handler = async (m, { text }) => {
    let carbon = await generateCarbon(text)
    m.reply(new MessageMedia("image/jpg", carbon.toString("base64")))
}

handler.help = ['carbon']
handler.tags = ['tools']
handler.command = /^carbon$/i

export default handler;

async function generateCarbon(options) {
    let fetchCarbon = await got.post('https://carbonara.vercel.app/api/cook', { json: { code: options } } ).buffer()
    let buff = Buffer.from(fetchCarbon)
    return buff
}