import fetch from 'node-fetch'

let handler = async (m, { text, usedPrefix, command }) => {
	if (!text) return m.reply(`Input text:\n${usedPrefix + command} halo`);
	const simiRes = await fetch('https://api.simsimi.vn/v1/simtalk', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: `text=${text}&lc=id` })
	const json = await simiRes.json()
	m.reply(JSON.stringify(json))
}

handler.help = ['simsimi'].map(v => v + ' <text>')
handler.tags = ['main']
handler.command = /^simi?(simi)?$/i

export default handler;