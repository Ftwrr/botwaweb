import instagram from "../lib/scraper/instagram.js";
import wweb from 'whatsapp-web.js'
const { MessageMedia } = wweb

let handler = async (m, { args, client, usedPrefix, command }) => {
    if (!args || !args[0]) return m.reply(`Input URL:\n${usedPrefix + command} https://www.instagram.com/reel/CpunXS7O1kV`);
    const { url_list }  = await instagram(args[0])
    for (let url of url_list) {
        m.reply(await MessageMedia.fromUrl(url, { unsafeMime: true }))
    }
}

handler.help = ['instagram'].map(v => v + ' <url>')
handler.tags = ['tools']
handler.command = /^((ig|instagram)(dl)?)$/i

handler.disabled = true

export default handler