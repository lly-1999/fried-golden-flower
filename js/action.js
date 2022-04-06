document.querySelector('.start').addEventListener('click', function() {

    let high_browser = window.innerHeight - 150
    let width_browser = document.body.clientWidth
    console.log(width_browser);
    console.log(high_browser);
    for (let i = 1; i < 4; i++) {
        let a = '#card_group' + i
        let l = 110 * (i - 1)
        let dl = 100 * (i - 1)
        anime({
            targets: a,
            top: high_browser,
            left: l,
            delay: dl,
            easing: 'easeInOutExpo'
        })
    }
    let temp = 0
    for (let i = 4; i < 7; i++) {
        let a = '#card_group' + i
        let l = width_browser - 430 + (i - 4) * (110)
        console.log(l);
        let dl = 1000 + 100 * (i - 1)
        temp += 1
        anime({
            targets: a,
            top: high_browser,
            left: l,
            delay: dl,
            easing: 'easeInOutExpo'
        })
    }
    screen.value = parseInt(screen.value) - 1
    screen2.value = parseInt(screen2.value) - 1
})
document.querySelector('#abandon1').addEventListener('click', function() {
    gamer1_mode = 3

    anime({
        targets: ['#card_group1', '#card_group2', '#card_group3'],
        top: 0,
        left: 0,
        easing: 'easeInOutQuint'
    })
    settlement(2)
})
document.querySelector('#abandon2').addEventListener('click', function() {
    gamer2_mode = 3

    anime({
        targets: ['#card_group4', '#card_group5', '#card_group6'],
        top: 0,
        left: 0,
        easing: 'easeInOutExpo'
    })
    settlement(1)
})
let changeColor = document.querySelector('.desk_screen')
setInterval(() => {
    let temp = document.querySelector('.desk_screen').value
    let value = temp

    if (1) {
        anime({
            targets: '.desk_screen',
            backgroundColor: color(value),
            duration: 2000,
        })

    }

}, 500);

function color(number) {
    let color = ''
    if (number > 20 && number < 255) {
        temp = parseInt(number).toString(16).toUpperCase()
        color = `#${temp}ff00`

    } else if (number < 10) {} else if (number > 255 && number < 500) {
        let temp = 255 - (number - 255)
        temp = temp.toString(16).toUpperCase()
        color = `#ff${temp}00`
    } else {
        color = '#ff0000'
    }
    return color
}
let cards_switch = false
let cards_switch2 = false
document.querySelector('#seeCard1').addEventListener('click', function() {
    cards_switch = !cards_switch
    let cards = get_card(2)
    let a = 1
    for (let y = 0; y < 3; y++) {
        let temp = '#card_group' + a
        let img = document.querySelector(temp + '>img')
        if (cards_switch) {
            img.src = "./img/" + cards[2][y] + ".png"
        } else {
            img.src = "./img/back.jpg"
        }
        a++
    }
    gamer1Info.mode = 1
})
document.querySelector('#seeCard2').addEventListener('click', function() {
    cards_switch2 = !cards_switch2
    let cards = get_card(2)
    let a = 4
    for (let y = 0; y < 3; y++) {
        let temp = '#card_group' + a
        let img = document.querySelector(temp + '>img')
        if (cards_switch2) {
            img.src = "./img/" + cards[3][y] + ".png"
        } else {
            img.src = "./img/back.jpg"
        }
        a++
    }
    gamer2Info.mode = 1

})
setInterval(() => {
    if (sequence) {
        screen2.style.backgroundColor = '#ffffff'
        screen.style.backgroundColor = '#00ffff'
    } else {
        screen2.style.backgroundColor = '#00ffff'
        screen.style.backgroundColor = '#ffffff'
    }
}, 100);