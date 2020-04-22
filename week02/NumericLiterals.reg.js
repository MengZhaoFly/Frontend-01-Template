/**
 * 参考： ECMA 11.8.3 Numeric Literals
 */
// 10 进制
var DecimalLiteral = /^(0|([1-9][0-9]*))(\.[0-9]*)?([eE][+-]?[0-9]{1,})?$/
// 2 进制
var BinaryIntegerLiteral = /^0[bB][01]+$/
// 8 进制
var OctalIntegerLiteral = /^0o[0-7]+$/
// 16 进制
var HexIntegerLiteral = /^0x[0-9a-fA-F]+$/
