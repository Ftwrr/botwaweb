import { fileTypeFromBuffer } from 'file-type'
import Helper from "../lib/helper.js"
import wweb from 'whatsapp-web.js'
const { MessageMedia } = wweb
import fetch from 'node-fetch'

let handler = async (m, { args }) => {
    const res = await fetch(Helper.API('https://meme-api.com', `/gimme` + (args[0] ? `/${args[0]}` : '')))
    if (res.status !== 200) return m.reply(`${res.status} ${res.statusText}`);
    const data = await res.json()
    const buff = Buffer.from(await (await fetch(data.url)).arrayBuffer())
    m.reply(new MessageMedia((await fileTypeFromBuffer(buff)).mime, buff.toString("base64")), false, { caption: `${data.title}\n${data.postLink}` } )
}

handler.help = ['meme']
handler.tags = ['internet']
handler.command = /^(meme|sr|subreddit)$/i

export default handler