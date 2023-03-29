import { fileTypeFromBuffer } from 'file-type';
import wweb from 'whatsapp-web.js'
const { MessageMedia } = wweb
import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, args, text }) => {
	const mentionWho = m.hasQuotedMsg ? (await (await m.getQuotedMessage()).getContact()).id._serialized : (m._data.mentionedJidList).length !== 0 ? m._data.mentionedJidList[0] : (await m.getContact()).id._serialized
	const contactById = await conn.getContactById(mentionWho)
	const profilePicUrl = await conn.getProfilePicUrl(mentionWho)
	const contactInfo = `*Name:* ${contactById.verifiedName || contactById.pushname}\n*Number:* ${contactById.number}`.trim()
	if (!profilePicUrl) return m.reply(contactInfo);
	const res = await fetch(profilePicUrl)
	if (res.status !== 200) return m.reply(`${res.status} ${res.statusText}`);
	const profilePicBuff = Buffer.from(await res.arrayBuffer())
	m.reply( new MessageMedia((await fileTypeFromBuffer(profilePicBuff)).mime, profilePicBuff.toString("base64")), false, { caption: contactInfo });
}

handler.help = ['profile'].map(v => v + ' (mention)')
handler.tags = ['main']
handler.command = /^(profile?(pic(ture)?)?|avatar)$/i

export default handler;