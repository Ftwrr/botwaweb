import { fileTypeFromBuffer } from 'file-type';
import Helper from "../lib/helper.js"
import wweb from 'whatsapp-web.js'
const { MessageMedia } = wweb

let rgex = /(maid|waifu|marin-kitagawa|mori-calliope|raiden-shogun|oppai|selfies|uniform|ass|hentai|milf|oral|paizuri|ecchi|ero)/i
let handler = async (m, { args }) => {
	const waifu = rgex.test(args[0]) ? args[0].match(rgex)[0] : 'waifu'
	const response = await fetch(Helper.API('https://api.waifu.im', '/search', { included_tags: waifu }))
    if (!response.ok) return m.reply(response);
    const data = await response.json()
    if (!data.images[0].url) return m.reply(data.detail);
    const waifuImage = await fetch(data.images[0].url)
    if (!waifuImage.ok) return m.reply(waifuImage);
    let buff = Buffer.from(await waifuImage.arrayBuffer())
    m.reply(new MessageMedia((await fileTypeFromBuffer(buff)).mime, buff.toString("base64")), false, { caption: data.images[0].source || data.images[0].url } )
}

handler.help = ['waifu'].map(v => v + ` (tag)`)
handler.tags = ['internet']
handler.command = /^(waifu)$/i

export default handler