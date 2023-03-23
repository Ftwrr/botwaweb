import fetch from 'node-fetch'

let handler = async (m, { text, usedPrefix, command }) => {
	if (!text) return m.reply(`Input text:\n${usedPrefix + command} halo`);
	const simiRes = fetch('https://api.simsimi.vn/v1/simtalk', { method: 'post', body: JSON.stringify({ text: text, lc: 'id' }), headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
	const json = await simiRes.json()
	m.reply(JSON.stringify(json))
}

handler.help = ['simsimi'].map(v => v + ' <text>')
handler.tags = ['main']
handler.command = /^sim(simi)?$/i

export default handler;