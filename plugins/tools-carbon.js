import { fileTypeFromBuffer } from 'file-type';
import wweb from 'whatsapp-web.js'
const { MessageMedia } = wweb
import fetch from 'node-fetch'

let handler = async (m, { text, usedPrefix, command }) => {
    const code = m.hasQuotedMsg ? m._data.quotedMsg.body : text
    if (!code) return m.reply(`Input Code:\n${usedPrefix + command} console.log('hello world')`);
    let carbon = await generateCarbon(code)
    if (carbon.status !== 200) return m.reply(`${carbon.status} ${carbon.statusText}`);
    m.reply(new MessageMedia((await fileTypeFromBuffer(carbon.result)).mime, carbon.result.toString("base64")))
}

handler.help = ['carbon'].map(v => v + ' <code>')
handler.tags = ['tools']
handler.command = /^carbon$/i

export default handler;

async function generateCarbon(options) {
    const res = await fetch('https://carbonara.solopov.dev/api/cook', { method: 'post', body: JSON.stringify({ code: options }), headers: {'Content-Type': 'application/json'} })
    if (res.status !== 200) return {
        status: res.status,
        statusText: res.statusText
    }
    const buff = Buffer.from(await res.arrayBuffer())
    return {
        status: res.status,
        statusText: res.statusText,
        result: buff
    }
}
