import tiktokdl from "../lib/scraper/tiktok.js";
import wweb from 'whatsapp-web.js'
const { MessageMedia } = wweb

let handler = async (m, { args, usedPrefix, command }) => {
    if (!args || !args[0]) throw `Input URL:\n${usedPrefix + command} https://www.tiktok.com/@initokyolagii/video/7189917930761506075`;
    const { desc, create_time, author: { unique_id, nickname }, duration, download: { nowm, wm, music, music_info: { title, author } } }  = await tiktokdl(args[0])
    const url = nowm || wm
    if (!url.includes(music)) await m.reply( await MessageMedia.fromUrl(url, { unsafeMime: true }), false, { caption: `*${nickname}*\n@${unique_id}\n\n${desc ? desc : ''}`.trim() })
    m.reply( await MessageMedia.fromUrl(music, { unsafeMime: true }))
}

handler.help = ['tiktok'].map(v => v + ' <url>')
handler.tags = ['tools']
handler.command = /^((tt|tik(tok)?)(dl)?)$/i

export default handler