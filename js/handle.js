//初始化每位玩家的余额
if (!localStorage.getItem('gamer2_acont')) {
    localStorage.setItem('gamer1_acont', 1000)
    localStorage.setItem('gamer2_acont', 1000)
}
//玩家信息,mode为状态,0表示未看牌,1表示已看牌,2表示已弃牌,last_put_money变量存的是该玩家上次放的钱的数量,acont获取该玩家有多少钱
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
let screen = document.querySelector('#oprate_screen') //玩家1余额
let screen2 = document.querySelector('#oprate_screen2') //玩家2余额
let inp = document.querySelector('#inp1') //玩家1输入框
let inp2 = document.querySelector('#inp2') //玩家2输入框
let Prize_pool_span = document.querySelector('.desk_screen') //奖池
let round = 0; //轮数
//随机顺序,true为轮到玩家1了
let sequence = Math.floor(Math.random() * 10) > 5 ? true : false
screen.value = gamer1Info.acont
screen2.value = gamer2Info.acont
    //懵一下方法,mark为玩家标识
function guess(mark) {
    //首先判断是不是轮到他了
    if (mark == sequence) {
        //在判断他看没看过牌
        if (gamer1Info.mode == 0) {
            //在判断玩家2看没看过牌
            if (gamer2Info.mode == 0) {
                //既然对方没看过牌,那该玩家至少放的钱要和对方相等
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

            } //既然对方看过牌了,那他放的钱至少是对方放的钱的1/3
            else if (gamer2Info.mode == 1) {
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
//放钱按钮事件函数
function putMoney(mark) {
    //老规矩,判断有没有轮到她
    if (mark == sequence) {
        //检查自己是不是已经看过牌了
        if (gamer1Info.mode == 1) {
            //看看对方看没看过牌
            if (gamer2Info.mode == 0) {
                //既然对方没看牌,自己却看牌了,那就得以对方上次懵一下的钱3倍的数量放钱
                if (inp.value < gamer2Info.last_put_money * 3) {
                    alert('因为上一位玩家还没有看牌,所以你最少得放:' + gamer2Info.last_put_money * 3 + '的钱')
                } else {
                    let temp = parseInt(Prize_pool_span.value) + parseInt(inp.value) //奖池里现在的钱
                    let nScreen = parseInt(screen.value) - parseInt(inp.value) //玩家余额
                    gamer1Info.last_put_money = parseInt(inp.value) //存取这次放的钱的数量
                    sequence = !sequence //轮到下一个玩家啦
                    gamer1Info.mode == 1 //状态切换,可能有点多余,但我就要写
                    inp.value = '' //清空 输入框
                    round++ //轮次加一
                    //anime都是动画函数后面就不解释了,anime.js
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
            } //如果另一个玩家也看牌了,那就好办了,只要放的钱不少于他上次放的钱就可以 
            else if (gamer2Info.mode == 1) {
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
//同上一个guess方法,只不过分开写了第二个玩家的,应该可以写在一起
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
//同上一个putMoney方法,只不过分开写了第二个玩家的,应该可以写在一起
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
//结算函数,id用来判断谁赢了
function settlement(id) {
    //如果1赢了,1表示玩家1
    if (id == 1) {
        //玩家1的余额等于奖池里的加上自己的
        let temp = parseInt(Prize_pool_span.value) + parseInt(screen.value)
            //获取玩家二的余额,方便等会二存入localStorage
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
            //存入两位玩家的余额
        localStorage.setItem('gamer1_acont', temp)
        localStorage.setItem('gamer2_acont', temp2)
    } //如果玩家2赢了的话,原理同上 
    else if (id == 2) {
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
let open1 = document.querySelector('#open1') //开牌按钮
open1.addEventListener('click', function() { //开牌按钮事件监听
    //轮数不够5的话不让开
    if (round < 5) {
        alert('轮数不够两轮,无法开牌!')
    } else {
        //判断到底谁赢了,generate_card里面存了4个数据,见index.js
        if (judge(generate_card[0], generate_card[1]) == 1) {
            settlement(1)
        } else if (judge(generate_card[0], generate_card[1]) == 2) {
            settlement(2)
        } else alert('结算异常!')
    }
})