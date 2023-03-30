let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
	let [_, code] = text.match(linkRegex) || []
	if (!code) return m.reply(`Input URL:\n${usedPrefix + command} https://chat.whatsapp.com/E3XI3lj9wiDKWtqdikend7`);
	await conn.acceptInvite(code)
}

handler.help = ['join'].map(v => v + ` <invite>`)
handler.tags = ['owner']
handler.command = /^accept|join$/i

handler.owner = true

export default handler;