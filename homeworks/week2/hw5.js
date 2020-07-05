function join(arr, concatStr) {
    let combine = ''
  for(let i = 0; i < arr.length; i++) {
    if (arr.length === 0) {
        return ''
    } else if (i === arr.length-1) {
      combine += arr[i]
    } else {
      combine += arr[i] + concatStr
    }
  }
  return combine
}

/*
//檢討範例
function join(arr, concatStr) {
    if (arr.length === 0) { // special case
      return '';
    }
  
    let result = arr[0];
    for (let i = 1; i < arr.length; i += 1) {
      result += concatStr + arr[i];
    }
    return result;
  }
*/


function repeat(str, times) {
    let again = ''
    for(i = 1; i <= times; i++) {
        again += str
    } 
    return again
}


/*
//一開始不知道可以直接 += 整個字串的解法，搞到雙層迴圈無言

function repeat(str, times) {
    let again = ''
    for (let n = 1; n <= Number(times); n++) {
        for(i = 0; i < str.length; i++) {
            again += str[i]
        } 
    }
    return again
}
*/

console.log(join(['a'], '!'));
console.log(repeat('a', 5));
