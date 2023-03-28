import { fileTypeFromBuffer } from 'file-type';
import wweb from 'whatsapp-web.js'
const { MessageMedia } = wweb
import fetch from 'node-fetch'
import ytdl from 'ytdl-core';

let handler = async (m, { args, usedPrefix, command  }) => {
  if (!args || !args[0]) return m.reply(`Input URL:\n${usedPrefix + command} https://www.youtube.com/watch?v=XYjVwg63Z7U`);
  const ytInfo = await ytdl.getInfo(args[0])
  const result = ytInfo.formats.filter(item => item.mimeType == 'audio/webm; codecs="opus"')
  //TODO
}
handler.help = ['mp3'].map(v => 'youtube' + v + ` <url>`)
handler.tags = ['downloader']
handler.command = /^(yt|youtube)(a|mp3)$/i

handler.disabled = true

export default handler;