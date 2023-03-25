import tiktokdl from "../lib/scraper/tiktok.js";
import { fileTypeFromBuffer } from 'file-type';
import wweb from 'whatsapp-web.js'
const { MessageMedia } = wweb
import fetch from 'node-fetch'

let handler = async (m, { args, usedPrefix, command }) => {
    if (!args || !args[0]) return m.reply(`Input URL:\n${usedPrefix + command} https://www.tiktok.com/@initokyolagii/video/7189917930761506075`);
    const { desc, create_time, author: { unique_id, nickname }, duration, download: { nowm, wm, music, music_info: { title, author } } } = await tiktokdl(args[0])
    const url = nowm || wm
    const fetchVideo = await fetch(url)
    if (!fetchVideo.ok) return m.reply(`${fetchVideo.status} ${fetchVideo.statusText}`);
    const fetchAudio = await fetch(music)
    if (!fetchAudio.ok) return m.reply(`${fetchAudio.status} ${fetchAudio.statusText}`);
    if (!url.includes(music)) await m.reply( new MessageMedia((await fileTypeFromBuffer(await (await fetch(url)).arrayBuffer())).mime, (await fetchVideo.arrayBuffer()).toString("base64")) , false, { caption: `*${nickname}*\n@${unique_id}\n\n${desc ? desc : ''}`.trim() });
    m.reply( new MessageMedia((await fileTypeFromBuffer(await fetchAudio.arrayBuffer())).mime, (await (await fetch(music)).arrayBuffer()).toString("base64")));
}

handler.help = ['tiktok'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^((tt|tik(tok)?)(dl)?)$/i

export default handler