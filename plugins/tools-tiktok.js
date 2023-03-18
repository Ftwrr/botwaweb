import tiktokdl from "../lib/scraper/tiktok.js";
import got from 'got';
import wweb from 'whatsapp-web.js'
const { MessageMedia } = wweb

let handler = async (m, { args, usedPrefix, command }) => {
    if (!args || !args[0]) return m.reply(`Input URL:\n${usedPrefix + command} https://www.tiktok.com/@initokyolagii/video/7189917930761506075`)
    const { desc, create_time, author: { unique_id, nickname }, duration, download: { nowm, wm, music, music_info: { title, author } } } = await tiktokdl(args[0])
    const url = nowm || wm
    if (!url.includes(music)) await m.reply( new MessageMedia("video/mp4", Buffer.from(await got(url).buffer()).toString("base64")), false, { caption: `*${nickname}*\n@${unique_id}\n\n${desc ? desc : ''}`.trim() })
    m.reply( new MessageMedia("audio/mpeg", Buffer.from(await got(music).buffer()).toString("base64")))
}

handler.help = ['tiktok'].map(v => v + ' <url>')
handler.tags = ['tools']
handler.command = /^((tt|tik(tok)?)(dl)?)$/i

export default handler