import { fileTypeFromBuffer } from 'file-type';
import { youtube } from "@xct007/frieren-scraper";
import wweb from 'whatsapp-web.js'
const { MessageMedia } = wweb
import fetch from 'node-fetch'

let handler = async (m, { text, usedPrefix, command }) => {
	if (!text) return m.reply(`Input text:\n${usedPrefix + command} windah basudara`);
	const data = await youtube.search(text)
	if (data.error) return m.reply(`${data.message}`);
	const mappedString = data.map((v, i) => `${v.title}\n${v.url}\n${v.views} views · ${v.uploaded}\n`).join('\n')
	const thumbnail = Buffer.from(await (await fetch(data[0].thumbnail)).arrayBuffer())
	m.reply(new MessageMedia((await fileTypeFromBuffer(thumbnail)).mime, thumbnail.toString("base64")), false, { caption: mappedString } )
}

handler.help = ['youtubesearch'].map(v => v + ` <text>`)
handler.tags = ['downloader']
handler.command = /^(yt|youtube)(s(earch)?)$/i

export default handler;