import Helper from "../lib/helper.js"
import wweb from 'whatsapp-web.js'
const { MessageMedia } = wweb

let handler = async (m, { args, usedPrefix, command }) => {
    if (!args || !args[0]) m.reply(`Input URL:\n${usedPrefix + command} https://www.youtube.com/watch?v=q6EoRBvdVPQ`);
    const response = Helper.API('https://ytdl.tiodevhost.my.id', '/', { url: args[0], filter: "audioonly", quality: "highestaudio", contenttype: "audio/mp3" })
    m.reply( await MessageMedia.fromUrl(response, { unsafeMime: true }))
}

handler.help = ['mp3'].map(v => "youtube" + v + ` <url>`)
handler.tags = ['tools']
handler.command = /^y(ou)?t(ube)?(a|mp3)$/i

handler.disabled = true

export default handler