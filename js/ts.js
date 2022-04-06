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


console.log(d([144, 24, 61], [51, 33, 143]));