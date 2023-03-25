import { fileTypeFromBuffer } from 'file-type';
import wweb from 'whatsapp-web.js'
const { MessageMedia } = wweb
import fetch from 'node-fetch'
import Helper from "../lib/helper.js"

let handler = async (m, { args, usedPrefix, command }) => {
	if (!args || !args[0]) return m.reply(`Input URL:\n${usedPrefix + command} https://www.youtube.com/watch?v=FtutLA63Cp8`);
	const response = await fetch(Helper.API('https://sh.xznsenpai.xyz', '/download', { url: args[0] }))
	if (!response.ok) return m.reply(`${response.status} ${response.statusText}`);
	const data = await response.json()
	if (!/(a(udio)?|mp3)$/g.test(command)) {
		const res = await fetch(data.url[0].url)
		if (!res.ok) return m.reply(`${res.status} ${res.statusText}`);
		let buff = Buffer.from(await res.arrayBuffer())
		m.reply(new MessageMedia((await fileTypeFromBuffer(buff)).mime, buff.toString("base64")), false, { caption: `${data.meta.title}\n${data.meta.source}` })
	} else {
		//const audioArr = data.url.filter(obj => obj.audio === true && obj.ext === 'opus')
		const highestAudio = data.url.filter(obj => obj.audio && obj.ext === 'opus').reduce((prev, curr) => prev.qualityNumber > curr.qualityNumber ? prev : curr);
		const res = await fetch(highestAudio.url)
		if (!res.ok) return m.reply(`${res.status} ${res.statusText}`);
		let buff = Buffer.from(await res.arrayBuffer())
		m.reply(new MessageMedia((await fileTypeFromBuffer(buff)).mime, buff.toString("base64")))
	}
}

handler.help = ['youtube'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(youtube|yt)(a(udio)?|mp3)?$/i

export default handler