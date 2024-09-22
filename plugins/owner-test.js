import wweb from 'whatsapp-web.js'
const { Buttons, List, Location, Poll } = wweb

let handler = async (m, { conn, text, command, args }) => {

  const isAdmin = async (m) => {
    const groupChat = await m.getChat();
    const participants = groupChat.groupMetadata.participants
    const findAdmin = participants.find(u => u.id._serialized === m.sender);
    const isAdmin = findAdmin.isAdmin
    return isAdmin
  };
  m.reply((await isAdmin(m)) ? "anda atmin" : "anda bukan atmin");

  /*
   _   ___   _   __  __  ___ ___  ___ _____ 
  /_\ |   \ /_\ |  \/  |/ __| _ \/ _ \_   _|
 / _ \| |) / _ \| |\/| | (__|   / (_) || |  
/_/ \_\___/_/ \_\_|  |_|\___|_|_\\___/ |_|

*/

}

handler.help = ['test'].map(v => v + ' <>')
handler.tags = ['owner']
handler.command = /^test$/i

// handler.owner = true

export default handler