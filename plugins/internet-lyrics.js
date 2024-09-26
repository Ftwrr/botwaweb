import Genius from "genius-lyrics"
import { fileTypeFromBuffer } from 'file-type';
import Helper from "../lib/helper.js"
import wweb from 'whatsapp-web.js'
const { MessageMedia } = wweb
import fetch from 'node-fetch'
const Client = new Genius.Client("kSj54U3Fcs8BxPv167Dc5K_3crD_viz6YYnusBla50z8fTCY-O4h4zADTqeE52Za")

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) return m.reply(`Input text:\n${usedPrefix + command} faded`);
    const searches = await Client.songs.search(text);
    if (!searches.length) return m.reply('e')
    const firstSong = searches[0];
    // console.log(firstSong);

    const lyrics = await firstSong.lyrics();

    const resImg = await fetch(firstSong._raw.song_art_image_url)
    let buff = Buffer.from(await resImg.arrayBuffer())
    const caption = `*${firstSong._raw.full_title}*\n_${firstSong._raw.release_date_for_display}_\n${readMore.trimStart()}\n${lyrics}`
    m.reply(new MessageMedia((await fileTypeFromBuffer(buff)).mime, buff.toString("base64")), false, { caption })
    // console.log("About the Song:\n", firstSong, "\n");
    // m.reply(lyrics)
}

handler.help = ['lyrics'].map(v => v + ` (title)`)
handler.tags = ['internet']
handler.command = /^(lyrics|lirik)$/i

export default handler;

const readMore = (String.fromCharCode(8206)).repeat(4001)