//♠♥♦♣
let card_group = ['♠A', '♠2', '♠3', '♠4', '♠5', '♠6', '♠7', '♠8', '♠9', '♠10', '♠J', '♠Q', '♠K', '♥A', '♥2', '♥3', '♥4', '♥5', '♥6', '♥7', '♥8', '♥9', '♥10', '♥J', '♥Q', '♥K', '♦A', '♦2', '♦3', '♦4', '♦5', '♦6', '♦7', '♦8', '♦9', '♦10', '♦J', '♦Q', '♦K', '♣A', '♣2', '♣3', '♣4', '♣5', '♣6', '♣7', '♣8', '♣9', '♣10', '♣J', '♣Q', '♣K']
let card_value = {
    '♠A': 144,
    '♠2': 24,
    '♠3': 34,
    '♠4': 44,
    '♠5': 54,
    '♠6': 64,
    '♠7': 74,
    '♠8': 84,
    '♠9': 94,
    '♠10': 104,
    '♠J': 114,
    '♠Q': 124,
    '♠K': 134,
    '♥A': 143,
    '♥2': 23,
    '♥3': 33,
    '♥4': 43,
    '♥5': 53,
    '♥6': 63,
    '♥7': 73,
    '♥8': 83,
    '♥9': 93,
    '♥10': 103,
    '♥J': 113,
    '♥Q': 123,
    '♥K': 133,
    '♦A': 142,
    '♦2': 22,
    '♦3': 32,
    '♦4': 42,
    '♦5': 52,
    '♦6': 62,
    '♦7': 72,
    '♦8': 82,
    '♦9': 92,
    '♦10': 102,
    '♦J': 112,
    '♦Q': 122,
    '♦K': 132,
    '♣A': 141,
    '♣2': 21,
    '♣3': 31,
    '♣4': 41,
    '♣5': 51,
    '♣6': 61,
    '♣7': 71,
    '♣8': 81,
    '♣9': 91,
    '♣10': 101,
    '♣J': 111,
    '♣Q': 121,
    '♣K': 131,
}
let card = ['0', '0', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
//-----------------------调控台--------------------------

//-----------------------调控台--------------------------

//随机发牌函数,调用一次返回一张牌
function random1() {
    //生成牌组的下标
    let index = Math.floor(Math.random() * card_group.length);
    //到牌组取牌
    let temp = card_group[index];
    //取完牌之后从牌组中删除这张牌,避免重复
    card_group.splice(index, 1)
    return temp
}
let generate_card = null

function get_card(n) {
    if (!generate_card) {
        let cards1 = []
        let cards2 = []
        let cards1_value = []
        let cards2_value = []
        if (n == 2) {
            cards1 = [random1(), random1(), random1()]
            cards2 = [random1(), random1(), random1()]
            cards1_value = get_vlaue(cards1)
            cards2_value = get_vlaue(cards2)
        }
        generate_card = [cards1, cards2, cards1_value, cards2_value]
    }

    return generate_card
}

function judge(arr, arr2) {
    let arr_value = get_vlaue(arr)
    let arr1_value = get_vlaue(arr2)
    let result = ''
    let arr_reslut = null;
    let arr1_reslut = null;
    arr_reslut = judge_Connection(arr_value) ? judge_Connection(arr_value) : judge_Pair(arr_value)
    arr1_reslut = judge_Connection(arr1_value) ? judge_Connection(arr1_value) : judge_Pair(arr1_value)
    if (arr_reslut && arr1_reslut) {
        for (let x = 0; x < arr_reslut.length; x++) {
            for (let y = 0; y < arr1_reslut.length; y++) {
                if (x > y) return 1
                else if (x < y) return 2
            }
        }
    } else if (arr_reslut) {
        return 1
    } else if (arr1_reslut) {
        return 2
    } else {
        return compare(get_vlaue(arr), get_vlaue(arr2))
    }
    // result = compare(arr_value, arr1_value)

}

//获取牌对应的值方法
function get_vlaue(arr) {
    //循环三张牌,分别从值数组中取到对应的值
    let temp = [card_value[arr[0]], card_value[arr[1]], card_value[arr[2]]]
    return temp
}

//判断是否为对子方法


function judge_Pair(arr) {
    //temp中将要存入三张牌的值
    let temp = [];

    //循环牌组,将牌组转化为可识别的牌大小的值
    for (let i = 0; i < arr.length; i++) {
        temp.push(parseInt(arr[i] / 10))
    }

    //比较每张牌是否相等,相等的话返回相等的牌和剩下的牌的值,不相等的话返回false表示不是对子
    let temp2 = temp[0] == temp[1] ? card[temp[1]] + ',' + arr[2] : temp[0] == temp[2] ? card[temp[0]] + ',' + arr[1] : temp[1] == temp[2] ? card[temp[1]] + ',' + arr[0] : false
    let result = [];

    //比较是否为豹子
    let temp3 = temp[0] == temp[1] && temp[1] == temp[2] && temp[0] == temp[2] ? true : false;

    //返回的值是字符串,处理为数组,flase的话直接返回
    if (temp3) {
        result.unshift(6)
        console.log('豹子');
        result.push(temp[0])
        return result
    } else if (temp2) {
        //返回值当中,第一个值为牌型值:6豹子,5顺金,4金花,3顺子,2对子,1单张
        temp2 = temp2.split(',')
        temp2.unshift(2)
        console.log('对子');
        return temp2
    } else return temp2;


}

//判断是否为顺子和顺金方法
function judge_Connection(arr) {
    let value = []
    let value2 = [];
    //循环牌组,将牌组转化为可识别的牌花色的值
    for (let i = 0; i < arr.length; i++) {
        value.push(parseInt(arr[i] % 10))
    }


    //循环牌组,将牌组转化为可识别的牌大小的值
    for (let i = 0; i < arr.length; i++) {
        value2.push(parseInt(arr[i] / 10))
    }

    //判断三张牌的花色是否相同
    let a = value[0] == value[1] && value[1] == value[2] ? true : false;
    //判断是不是顺金

    let min = Math.min(value2[0], value2[1], value2[2])
    let max = Math.max(value2[0], value2[1], value2[2]);
    //判断是不是顺金
    if (min + 2 == max && a) {
        let result = []
        let max_index = value2.indexOf(max);
        result.push(5)
        result.push(arr[max_index])
        result.push(value[0])
        console.log('顺金!');
        return result;

    }
    //是顺子吗?
    else if (min + 2 == max) {
        let result = []
        result.push(3)
        let max_index = value2.indexOf(max);
        result.push(arr[max_index])
        console.log('顺子!');
        return result
    }
    //是金花吗?
    else if (a) {
        let result = [].concat(arr);
        result.sort((a, b) => b - a)
        result.unshift(4)
        console.log('金花!');
        return result
    }
    //啥也不是
    else return false
}
//比较单张牌型大小

function compare(arr, arr2) {
    let user1 = [];
    let user2 = [];
    user1 = [parseInt(arr[0] / 10), parseInt(arr[1] / 10), parseInt(arr[2] / 10)]
    user2 = [parseInt(arr2[0] / 10), parseInt(arr2[1] / 10), parseInt(arr2[2] / 10)]
    let a = user1.sort((a, b) => b - a)
    let b = user2.sort((a, b) => b - a)
    let z = (a[0] == b[0] && a[1] == b[1] && a[2] == b[2]) ? true : false;
    if (z) {
        return 0;
    } else {
        for (let i = 0; i < 3; i++) {
            if (a[i] == b[i]) {
                continue;
            } else if (a[i] > b[i]) {
                return 1;
            } else if (a[i] < b[i]) {
                return 2;
            }
        }
    }
}




document.querySelector('.desk').style.height = document.body.clientHeight + 'px'
document.querySelector('.desk').style.width = document.body.clientWidth + 'px'

let a = document.querySelector('.socket')
let b = document.querySelector('.desk')
b.style.display = 'none'
window.onload = function() {
    b.style.display = 'block'
    a.style.display = 'none'
}