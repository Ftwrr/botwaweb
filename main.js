// process.on('uncaughtException', console.error)
// process.on('unhandledRejection', console.error)

import wweb from 'whatsapp-web.js'
const { Client, LocalAuth } = wweb
import { handler } from './handler.js'
import etc from "./etc.js";
import qrcode from 'qrcode-terminal'
import { platform } from 'node:os'
import {
    plugins,
    loadPluginFiles,
    pluginFolder,
    pluginFilter
} from './lib/plugins.js'

const conn = new Client({
    authStrategy: new LocalAuth({
        clientId: 'botwaweb',
        dataPath: './session'
    }),
    puppeteer: {
        args: ['--no-sandbox'],
        executablePath: platform() === 'win32' ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe' : '/usr/bin/google-chrome-stable'
    },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15'
});

conn.initialize();

conn.on('loading_screen', (percent, message) => {
    console.log('LOADING SCREEN', percent, message);
});

conn.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, { small: true });
});

conn.on('authenticated', () => {
    console.log('AUTHENTICATED');
});

conn.on('auth_failure', msg => {
    // Fired if session restore was unsuccessful
    console.error('AUTHENTICATION FAILURE', msg);
});

conn.on('ready', async () => {
    console.log('READY');
    await conn.sendMessage(etc.owner + "@c.us", `${JSON.stringify(conn.info)}`)
});

conn.on('message_create', handler.bind(conn));


// load plugins
loadPluginFiles(pluginFolder, pluginFilter, { logger: console, recursiveRead: false }).then(_ => console.log(Object.keys(plugins))).catch(console.error)

export { conn }