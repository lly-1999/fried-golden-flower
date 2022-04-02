document.querySelector('.start').addEventListener('click', function() {

    for (let i = 1; i < 4; i++) {
        let a = '#card_group' + i
        let l = 110 * (i - 1)
        let dl = 100 * (i - 1)
        anime({
            targets: a,
            top: 565,
            left: l,
            delay: dl,
            easing: 'easeInOutExpo'
        })
    }
    let temp = 0
    for (let i = 4; i < 7; i++) {
        let a = '#card_group' + i
        let l = 1090 + 110 * temp
        let dl = 1000 + 100 * (i - 1)
        temp += 1
        anime({
            targets: a,
            top: 565,
            left: l,
            delay: dl,
            easing: 'easeInOutExpo'
        })
    }
})
document.querySelector('#abandon1').addEventListener('click', function() {

    anime({
        targets: ['#card_group1', '#card_group2', '#card_group3'],
        top: 0,
        left: 0,
        easing: 'easeInOutQuint'
    })
})
document.querySelector('#abandon2').addEventListener('click', function() {
    anime({
        targets: ['#card_group4', '#card_group5', '#card_group6'],
        top: 0,
        left: 0,
        easing: 'easeInOutExpo'
    })
})
let changeColor = document.querySelector('.Prize_pool')
setInterval(() => {
    let temp = document.querySelector('.Prize_pool>span').innerHTML
    let value = temp

    if (1) {
        anime({
            targets: '.Prize_pool',
            backgroundColor: color(value),
            duration: 2000,
        })

    }

}, 500);

function color(number) {
    let color = ''
    if (number < 255) {
        temp = parseInt(number).toString(16).toUpperCase()
        color = `#${temp}ff00`

    } else if (number > 255 && number < 500) {
        let temp = 255 - (number - 255)
        temp = temp.toString(16).toUpperCase()
        color = `#ff${temp}00`
    } else {
        color = '#ff0000'
    }
    return color
}
// document.querySelector('#seeCard').addEventListener('click', function() {

// })