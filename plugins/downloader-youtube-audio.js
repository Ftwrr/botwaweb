import { fileTypeFromBuffer } from 'file-type';
import wweb from 'whatsapp-web.js'
const { MessageMedia } = wweb
import fetch from 'node-fetch'
import youtubedlv2 from '../lib/scraper/youtube.js'

let handler = async (m, { args, usedPrefix, command  }) => {
  if (!args || !args[0]) return m.reply(`Input URL:\n${usedPrefix + command} https://www.youtube.com/watch?v=XYjVwg63Z7U`);
  const youtubedl = await youtubedlv2(args[0])
  if (!youtubedl.status) return m.reply(`${youtubedl.status} ${youtubedl.statusText}`)
  const { thumbnail, audio: _audio, title } = youtubedl
  let audio, source, res, link, lastError
  for (let i in _audio) {
    try {
      audio = _audio[i];
      if (isNaN(audio.fileSize)) continue;
      link = await audio.download();
      if (link) res = await fetch(link);
      if (res) source = Buffer.from(await res.arrayBuffer());
      if (Buffer.isBuffer(source)) break;
    } catch (e) {
      audio = link = source = null;
      lastError = e;
    }
  }
  if (!(Buffer.isBuffer(source)) || !link || (!res.status !== 200)) return m.reply('Can\'t download audio');
  m.reply(new MessageMedia((await fileTypeFromBuffer(source)).mime, source.toString("base64")));
}
handler.help = ['mp3'].map(v => 'youtube' + v + ` <url>`)
handler.tags = ['downloader']
handler.command = /^(yt|youtube)(a|mp3)$/i

export default handler;