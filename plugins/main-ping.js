import process from 'process'

let handler = async (m, { conn }) => {
	const uptime = process.uptime()
	const formattedUptime = formatUptime(uptime);
	conn.sendMessage(m.id.remote, `${formattedUptime}`)
	//m.reply('pong')
}

handler.help = ['ping']
handler.tags = ['main']
handler.command = /^ping$/i

export default handler;

function formatUptime(uptime) {
	const days = Math.floor(uptime / 86400);
	const hours = Math.floor((uptime % 86400) / 3600);
	const minutes = Math.floor((uptime % 3600) / 60);
	const seconds = Math.floor(uptime % 60);

	return `${days > 0 ? days + 'd' : ''} ${hours > 0 ? hours + 'h' : '' } ${minutes > 0 ? minutes + 'm' : '' } ${seconds}s`.trim()
}