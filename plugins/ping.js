let handler = async m => {
	m.reply('pong')
}

handler.help = ['ping']
handler.tags = ['tools']
handler.command = /^ping$/i

export default handler;