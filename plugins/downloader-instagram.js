import { fileTypeFromBuffer } from 'file-type';
import instagramGetUrl from "../lib/scraper/instagram.js";
import wweb from 'whatsapp-web.js'
const { MessageMedia } = wweb
import fetch from 'node-fetch'

let handler = async (m, { args, usedPrefix, command }) => {
	if (!args || !args[0]) return m.reply(`Input URL:\n${usedPrefix + command} https://www.instagram.com/p/Cp9u9aou7lK`);
	const instagram = await instagramGetUrl(args[0])
	for (let url of instagram.url_list) {
		const res = await fetch(url)
		const buff = Buffer.from(await res.arrayBuffer())
		m.reply(new MessageMedia((await fileTypeFromBuffer(buff)).mime, buff.toString("base64")))
	}
}

handler.help = ['instagram'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^((ig|insta(gram)?)(dl)?)$/i

export default handler