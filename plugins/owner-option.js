import etc from "../etc.js";
import db from '../lib/database.js'

let handler = async (m, { command, args, conn }) => {
	let isEnable = /true|enable|(turn)?on|1/i.test(command)
	let type = (args[0] || '').toLowerCase()
	let list = ['public', 'simsimi'];
	switch (type) {
		case 'public':
			db.data.settings[conn.info.wid._serialized].self = !isEnable
			break
		case 'simsimi':
			db.data.settings[conn.info.wid._serialized].simi = isEnable
			break
		default:
			if (!/[01]/.test(command)) return m.reply(`Option:\n${list.join(', ')}`)
			throw false
	}
	m.reply(`${type} ${isEnable ? 'enabled' : 'disabled'}`)
}
handler.help = ['en', 'dis'].map(v => v + 'able <option>')
handler.tags = ['owner']
handler.command = /^((en|dis)able|(tru|fals)e|(turn)?o(n|ff)|[01])$/i

handler.owner = true

export default handler;