//import got from 'got';
import Helper from "../lib/helper.js"
import wweb from 'whatsapp-web.js'
const { MessageMedia } = wweb

let handler = async (m, { args, client, usedPrefix, command }) => {
    if (!args || !args[0]) throw `Input URL:\n${usedPrefix + command} https://www.youtube.com/watch?v=q6EoRBvdVPQ`;
    const url = Helper.API('https://ytdl.tiodevhost.my.id', '', { url: args[0], filter: "audioandvideo", quality: "highestvideo", contenttype: "video/mp4" })
    m.reply( await MessageMedia.fromUrl( url/* Buffer.from( await got(url).buffer() */, { unsafeMime: true }))
    //m.reply(url)
}

handler.help = ['youtube'].map(v => v + ` <url>`)
handler.tags = ['tools']
handler.command = /^y(ou)?t(ube)?(v|mp4)?$/i

//handler.disabled = true

export default handler