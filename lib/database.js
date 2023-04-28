// import Helper from './helper.js'
import { Low, JSONFile } from 'lowdb'
import lodash from 'lodash'

const databaseAdapter = new JSONFile(`database.json`)
let database = (new Low(databaseAdapter))

loadDatabase()

async function loadDatabase() {
    // If database is processed to be loaded from cloud, wait for it to be done
    if (database._read) await database._read
    if (database.data !== null) return database.data
    database._read = database.read().catch(console.error)
    await database._read
    // console.log('- Database loaded -')
    database.data = {
        users: {},
        chats: {},
        stats: {},
        msgs: {},
        sticker: {},
        settings: {},
        ...(database.data || {})
    }
    database.chain = lodash.chain(database.data)

    return database.data
}


export {
    databaseAdapter,
    database,
    loadDatabase
}

export default database