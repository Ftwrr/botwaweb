import wweb from 'whatsapp-web.js'
const { MessageMedia } = wweb

let handler = async (m, { text, usedPrefix, command }) => {
    let quotedMsg = await m.getQuotedMessage()
    if (quotedMsg && quotedMsg.hasMedia && quotedMsg.type == 'sticker') {
        let attachmentData = await quotedMsg.downloadMedia();
        await m.reply( new MessageMedia(attachmentData.mimetype, attachmentData.data, attachmentData.filename))
    } else return m.reply(`Quote sticker with the command:\n${usedPrefix + command}`)
}

handler.help = ["toimage"].map((v) => v + " <sticker>");
handler.tags = ["tools"];
handler.command = /^s(tic?ker)?to(img|image)$/i;

export default handler;