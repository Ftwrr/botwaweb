import fetch from 'node-fetch'
import Helper from "../lib/helper.js"

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) return m.reply(`Input text:\n${usedPrefix + command} halo`);
    const res = await fetch(Helper.API('https://generativelanguage.googleapis.com', '/v1beta/models/gemini-1.5-flash-latest:generateContent', { key: "AIzaSyAgMhOEEfRbJAy-zBDKUkci-Pv6YlvKMp0" }), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents: [
                {
                    parts: [
                        {
                            text: text
                        }
                    ]
                }
            ]
        })
    })
    const json = await res.json()
    m.reply(json.candidates[0].content.parts[0].text)
}

handler.help = ['ai'].map(v => v + ' <prompt>')
handler.tags = ['internet']
handler.command = /^(ai)$/i

export default handler;
