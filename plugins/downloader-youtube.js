import { fileTypeFromBuffer } from 'file-type';
import wweb from 'whatsapp-web.js'
const { MessageMedia } = wweb
import fetch from 'node-fetch'
import { youtube } from "@xct007/frieren-scraper";

let handler = async (m, { args, usedPrefix, command  }) => {
  if (!args || !args[0]) return m.reply(`Input URL:\n${usedPrefix + command} https://www.youtube.com/watch?v=XYjVwg63Z7U`);
  const data = await youtube.download(args[0])
  if (data.error) return m.reply(`${data.message}`);
  const { thumbnail, urls: _urls, title } = data
  let urls, source, lastError
  for (let i in _urls) {
    try {
      urls = _urls[i];
      source = Buffer.from(await (await fetch(urls.url)).arrayBuffer())
      if (Buffer.isBuffer(source)) break;
    } catch (e) {
      urls = source = null;
      lastError = e;
    }
  }
  if (!(Buffer.isBuffer(source))) return m.reply('Can\'t download video');
  m.reply(new MessageMedia((await fileTypeFromBuffer(source)).mime, source.toString("base64")));
}
handler.help = ['youtube'].map(v => v + ` <url>`)
handler.tags = ['downloader']
handler.command = /^(yt|youtube)(v|mp4)?$/i

export default handler;