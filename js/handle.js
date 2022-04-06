if (!localStorage.getItem('gamer2_acont')) {
    localStorage.setItem('gamer1_acont', 1000)
    localStorage.setItem('gamer2_acont', 1000)
}
let gamer1Info = {
    name: '旭东',
    mode: 0,
    last_put_money: 0,

    acont: parseInt(localStorage.getItem('gamer1_acont'))
}
let gamer2Info = {
    name: '李林燠',
    mode: 0,
    last_put_money: 0,
    acont: parseInt(localStorage.getItem('gamer2_acont'))
}
let screen = document.querySelector('#oprate_screen')
let screen2 = document.querySelector('#oprate_screen2')
let inp = document.querySelector('#inp1')
let inp2 = document.querySelector('#inp2')
let Prize_pool_span = document.querySelector('.desk_screen')
let round = 0;
//随机顺序
let sequence = Math.floor(Math.random() * 10) > 5 ? true : false
console.log(sequence);
screen.value = gamer1Info.acont
screen2.value = gamer2Info.acont

function guess(mark) {
    if (mark == sequence) {
        if (gamer1Info.mode == 0) {
            if (gamer2Info.mode == 0) {
                if (inp.value < gamer2Info.last_put_money) {
                    alert('你至少懵:' + gamer2Info.last_put_money)
                } else {
                    let temp = parseInt(Prize_pool_span.value) + parseInt(inp.value)
                    let nScreen = parseInt(screen.value) - parseInt(inp.value)
                    gamer1Info.last_put_money = parseInt(inp.value)
                    inp.value = ''
                    anime({
                        targets: '#oprate_screen',
                        value: nScreen,
                        round: 1,
                    })
                    anime({
                        targets: '.desk_screen',
                        value: temp,
                        round: 1,
                    })
                    sequence = !sequence
                    round++
                }
            } else if (gamer2Info.mode == 1) {
                if (inp.value < Math.ceil(gamer2Info.last_put_money / 3)) {
                    alert('你至少懵:' + Math.ceil(gamer2Info.last_put_money / 3))
                } else {
                    let temp = parseInt(Prize_pool_span.value) + parseInt(inp.value)
                    let nScreen = parseInt(screen.value) - parseInt(inp.value)
                    gamer1Info.last_put_money = parseInt(inp.value)
                    inp.value = ''
                    anime({
                        targets: '#oprate_screen',
                        value: nScreen,
                        round: 1,
                    })
                    anime({
                        targets: '.desk_screen',
                        value: temp,
                        round: 1,
                    })
                    sequence = !sequence
                    round++

                }
            }

        } else alert('你已经看过牌啦!或已弃牌!')

    } else {
        alert('还没轮到你呢')
    }

}

function putMoney(mark) {
    if (mark == sequence) {
        if (gamer1Info.mode == 1) {
            if (gamer2Info.mode == 0) {
                if (inp.value < gamer2Info.last_put_money * 3) {
                    alert('因为上一位玩家还没有看牌,所以你最少得放:' + gamer2Info.last_put_money * 3 + '的钱')
                } else {

                    let temp = parseInt(Prize_pool_span.value) + parseInt(inp.value)
                    let nScreen = parseInt(screen.value) - parseInt(inp.value)
                    gamer1Info.last_put_money = parseInt(inp.value)
                    sequence = !sequence
                    gamer1Info.mode == 1
                    inp.value = ''
                    round++

                    anime({
                        targets: '#oprate_screen',
                        value: nScreen,
                        round: 1,
                    })
                    anime({
                        targets: '.desk_screen',
                        value: temp,
                        round: 1,
                    })
                }
            } else if (gamer2Info.mode == 1) {
                if (inp.value < gamer2Info.last_put_money) {
                    alert('你至少放:' + gamer2Info.last_put_money)
                } else {
                    let temp = parseInt(Prize_pool_span.value) + parseInt(inp.value)
                    let nScreen = parseInt(screen.value) - parseInt(inp.value)
                    gamer1Info.last_put_money = parseInt(inp.value)
                    sequence = !sequence
                    gamer1Info.mode == 1
                    inp.value = ''
                    round++

                    anime({
                        targets: '#oprate_screen',
                        value: nScreen,
                        round: 1,
                    })
                    anime({
                        targets: '.desk_screen',
                        value: temp,
                        round: 1,
                    })
                }
            }


        } else if (gamer1Info.mode == 0) {
            alert('没看牌不能放钱哦,只能懵一下😵')
        } else {
            alert('你已弃牌')
        }
    } else alert('还没轮到你呢')
}

