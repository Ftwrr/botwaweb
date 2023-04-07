import { fileTypeFromBuffer } from 'file-type';
import wweb from 'whatsapp-web.js'
const { MessageMedia } = wweb
import fetch from 'node-fetch'
import etc from "../etc.js";

let handler = async (m, { args, usedPrefix, command }) => {
    if (!args || !args[0]) return m.reply(`Input URL:\n${usedPrefix + command} https://t.me/addstickers/shironacry`);
    if (!args[0].match(/(https:\/\/t.me\/addstickers\/)/gi)) return m.reply(`Input URL:\n${usedPrefix + command} https://t.me/addstickers/twohundredthree`);
    let stik = await telegramStic(args[0])
    if (stik.status !== 200) return m.reply(`${stik.status} ${stik.statusText}`);
    for (let sticker of stik.result) {
        const res = await fetch(sticker)
        let buff = Buffer.from(await res.arrayBuffer())
        await m.reply( new MessageMedia((await fileTypeFromBuffer(buff)).mime, buff.toString("base64")), false, { sendMediaAsSticker: true, stickerName: `${stik.title || etc.author} · ${stik.name || etc.author}`, stickerAuthor: etc.author, stickerCategories: ['😅'] } )
    }
}

handler.help = ['stickertele'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(s(tic?ker)?tele(gram)?)$/i

handler.private = true

export default handler;

async function telegramStic(url) {
    let packName = url.replace("https://t.me/addstickers/", "")
    let resOne = await fetch(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=${encodeURIComponent(packName)}`, { method: "GET", headers: { "User-Agent": "GoogleBot" } })
    if (resOne.status !== 200) return {
        status: resOne.status,
        statusText: resOne.statusText
    }
    let jsonOne = await resOne.json()
    let sticArr = []
    for (let i of jsonOne.result.stickers) {
        let fileId = i.thumb.file_id
        let resTwo = await fetch(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${fileId}`)
        let jsonTwo = await resTwo.json()
        sticArr.push("https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/" + jsonTwo.result.file_path)
    }
    return {
        status: resOne.status,
        statusText: resOne.statusText,
        name: jsonOne.result.name,
        title: jsonOne.result.title,
        result: sticArr
    }
}