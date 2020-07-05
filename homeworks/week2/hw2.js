function capitalize(str) {
    let cap = ''
    cap = str[0].toUpperCase()
    let word = ''
    for (let i = 1; i < str.length; i++) {
        word += str[i]
    }
    return cap + word
  }

console.log(capitalize('hello'));
