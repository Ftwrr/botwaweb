import { fileTypeFromBuffer } from 'file-type';
import { NHentai } from '@shineiichijo/nhentai-ts'
import wweb from 'whatsapp-web.js'
const { MessageMedia } = wweb
const nhentai = new NHentai()

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args || !args[0]) return m.reply(`Input CODE:\n${usedPrefix + command} 366224`);
    const valid = await nhentai.validate(args[0])
    if (valid) {
        const data = await nhentai.getDoujin(args[0])
        const pdf = await (data.images).PDF()
        m.reply(new MessageMedia((await fileTypeFromBuffer(pdf)).mime, Buffer.from(pdf).toString("base64"), data.title + '.pdf'), null, { caption: data.title } )
    } else return m.reply('Invalid doujin ID')
}

handler.help = ['nhentai']
handler.tags = ['tools']
handler.command = /^nhentai(pdf)?$/i

export default handler;