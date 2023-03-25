import { fileTypeFromBuffer } from 'file-type';
import wweb from 'whatsapp-web.js'
const { MessageMedia } = wweb
import fetch from 'node-fetch'

let handler = async (m, { text, usedPrefix, command }) => {
    const code = m.hasQuotedMsg ? (await m.getQuotedMessage()).body : text
    if (!code) return m.reply(`Input Code:\n${usedPrefix + command} console.log('hello world')`);
    let carbon = await generateCarbon(code)
    m.reply(new MessageMedia((await fileTypeFromBuffer(carbon)).mime, carbon.toString("base64")))
}

handler.help = ['carbon'].map(v => v + ' <code>')
handler.tags = ['tools']
handler.command = /^carbon$/i

export default handler;

async function generateCarbon(options) {
    let fetchCarbon = await fetch('https://carbonara.vercel.app/api/cook', { method: 'post', body: JSON.stringify({ code: options }), headers: {'Content-Type': 'application/json'} })
    if (!fetchCarbon.ok) throw `${fetchCarbon.status} ${fetchCarbon.statusText}`
    let buff = Buffer.from(await fetchCarbon.arrayBuffer())
    return buff
}