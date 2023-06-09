export async function before(m, { conn, match }) {
    // if (match) return !1
    if ((await m.getChat()).isGroup)
        return !0
    this.anonymous = this.anonymous ? this.anonymous : {}
    let room = Object.values(this.anonymous).find(room => [room.a, room.b].includes(m.sender) && room.state === 'CHATTING')
    if (room) {
        if (/^.(next|leave|start|find|skip|stop)/.test(m.body))
            return
        let other = [room.a, room.b].find(user => user !== m.sender)
        // await m.copyNForward(other, true)
        await m.forward(other)
    }
    return !0
}
