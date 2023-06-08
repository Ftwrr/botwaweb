async function handler(m, { conn, usedPrefix, command }) {
    command = command.toLowerCase()
    this.anonymous = this.anonymous ? this.anonymous : {}
    switch (command) {
        case 'next':
        case 'skip':
        case 'stop': {
            let room = Object.values(this.anonymous).find(room => room.check(m.sender))
            if (!room) {
                await m.reply(`Kamu tidak sedang berada di anonymous chat`)
                throw 0
            }
            m.reply(`Kamu telah memberhentikan chat`)
            let other = room.other(m.sender)
            if (other) conn.sendMessage(other, `Partner telah memberhentikan chat`)
            delete this.anonymous[room.id]
            if (command === 'stop') break
        }
        case 'search':
        case 'start': {
            if (Object.values(this.anonymous).find(room => room.check(m.sender))) throw 'Kamu masih berada di dalam anonymous chat'
            let room = Object.values(this.anonymous).find(room => room.state === 'WAITING' && !room.check(m.sender))
            if (room) {
                conn.sendMessage(room.a, 'Menemukan partner!')
                room.b = m.sender
                room.state = 'CHATTING'
                conn.sendMessage(room.b, 'Menemukan partner!')
            } else {
                let id = + new Date
                this.anonymous[id] = {
                    id,
                    a: m.sender,
                    b: '',
                    state: 'WAITING',
                    check: function (who = '') {
                        return [this.a, this.b].includes(who)
                    },
                    other: function (who = '') {
                        return who === this.a ? this.b : who === this.b ? this.a : ''
                    },
                }
                m.reply('Menunggu partner...')
            }
            break
        }
    }
}

handler.command = ['start', 'skip', 'stop', 'next', 'search']
handler.private = true

export default handler;