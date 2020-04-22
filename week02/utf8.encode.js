/**
 * 
 * @param {*} string 
 * 参考编码方式：
 * https://zh.wikipedia.org/wiki/UTF-8
 */
function Encoding(string) {
  const codepoint = string.split('').map(function (str) {
    return str.charCodeAt(0);
  });
  let res = [];
  for (let code of codepoint) {
    let hexCode = code.toString(16);
    let binaryCode = code.toString(2);
    let number = parseInt(`0x${hexCode}`, 16)
    if (number >= parseInt('0x0000', 16) && number <= parseInt('0x007F', 16)) {
      binaryCode = binaryCode.padStart(7, 0)
      res.push(`0${binaryCode.slice(0, 7)}`);
    } else if (number >= parseInt('0x0080', 16) 
    && number <= parseInt('0x07FF', 16)) {
      binaryCode = binaryCode.padStart(11, 0)
      res.push(`110${binaryCode.slice(0, 5)}-10${binaryCode.slice(5)}`);
    } else if (number >= parseInt('0x0800', 16) 
    && number <= parseInt('0xFFFF', 16)) {
      binaryCode = binaryCode.padStart(16, 0)
      res.push(`1110${binaryCode.slice(0, 4)}-10${binaryCode.slice(4, 10)}-10${binaryCode.slice(10)}`);
    }
  }
  console.log(res)
}
Encoding('\u0700');
Encoding('知');
