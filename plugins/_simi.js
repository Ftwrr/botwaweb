import etc from "../etc.js";
import { conn } from "../index.js"

export async function before(m) {
	if (!etc.opts.simsimi) return;
	let isMentioned = (m._data.quotedParticipant || m.mentionedIds).includes(conn.info.wid._serialized)
	if (!isMentioned) return;
	const res = await fetch('https://api.simsimi.vn/v1/simtalk', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: `text=${m.body}&lc=id` })
	const json = await res.json()
	m.reply(json.message)
}