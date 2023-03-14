import Helper from "../lib/helper.js"
import wweb from 'whatsapp-web.js'
const { MessageMedia } = wweb

let handler = async (m, { args, usedPrefix, command }) => {
    if (!args || !args[0]) throw `Input URL:\n${usedPrefix + command} https://www.youtube.com/watch?v=q6EoRBvdVPQ`;
    const response = await fetch(Helper.API('https://yoothoob.vercel.app', '/fromLink', { link: args[0] }))
    const data = await response.json();
    m.reply(await MessageMedia.fromUrl( data.assets.mp3, { unsafeMime: true }))
}

handler.help = ['mp3'].map(v => "youtube" + v + ` <url>`)
handler.tags = ['tools']
handler.command = /^y(ou)?t(ube)?(a|mp3)$/i

handler.disabled = true

export default handler