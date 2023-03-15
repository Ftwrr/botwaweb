import Helper from "../lib/helper.js"
import wweb from 'whatsapp-web.js'
const { MessageMedia } = wweb

let handler = async (m, { args, usedPrefix, command }) => {
    if (!args || !args[0]) throw `Input URL:\n${usedPrefix + command} https://www.youtube.com/watch?v=q6EoRBvdVPQ`;
    const response = Helper.API('https://ytdl.tiodevhost.my.id', '/', { url: args[0], filter: "audioandvideo", quality: "highestvideo", contenttype: "video/mp4" })
    m.reply(await MessageMedia.fromUrl( response, { unsafeMime: true }))
}

handler.help = ['youtube'].map(v => v + ` <url>`)
handler.tags = ['tools']
handler.command = /^y(ou)?t(ube)?(v|mp4)?$/i

export default handler