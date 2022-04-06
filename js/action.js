//动画处理js文件

//给开始按钮添加发牌事件动画
document.querySelector('.start').addEventListener('click', function() {
        //获取浏览器可视区大小
        let high_browser = window.innerHeight - 150 //150为牌的高度,减去牌的高度后,绝对定位到最底下
        let width_browser = document.body.clientWidth
            //给每张牌添加发牌动画
        for (let i = 1; i < 4; i++) {
            let a = '#card_group' + i
            let l = 110 * (i - 1)
            let dl = 100 * (i - 1)
                //发牌函数
            anime({
                targets: a,
                top: high_browser,
                left: l,
                delay: dl,
                easing: 'easeInOutExpo'
            })
        }
        let temp = 0
            //第二组发牌动画
        for (let i = 4; i < 7; i++) {
            let a = '#card_group' + i
            let l = width_browser - 430 + (i - 4) * (110)
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
        //发完牌后,每位玩家减一元的底
        screen.value = parseInt(screen.value) - 1
        screen2.value = parseInt(screen2.value) - 1
    })
    //给玩家2的弃牌按钮添加弃牌动画和处理弃牌事件
document.querySelector('#abandon1').addEventListener('click', function() {
        //把玩家1的状态设置为 3
        gamer1_mode = 3
            //弃牌动画
        anime({
                targets: ['#card_group1', '#card_group2', '#card_group3'],
                top: 0,
                left: 0,
                easing: 'easeInOutQuint'
            })
            //弃牌后触发结算函数,传入参数2表示玩家2胜利
        settlement(2)
    })
    //给玩家2的弃牌按钮添加弃牌动画和处理弃牌事件
document.querySelector('#abandon2').addEventListener('click', function() {
    ////把玩家2的状态设置为 3
    gamer2_mode = 3
        //弃牌动画
    anime({
            targets: ['#card_group4', '#card_group5', '#card_group6'],
            top: 0,
            left: 0,
            easing: 'easeInOutExpo'
        })
        //弃牌后触发结算函数,传入参数2表示玩家1胜利
    settlement(1)
})
let changeColor = document.querySelector('.desk_screen') //获取屏幕中间的奖池dom
    //每500ms更新一次奖池
setInterval(() => {
    let value = document.querySelector('.desk_screen').value
        //更新数据动画
    anime({
        targets: '.desk_screen',
        backgroundColor: color(value),
        duration: 2000,
    })
}, 500);
//奖池背景颜色随着数字的增加变化
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
//看牌盖牌开关变量
let cards_switch = false
let cards_switch2 = false
    //给看牌按钮添加事件监听
document.querySelector('#seeCard1').addEventListener('click', function() {
    //改变开关变量
    cards_switch = !cards_switch
        //获取牌的编号
    let cards = get_card(2)
        //临时变量控制文件名
    let a = 1
        //循环改变每张牌的src
    for (let y = 0; y < 3; y++) {
        //拼接src
        let temp = '#card_group' + a
            //获取将要改变的牌的dom
        let img = document.querySelector(temp + '>img')
            //检查开关变量
        if (cards_switch) {
            img.src = "./img/" + cards[2][y] + ".png"
        } else {
            img.src = "./img/back.jpg"
        }
        a++
    }
    //看完牌后改变玩家1的状态 1为已看牌
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
    //根据变量sequence改变screen的颜色,表示轮到谁了
setInterval(() => {
    if (sequence) {
        screen2.style.backgroundColor = '#ffffff'
        screen.style.backgroundColor = '#00ffff'
    } else {
        screen2.style.backgroundColor = '#00ffff'
        screen.style.backgroundColor = '#ffffff'
    }
}, 100);