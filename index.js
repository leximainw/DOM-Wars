for (const elem of document.querySelectorAll('p')) {
    elem.innerText = elem.innerText
        .replaceAll('?', '\uD83E\uDD14')
        .replaceAll('!', '\uD83D\uDE32')
}

document.querySelector('#switch').addEventListener('click', e => {
    for (const elem of document.querySelectorAll('p')) {
        // HACK: awkwardly switch characters with replaceAll only
        elem.innerText = elem.innerText
            .replaceAll('\\', '\\/')
            .replaceAll('?', '\\?')
            .replaceAll('!', '\\!')
            .replaceAll('\uD83E\uDD14', '?')
            .replaceAll('\uD83D\uDE32', '!')
            .replaceAll('\\?', '\uD83E\uDD14')
            .replaceAll('\\!', '\uD83D\uDE32')
            .replaceAll('\\/', '\\')
    }
})

let callback
let lastUpdate
let offset

document.querySelector('#surprise').addEventListener('click', e => {
    clearInterval(callback)
    lastUpdate = Date.now()
    offset = 30
    callback = setInterval(creditRoll, 10)
    document.querySelector('#theme').play()
})

function creditRoll() {
    const now = Date.now()
    const dt = (now - lastUpdate) / 1000
    lastUpdate = now
    offset -= 2 * dt;

    // HACK: set style to move credit roll
    document.querySelector('body').style = `background-color: black; color: yellow; width: 40vw; margin: auto; transform: perspective(100vmin) translateY(30vmin) rotateX(60deg) translateY(${offset}em);`

    if (offset < -70) {
        clearInterval(callback)
        document.querySelector('body').style = undefined
        document.querySelector('#theme').pause()
        document.querySelector('#theme').currentTime = 0
    }
}