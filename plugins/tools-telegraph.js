import got from "got";

let handler = async (m, { text }) => {
    let quotedMsg = await m.getQuotedMessage() || m;
    if (quotedMsg && quotedMsg.hasMedia) {
        let attachmentData = await quotedMsg.downloadMedia();
        const telegraph = await telegraph(attachmentData.data, attachmentData.mimetype)
        console.log(attachmentData)
        //m.reply()
    }
}

handler.help = ['telegraph'].map(v => v + ' <media>')
handler.tags = ['tools']
handler.command = /^telegraph$/i

handler.disabled = true

export default handler;

async function telegraph(buff, mime) {
    let form = new FormData()
    const blob = new Blob([buffer.toArrayBuffer()], { type: mime })
    form.append('file', blob, 'tmp.' + ext)
}