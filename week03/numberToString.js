function foo(number, x) {
  var integer = Math.floor(number)
  var fraction = number - integer;
  var str = ''
  while(integer > 0) {
    str = String(integer % 10) + str;
    integer = Math.floor(integer / 10);
  }
  return str;
}
console.log(foo(1009, 10))