import { format } from "node:util";
import { createRequire } from 'node:module';
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname)

let handler = async (m, _2) => {
	let { client, usedPrefix, noPrefix, args } = _2
	let _return
	let _syntax = ''
	let _text = (/^=/.test(usedPrefix) ? 'return ' : '') + noPrefix
	try {
		let i = 15
		let f = {
			exports: {}
		}
		let exec = new (async () => { }).constructor('print', 'm', 'handler', 'require', 'client', 'Array', 'process', 'args', 'module', 'exports', 'argument', _text)
		_return = await exec.call(client, (...args) => {
			if (--i < 1) return;
			return client.sendMessage(m.id.remote, format(...args))
		}, m, handler, require, client, CustomArray, process, args, f, f.exports, [client, _2])
	} catch (e) {
		_return = e
	} finally {
		client.sendMessage(m.id.remote, _syntax + format(_return))
	}

};
handler.help = ['> ', '=> ']
handler.tags = ['advanced']
handler.customPrefix = /^=?> /
handler.command = /(?:)/i

handler.owner = true

export default handler;

class CustomArray extends Array {
  constructor(...args) {
    if (typeof args[0] == 'number') return super(Math.min(args[0], 10000))
    else return super(...args)
  }
}