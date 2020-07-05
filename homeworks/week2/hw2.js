function capitalize(str) {
  const cap = str[0].toUpperCase();
  let word = '';
  for (let i = 1; i < str.length; i += 1) {
    word += str[i];
  }
  return cap + word;
}

console.log(capitalize('hello'));
