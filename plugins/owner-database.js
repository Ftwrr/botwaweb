import db from '../lib/database.js'

let handler = async (m, { conn }) => {
    console.log(db.data)
}

handler.tags = ['owner']
handler.command = /^database|db$/i

handler.owner = true

export default handler;