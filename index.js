import { Client, LocalAuth } from 'whatsapp-web.js'
import  qrcode from 'qrcode-terminal'

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: false
    }
});

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
});

client.initialize();