process.on('uncaughtException', console.error)

import wweb from 'whatsapp-web.js'
const { Client, LocalAuth } = wweb
import { handler } from './handler.js'
import qrcode from 'qrcode-terminal'
import {
    plugins,
    loadPluginFiles,
    pluginFolder,
    pluginFilter
} from './lib/plugins.js'

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox']
        //headless: true
    }
});

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', handler.bind(client));

client.initialize();

// load plugins
loadPluginFiles(pluginFolder, pluginFilter, { recursiveRead: false }).then(_ => console.log(Object.keys(plugins))).catch(console.error)

export { client }