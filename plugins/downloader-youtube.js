import { fileTypeFromBuffer } from 'file-type';
import wweb from 'whatsapp-web.js'
const { MessageMedia } = wweb
import fetch from 'node-fetch'
import ytdl from 'ytdl-core';

let handler = async (m, { args, usedPrefix, command  }) => {
  if (!args || !args[0]) return m.reply(`Input URL:\n${usedPrefix + command} https://www.youtube.com/watch?v=XYjVwg63Z7U`);
  const ytInfo = await ytdl.getInfo(args[0])
  const result = ytInfo.formats.filter(item => item.container === 'mp4' && item.hasVideo && item.hasAudio)
  const buff = Buffer.from(await (await fetch(result[0].url)).arrayBuffer())
  m.reply( new MessageMedia((await fileTypeFromBuffer(buff)).mime, buff.toString("base64")));
}
handler.help = ['youtube'].map(v => v + ` <url>`)
handler.tags = ['downloader']
handler.command = /^(yt|youtube)(v|mp4)?$/i

export default handler;