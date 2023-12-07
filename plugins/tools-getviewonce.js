let handler = async (m, { usedPrefix, command }) => {
    const quoted = await m.getQuotedMessage()
    if (!quoted) return m.reply(`Quote viewonce:\n${usedPrefix + command} viewonce`);
    if (quoted.hasMedia) {
        const media = await quoted.downloadMedia();
        await m.reply(media, null, { caption: quoted.body || '' });
    } else return m.reply(`Quote viewonce:\n${usedPrefix + command} viewonce`);
}

handler.help = ['viewonce'].map(v => v + ' <viewonce>')
handler.tags = ['tools']
handler.command = /^(get)?viewonce$/i

export default handler;