function guess2(mark) {
    if (mark == sequence) {
        if (gamer2Info.mode == 0) {
            if (gamer1Info.mode == 0) {
                if (inp2.value < gamer1Info.last_put_money) {
                    alert('你至少懵:' + gamer1Info.last_put_money)
                } else {
                    let temp = parseInt(Prize_pool_span.value) + parseInt(inp2.value)
                    let nScreen = parseInt(screen.value) - parseInt(inp2.value)
                    gamer2Info.last_put_money = parseInt(inp2.value)
                    inp2.value = ''
                    anime({
                        targets: '#oprate_screen2',
                        value: nScreen,
                        round: 1,
                    })
                    anime({
                        targets: '.desk_screen',
                        value: temp,
                        round: 1,
                    })
                    sequence = !sequence
                    round++

                }
            } else if (gamer1Info.mode == 1) {
                if (inp2.value < Math.ceil(gamer1Info.last_put_money / 3)) {
                    alert('你至少懵:' + Math.ceil(gamer1Info.last_put_money / 3))
                } else {
                    let temp = parseInt(Prize_pool_span.value) + parseInt(inp2.value)
                    let nScreen = parseInt(screen.value) - parseInt(inp2.value)
                    gamer1Info.last_put_money = parseInt(inp2.value)
                    inp2.value = ''
                    anime({
                        targets: '#oprate_screen2',
                        value: nScreen,
                        round: 1,
                    })
                    anime({
                        targets: '.desk_screen',
                        value: temp,
                        round: 1,
                    })
                    sequence = !sequence
                    round++

                }
            }

        } else alert('你已经看过牌啦!或已弃牌!')

    } else {
        alert('还没轮到你呢')
    }

}

function putMoney2(mark) {
    if (mark == sequence) {
        if (gamer2Info.mode == 1) {
            if (gamer1Info.mode == 0) {
                if (inp2.value < gamer1Info.last_put_money * 3) {
                    alert('因为上一位玩家还没有看牌,所以你最少得放:' + gamer1Info.last_put_money * 3 + '的钱')
                } else {

                    let temp = parseInt(Prize_pool_span.value) + parseInt(inp2.value)
                    let nScreen = parseInt(screen.value) - parseInt(inp2.value)
                    gamer2Info.last_put_money = parseInt(inp2.value)
                    sequence = !sequence
                    gamer2Info.mode == 1
                    inp2.value = ''
                    round++

                    anime({
                        targets: '#oprate_screen2',
                        value: nScreen,
                        round: 1,
                    })
                    anime({
                        targets: '.desk_screen',
                        value: temp,
                        round: 1,
                    })
                }
            } else if (gamer1Info.mode == 1) {
                if (inp2.value < gamer1Info.last_put_money) {
                    alert('你至少放:' + gamer1Info.last_put_money)
                } else {
                    let temp = parseInt(Prize_pool_span.value) + parseInt(inp2.value)
                    let nScreen = parseInt(screen2.value) - parseInt(inp2.value)
                    gamer2Info.last_put_money = parseInt(inp2.value)
                    sequence = !sequence
                    gamer2Info.mode == 1
                    inp2.value = ''
                    round++

                    anime({
                        targets: '#oprate_screen2',
                        value: nScreen,
                        round: 1,
                    })
                    anime({
                        targets: '.desk_screen',
                        value: temp,
                        round: 1,
                    })
                }
            }


        } else if (gamer2Info.mode == 0) {
            alert('没看牌不能放钱哦,只能懵一下😵')
        } else {
            alert('你已弃牌')
        }
    } else alert('还没轮到你呢')
}

function settlement(id) {
    if (id == 1) {
        let temp = parseInt(Prize_pool_span.value) + parseInt(screen.value)
        let temp2 = screen2.value
        anime({
            targets: '#oprate_screen',
            value: temp,
            round: 1,
        })
        anime({
            targets: '.desk_screen',
            value: 0,
            round: 1,
        })
        localStorage.setItem('gamer1_acont', temp)
        localStorage.setItem('gamer2_acont', temp2)
    } else if (id == 2) {
        let temp = parseInt(Prize_pool_span.value) + parseInt(screen2.value)
        let temp2 = screen.value
        anime({
            targets: '#oprate_screen2',
            value: temp,
            round: 1,
        })
        anime({
            targets: '.desk_screen',
            value: 0,
            round: 1,
        })
        localStorage.setItem('gamer2_acont', temp)
        localStorage.setItem('gamer1_acont', temp2)
    }
}
let open1 = document.querySelector('#open1')
open1.addEventListener('click', function() {
    if (round < 5) {
        alert('轮数不够两轮,无法开牌!')
    } else {
        console.log('结算' + judge(generate_card[0], generate_card[1]));
        if (judge(generate_card[0], generate_card[1]) == 1) {
            settlement(1)
        } else if (judge(generate_card[0], generate_card[1]) == 2) {
            settlement(2)
        } else alert('结算异常!')
    }
})