// function deepClone(obj) {
//     var cloneObj = Array.isArray(obj) ? [] : {};
//     if (obj && typeof obj === 'object') {
//         for (let key in obj) {
//             if (obj.hasOwnProperty(key)) {
//                 if (obj[key] && typeof obj[key] === 'object') {
//                     cloneObj[key] = deepClone(obj[key]);
//                 } else {
//                     cloneObj[key] = obj[key];
//                 }
//             }
//         }
//     } else {
//         cloneObj = obj;
//     }
//     return cloneObj;
// }

// var obj = {
//     name: 'wxq',
//     age: 3,
//     tickets: [1, 2, [1, 2]],
//     info: {
//         hobby: 'music',
//         address: 'BJ',
//         flag: false,
//         test: {
//             score: 100
//         }
//     }
// }

// var objClone = deepClone(obj);
// console.log(objClone);

// var a = [1, 2, 3];
// var cloneArray = deepClone(a);
// cloneArray.push(3);
// var b = a;
// b.push(0);
// console.log(a, b, Array.isArray(cloneArray), cloneArray);

// var cloneNumber = deepClone(12);
// var cloneString = deepClone('clone');
// var cloneBoolean = deepClone(true);
// var cloneUndefined = deepClone(undefined);
// var cloneNull = deepClone(null);
// var res = [cloneNumber, cloneString, cloneBoolean, cloneUndefined, cloneNull, cloneArray];
// res.forEach(element => {
//     console.log(element, '-------------', typeof(element));
// });

//使用JSON的parse和stringify实现深拷贝
function deepClone1(obj) {
    if (typeof obj !== 'undefined')
        return JSON.parse(JSON.stringify(obj));
    return obj;
}
var a = [1, 2, 3];
var b = deepClone1(a);
b.push(8);
var c = deepClone1(1);
var d = deepClone1('wxq');
var e = deepClone1(true);
var f = deepClone1(null);
var g = deepClone1(undefined);
[a, b, c, d, e, f, g].forEach(e => {
    console.log(e, '——', typeof e);
})
var obj = {
    name: 'wxq',
    age: 3,
    tickets: [1, 2, [1, 2]],
    info: {
        hobby: 'music',
        address: 'BJ',
        flag: false,
        test: {
            score: 100
        }
    }
}
var test = deepClone1(obj);
console.log(test, typeof test);