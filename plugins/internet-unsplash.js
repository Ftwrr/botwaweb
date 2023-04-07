import { fileTypeFromBuffer } from 'file-type';
import wweb from 'whatsapp-web.js'
const { MessageMedia } = wweb
import fetch from 'node-fetch'
import { unsplash } from "@xct007/frieren-scraper";

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) return m.reply(`Input text:\n${usedPrefix + command} neon`);
    const data = await unsplash.search(text)
    if (data.error) return m.reply(`${data.message}`);
    const item = data[Math.floor(Math.random() * data.length)]
    const res = await fetch(item.links.download)
    const buff = Buffer.from(await res.arrayBuffer())
    m.reply( new MessageMedia((await fileTypeFromBuffer(buff)).mime, buff.toString("base64")));
}

handler.help = ['unsplash'].map(v => v + ' <text>')
handler.tags = ['internet']
handler.command = /^(unsplash|unsp)$/i

export default handler