import { fileTypeFromBuffer } from 'file-type';
import wweb from 'whatsapp-web.js'
const { MessageMedia } = wweb
import fetch from 'node-fetch'
import etc from "../etc.js";

let handler = async (m, { conn, text, usedPrefix, command }) => {
    const quotedMessage = m.hasQuotedMsg ? await m.getQuotedMessage() : m
    const teks = m.hasQuotedMsg ? quotedMessage.body : text
    if (teks === "") return m.reply(`Input message:\n${usedPrefix + command} hello world`);
    const avatar = await conn.getProfilePicUrl((await m.getChat()).isGroup ? quotedMessage.author : quotedMessage.from)
    const username = (await quotedMessage.getContact()).pushname
    const quote = await generateQuote(teks, avatar, username)
    m.reply(new MessageMedia((await fileTypeFromBuffer(quote)).mime, quote.toString("base64")), false, { sendMediaAsSticker: true, stickerName: etc.author, stickerAuthor: etc.author, stickerCategories: ['😅'] })
}

handler.help = ['quotemaker'].map(v => v + ' <message>')
handler.tags = ['tools']
handler.command = /^(quote(maker|stic?ker)|(q(uick)?c(hats?)?))$/i

export default handler;

async function generateQuote(text, avatar, username) {
    const data = {
      "format": "png",
      "backgroundColor": "#1f2c34",
      /*
      TODO
      "media": [{}],
      "mediaType": "sticker",
      */
      "messages": [
      {
          "avatar": avatar ? true : false,
          "from": {
            "name": username,
            "photo": {
              "url": avatar
          }
      },
      "text": text,
      "replyMessage": {} //TODO
  }
  ]
  };
  let res = await fetch('https://bot.lyo.su/quote/generate', { method: 'post', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'} })
  if (!res.ok) throw `${res.status} ${res.statusText}`
  const json = await res.json()
  return Buffer.from(json.result.image, 'base64')
}