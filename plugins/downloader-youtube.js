import { fileTypeFromBuffer } from 'file-type';
import wweb from 'whatsapp-web.js'
const { MessageMedia } = wweb
import fetch from 'node-fetch'
import Helper from "../lib/helper.js"

let handler = async (m, { args, usedPrefix, command }) => {
	if (!args || !args[0]) return m.reply(`Input URL:\n${usedPrefix + command} https://www.youtube.com/watch?v=FtutLA63Cp8`);
	const isAudio = /(a|mp3)$/g.test(command)
	//const response = Helper.API()
}

handler.help = ['youtube'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(yt|youtube)((v|mp4)|(a|mp3)?)$/i

export default handler