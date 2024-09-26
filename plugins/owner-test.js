import wweb from 'whatsapp-web.js'
const { Buttons, List, Location, Poll } = wweb

let handler = async (m, { conn, text, command, args }) => {

  const isAdmin = async (sender) => {
    const groupChat = await m.getChat();
    const participants = groupChat.groupMetadata.participants
    const findAdmin = participants.find(u => u.id._serialized === m.sender);
    const isAdmin = findAdmin.isAdmin
    return isAdmin
  };

  // const test =
  //   console.log("🚀 ~ handler ~ test:", test)
  m.reply((await isAdmin(m)) ? "anda atmin" : "anda bukan atmin");


}

handler.help = ['test'].map(v => v + ' <>')
handler.tags = ['owner']
handler.command = /^test$/i

// handler.owner = true

export default handler