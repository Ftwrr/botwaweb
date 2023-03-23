import wweb from 'whatsapp-web.js'
const { Buttons } = wweb

let handler = async (m, { conn, text, command, args }) => {
  let test = command.substr(4)
  switch (test) {
  case 'button':
    let button = new Buttons('Button body',[{body:'bt1'},{body:'bt2'},{body:'bt3'}],'title','footer');
    conn.sendMessage(m.id.remote, button);
    break
  default:
    if (!test) return m.reply('?')
  }
}

handler.command = /^test(button)?$/i

handler.owner = true

export default handler