import wweb from 'whatsapp-web.js'
const { MessageMedia } = wweb

let handler = async (m, { usedPrefix, command }) => {
    let quotedMsg = await m.getQuotedMessage() || m;
    if (quotedMsg && quotedMsg.hasMedia) {
        let attachmentData = await quotedMsg.downloadMedia();
        await m.reply( new MessageMedia(attachmentData.mimetype, attachmentData.data, attachmentData.filename), false, { sendMediaAsSticker: true } )
    } else throw `Quote media with the command:\n${usedPrefix + command}`
}

handler.help = ["sticker"].map((v) => v + " <media>");
handler.tags = ["tools"];
handler.command = /^s(tic?ker)?(gif)?(wm)?$/i;

export default handler;