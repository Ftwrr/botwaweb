import fetch from 'node-fetch'
import Helper from "../lib/helper.js"

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) return m.reply(`Input text:\n${usedPrefix + command} halo`);
    const res = await fetch(Helper.API('https://api.itsrose.site', '/others/simi', { text, level: Math.floor(Math.random() * (1000 * 90)) + (1000 * 10), lc: 'id' }))
    if (res.status !== 200) return m.reply(`${res.status} ${res.statusText}`);
    const json = await res.json()
    m.reply(json.result.simi.original)
}

handler.help = ['simsimi'].map(v => v + ' <text>')
handler.tags = ['internet']
handler.command = /^simi?(simi)?$/i

export default handler;