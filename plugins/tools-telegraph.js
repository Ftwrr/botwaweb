import got from "got";

let handler = async (m, { text }) => {
    let quotedMsg = await m.getQuotedMessage() || m;
    if (quotedMsg && quotedMsg.hasMedia) {
        let attachmentData = await quotedMsg.downloadMedia();
        const telegraph = await telegraph(attachmentData.data)
        m.reply(telegraph)
    } else m.reply('asu')
}

handler.help = ['telegraph'].map(v => v + ' <media>')
handler.tags = ['tools']
handler.command = /^telegraph$/i

handler.disabled = true

export default handler;

async function telegraph(buffer) {
}
