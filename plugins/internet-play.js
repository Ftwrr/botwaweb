import { fileTypeFromBuffer } from 'file-type';
import Helper from "../lib/helper.js"
import wweb from 'whatsapp-web.js'
const { MessageMedia } = wweb
import fetch from 'node-fetch'

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) return m.reply(`Input text:\n${usedPrefix + command} faded`);
    const search = await fetch(Helper.API('https://api-id.wzblueline.xyz', '/api/search/spotify_fast', { title: text }))
    const search_data = await search.json()
    const res = await fetch(Helper.API('https://api-id.wzblueline.xyz', '/api/dl/spotify', { url: search_data.result.externalUrl }))
    const data = await res.json()
    const songs_link = await fetch(data.result.downloadLink)
    const songs_buff = Buffer.from(await songs_link.arrayBuffer())
    m.reply(new MessageMedia((await fileTypeFromBuffer(songs_buff)).mime, songs_buff.toString("base64")), false, { caption: text })
}

handler.help = ['play'].map(v => v + ` (title)`)
handler.tags = ['internet']
handler.command = /^(play)$/i

export default handler