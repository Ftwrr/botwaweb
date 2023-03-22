import wweb from 'whatsapp-web.js'
const { MessageMedia } = wweb
import etc from "../etc.js";

let handler = async (m, { text, usedPrefix, command }) => {
    let quotedMsg = await m.getQuotedMessage() || m;
    let [packname, author] = text.split('|')
    if (quotedMsg && quotedMsg.hasMedia) {
        let attachmentData = await quotedMsg.downloadMedia();
        await m.reply( new MessageMedia(attachmentData.mimetype, attachmentData.data, attachmentData.filename), false, { sendMediaAsSticker: true, stickerName: packname || etc.author, stickerAuthor: author || etc.author, stickerCategories: ['😅'] } )
    } else return m.reply(`Quote media with the command:\n${usedPrefix + command}`)
}

handler.help = ["sticker"].map((v) => v + " <media>");
handler.tags = ["tools"];
handler.command = /^s(tic?ker)?(gif)?(wm)?$/i;

export default handler;