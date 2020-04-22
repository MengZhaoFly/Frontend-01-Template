/**
 * 参考：
 * ECMA：11.8.4 String Literals
 */
// StringLiteral ::
// " DoubleStringCharactersopt " ' SingleStringCharactersopt '
// 这里只写：DoubleStringCharactersopt
// 1: SourceCharacter but not one of " or \ or LineTerminator
// SourceCharacter ::any Unicode code point
let reg1 = /[^\f\n\r\t\v]|[\u0000-\uffff]/
// 2: \ EscapeSequence
let reg2 = /\\/
// 3: LineContinuation
let reg3 = /\f\n\r\t\v/
