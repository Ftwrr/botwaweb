import wweb from 'whatsapp-web.js'
const { Buttons, List, Location, Poll } = wweb

let handler = async (m, { conn, text, command, args }) => {
  let test = args[0]
  switch (test) {
    case 'button':
      conn.sendMessage(m.chat, new Buttons('Button body', [{ body: 'bt1' }, { body: 'bt2' }, { body: 'bt3' }], 'title', 'footer'));
      break
    case 'list':
      let sections = [{ title: 'sectionTitle', rows: [{ title: 'ListItem1', description: 'desc' }, { title: 'ListItem2' }] }];
      let list = new List('List body', 'btnText', sections, 'Title', 'footer');
      conn.sendMessage(m.chat, list);
      break
    case 'poll':
      conn.sendMessage(m.chat, new Poll('Winter or Summer?', ['Winter', 'Summer']));
      break
    case 'loc':
    case 'location':
      conn.sendMessage(m.chat, new Location(37.422, -122.084, 'Googleplex\nGoogle Headquarters'));
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