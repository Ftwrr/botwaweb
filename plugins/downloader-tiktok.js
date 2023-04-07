import { fileTypeFromBuffer } from 'file-type';
import wweb from 'whatsapp-web.js'
const { MessageMedia } = wweb
import fetch from 'node-fetch'
import { tiktok } from "@xct007/frieren-scraper";

let handler = async (m, { args, usedPrefix, command }) => {
    if (!args || !args[0]) return m.reply(`Input URL:\n${usedPrefix + command} https://www.tiktok.com/@initokyolagii/video/7189917930761506075`);
    const data = await tiktok.v1(args[0])
    if (data.error) return m.reply(`${data.message}`);
    const buffVideo = Buffer.from(await (await fetch(data.play)).arrayBuffer())
    const buffAudio = Buffer.from(await (await fetch(data.music)).arrayBuffer())
    await m.reply(new MessageMedia((await fileTypeFromBuffer(buffVideo)).mime, buffVideo.toString("base64")), false, { caption: `*${data.nickname}*\n@${data.unique_id}`.trim() });
    m.reply( new MessageMedia((await fileTypeFromBuffer(buffAudio)).mime, buffAudio.toString("base64")));
}

handler.help = ['tiktok'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^((tt|tik(tok)?)(dl)?)$/i

export default handler