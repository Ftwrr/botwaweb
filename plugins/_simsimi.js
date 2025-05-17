import fetch from 'node-fetch'
import db from '../lib/database.js'
import Helper from "../lib/helper.js";

let handler = m => m
handler.before = async function (m, { conn }) {
    // if (db.data.settings[conn.info.wid._serialized].simi && (m.hasQuotedMsg ? m._data.quotedParticipant.includes(conn.info.wid.user) : false) && !m.fromMe) {
    if (db.data.settings[conn.info.wid._serialized].autopilot && ((await Helper.isGroup(m)) ? (m.hasQuotedMsg ? m._data.quotedParticipant.includes(conn.info.wid.user) : false) : true) && !(m.body.length === 0) && !m.fromMe) {
        const res = await googleai(m.body)
        m.reply(res)
    } else { }

}

export default handler;


async function simsimi(text) {
    const res = await fetch('https://api.simsimi.vn/v2/simtalk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `text=${text}&lc=id&key=`
    })
    const json = await res.json()
    console.log(json);
    
    //if (!json.message) return
    return json.message
}

async function googleai(text) {
    const res = await fetch(Helper.API('https://generativelanguage.googleapis.com', '/v1beta/models/gemini-2.0-flash:generateContent', { key: "AIzaSyAgMhOEEfRbJAy-zBDKUkci-Pv6YlvKMp0" }), {
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
            ],
        })
    })
    const json = await res.json()
    //if (!json.candidates[0].content.parts[0].text) return
    return json.candidates[0].content.parts[0].text
}



/* //* GOOGLE API AI https://aistudio.google.com/app/apikey
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
                                text: m.body
                            }
                        ]
                    }
                ],
            })
        })
        const json = await res.json()
        if (!json.candidates[0].content.parts[0].text) return
        m.reply(json.candidates[0].content.parts[0].text)
*/