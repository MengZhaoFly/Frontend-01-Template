function foo(string) {
  var chars = string.split('');
  var number = 0;
  // for (let char of chars) {
  //   // 每次扩大十倍 在加上另外一个数
  //   number = number * 10;
  //   let char2Num = char.codePointAt(0) -'0'.codePointAt(0);
  //   number += char2Num;
  // }
  var i = 0;
  while (i < chars.length && chars[i] !== '.') {
    // 每次扩大十倍 在加上另外一个数
    number = number * 10;
    let char2Num = chars[i].codePointAt(0) -'0'.codePointAt(0);
    number += char2Num;
    i ++;
  }
  if (chars[i] === '.') i ++;
  // 处理小数
  var fraction = 1;
  while (i < chars.length) {
    fraction = fraction / 10;
    let char2Num = (chars[i].codePointAt(0) -'0'.codePointAt(0)) * fraction;
    number += char2Num;
    i ++;
  }
  return number;
}
console.log(foo('1009.123456'))