import fetch from 'node-fetch'

let handler = async (m, { text, usedPrefix, command }) => {
	if (!text) return m.reply(`Input text:\n${usedPrefix + command} halo`);
    const res = await fetch('https://api.simsimi.vn/v2/simtalk', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: `text=${text}&lc=id` })
    if (res.status !== 200) return m.reply(`${res.status} ${res.statusText}`);
    const json = await res.json()
    m.reply(json.message)
}

handler.help = ['simsimi'].map(v => v + ' <text>')
handler.tags = ['internet']
handler.command = /^simi?(simi)?$/i

export default handler;
