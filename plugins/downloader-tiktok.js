import { fileTypeFromBuffer } from 'file-type';
import wweb from 'whatsapp-web.js'
const { MessageMedia } = wweb
import fetch from 'node-fetch'
import Helper from "../lib/helper.js"

let handler = async (m, { args, usedPrefix, command }) => {
    if (!args || !args[0]) return m.reply(`Input URL:\n${usedPrefix + command} https://www.tiktok.com/@initokyolagii/video/7189917930761506075`);
    const res = await fetch(Helper.API('https://developers.tiklydown.me', '/api/download', { url: args[0] }))
    if (!res.ok) return m.reply(`${res.status} ${res.statusText}`);
    const data = await res.json()
    const buffVideo = Buffer.from(await (await fetch(data.video.noWatermark)).arrayBuffer())
    const buffAudio = Buffer.from(await (await fetch(data.music.play_url)).arrayBuffer())
    await m.reply(new MessageMedia((await fileTypeFromBuffer(buffVideo)).mime, buffVideo.toString("base64")), false, { caption: `*${data.author.name}*\n@${data.author.unique_id}`.trim() });
    m.reply( new MessageMedia((await fileTypeFromBuffer(buffAudio)).mime, buffAudio.toString("base64")));
}

handler.help = ['tiktok'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^((tt|tik(tok)?)(dl)?)$/i

export default handler