import { fileTypeFromBuffer } from 'file-type';
import wweb from 'whatsapp-web.js'
const { MessageMedia } = wweb
import fetch from 'node-fetch'
import youtubedlv2 from '../lib/scraper/youtube.js'

let handler = async (m, { args, usedPrefix, command  }) => {
  if (!args || !args[0]) return m.reply(`Input URL:\n${usedPrefix + command} https://www.youtube.com/watch?v=XYjVwg63Z7U`);
  const youtubedl = await youtubedlv2(args[0])
  if (!youtubedl.status) return m.reply(`${youtubedl.status} ${youtubedl.statusText}`)
  const { thumbnail, video: _video, title } = youtubedl
  let video, source, res, link, lastError
  for (let i in _video) {
    try {
      video = _video[i];
      if (isNaN(video.fileSize)) continue;
      link = await video.download();
      if (link) res = await fetch(link);
      if (res) source = Buffer.from(await res.arrayBuffer());
      if (Buffer.isBuffer(source)) break;
    } catch (e) {
      video = link = source = null;
      lastError = e;
    }
  }
  if (!(Buffer.isBuffer(source)) || !link || (!res.status !== 200)) return m.reply('Can\'t download video');
  m.reply(new MessageMedia((await fileTypeFromBuffer(source)).mime, source.toString("base64")));
}
handler.help = ['youtube'].map(v => v + ` <url>`)
handler.tags = ['downloader']
handler.command = /^(yt|youtube)(v|mp4)?$/i

export default handler;