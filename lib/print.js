import {
    yellow,
    bgGreen,
    black,
    bgMagenta,
    bgBlue,
    red,
    bgCyan
} from 'colorette';

export default async function (m, conn) {
  const chat = await m.getChat()
  const contact = await m.getContact()
  const chatContact = await conn.getContactById(chat.id._serialized)
  console.log(`\n${black(bgGreen('%s'))} from ${black(bgMagenta('~ %s'))} ${black(bgCyan('%s'))} to ${black(bgMagenta('~ %s'))} ${black(bgBlue('%s'))}`,
    m.type,
    contact.verifiedName || contact.pushname || m._data.notifyName,
    contact.id._serialized,
    chatContact.verifiedName || chatContact.pushname || chatContact.name || chat.id._serialized,
    chat.id._serialized
    )
  console.log(m.error != null ? red(m.body) : m.isCommand ? yellow(m.body) : m.body)
}