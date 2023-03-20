import puppeteer from 'puppeteer';
import { fileTypeFromBuffer } from 'file-type';
import wweb from 'whatsapp-web.js'
const { MessageMedia } = wweb

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args || !args[0]) return m.reply(`Input URL:\n${usedPrefix + command} https://wwebjs.dev/`);
    let full = args[1] ? /^f(ull)?(pages?)?$/g.test(args[1]) : false
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    await page.goto(args[0]);
    const media = await page.screenshot({fullPage: full});
    await m.reply(new MessageMedia((await fileTypeFromBuffer(media)).mime, Buffer.from(media).toString("base64")))
    await browser.close();
}

handler.help = ['screenshotweb'].map(v => v + ' <url>')
handler.tags = ['tools']
handler.command = /^(screenshot|ss)(site|web(site)?)$/i

export default handler;