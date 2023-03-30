import fetch from 'node-fetch'
import path, { dirname } from 'path'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import cp, { exec as _exec } from 'child_process'
import { promisify } from 'util'
let exec = promisify(_exec).bind(cp)

let handler = async (m, {}) => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  const require = createRequire(__dirname)
  const url = require(path.join(__dirname, '../package.json')).repository.url
  let o
  try {
    o = await exec(`git remote set-url origin ${url} && git pull`)
  } catch (e) {
    o = e
  } finally {
    let { stdout, stderr } = o
    if (stdout.trim()) m.reply(stdout);
    if (stderr.trim()) m.reply(stderr);
  }
}

handler.help = ['update']
handler.tags = ['owner']
handler.command = /^update$/i

handler.owner = true

export default handler