import fetch from 'node-fetch'
import db from '../lib/database.js'

let handler = m => m
handler.before = async function (m, { conn }) {
    if (db.data.settings[conn.info.wid._serialized].simi && (m.hasQuotedMsg ? m._data.quotedParticipant.includes(conn.info.wid.user) : false) && !m.fromMe) {
        const res = await fetch('https://api.simsimi.vn/v2/simtalk', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: `text=${m.body}&lc=id` })
        if (res.status !== 200) return;
        const json = await res.json()
        m.reply(json.message)    
    } else {}

}

export default handler;