import wweb from 'whatsapp-web.js'
const { Buttons, List, Location } = wweb

let handler = async (m, { conn, text, command, args }) => {
  let test = args[0]
  switch (test) {
  case 'button':
    let button = new Buttons('Button body',[{body:'bt1'},{body:'bt2'},{body:'bt3'}],'title','footer');
    conn.sendMessage(m.id.remote, button);
    break
  case 'list':
    let sections = [{title:'sectionTitle',rows:[{title:'ListItem1', description: 'desc'},{title:'ListItem2'}]}];
    let list = new List('List body','btnText',sections,'Title','footer');
    conn.sendMessage(m.id.remote, list);
    break
  case 'loc':
  case 'location':
    conn.sendMessage(m.id.remote, new Location(37.422, -122.084, 'Googleplex\nGoogle Headquarters'));
    break
  default:
    if (!test) return m.reply('?')
  }
}

handler.help = ['test'].map(v => v + ' <>')
handler.tags = ['owner']
handler.command = /^test$/i

handler.owner = true

export default handler