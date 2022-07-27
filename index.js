const $ = x => document.querySelectorAll(x);
$.first = x => $(x)[0] || null;

for (const elem of $('p')) {
    elem.innerText = elem.innerText
        .replaceAll('?', '\ud83e\udd14')
        .replaceAll('!', '\ud83d\ude32')
}

$.first('#switch').addEventListener('click', e => {
    for (const elem of $('p')) {
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

$.first('#surprise').addEventListener('click', e => {
    clearInterval(callback)
    lastUpdate = Date.now()
    offset = 30
    callback = setInterval(creditRoll, 10)
    $.first('#theme').play()
})

function creditRoll() {
    const now = Date.now()
    const dt = (now - lastUpdate) / 1000
    lastUpdate = now
    offset -= 2 * dt;

    $.first('body').style = `background-color: black; color: yellow; width: 40vw; margin: auto; transform: perspective(100vmin) translateY(30vmin) rotateX(60deg) translateY(${offset}em);`

    if (offset < -70) {
        clearInterval(callback)
        $.first('body').style = undefined
        $.first('#theme').pause()
        $.first('#theme').currentTime = 0
    }
}

// .credits-scroll
// {
//     transform: perspective(100vmin) translateY(30vmin) rotateX(60deg) translateY(10em);
// }