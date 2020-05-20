let htmlStr = `
<html>
<head>
    <style>
    body div #myid{
        width:100px;
        background-color: #ff5000;
    }
    body div img{
        width:30px;
        background-color: #ff1111;
    }
    </style>
</head>
<body>
    <div class="wrap">
      <img />
      <img />
    </div>
</body>
</html>
`
// 正则表达式：实现 就是 状态机
// KMP：     indexOf   
// htmlStr = `<img id="myid"/>`
// htmlStr = `<div class="abc" id="wrap"><img id="myid"/></div>`
let currentToken = null;
let currentAttribute = null;
let currentTextNode = null;
let stack = [
  { type: 'document', children: []}
]
const EOF = Symbol('EOF');

function emit(token) {
  console.log(token);
  let top = stack[stack.length - 1];
  if (token.type == 'startTag') {
    let element = {
      type: 'element',
      children: [],
      attributes: token.attributes
    }
    element.tagName = token.tagName;
    // 理论上（最佳实践） 一个 element 生成的时候 css 已经分析完成
    // computerCss()
    top.children.push(element);
    if (token.isSelfClosing) {
      // 自封闭 不需要入栈进行配对
      return;
    };
    stack.push(element);
    // start tag，一个全新的 Text
    currentTextNode = null;
  } else if (token.type == 'endTag') {
    
    if (top.tagName != token.tagName) {
      throw new Error("Tag start end does't match!");
    } else {
      stack.pop();
    }
    // end tag, 也是 一个全新的 Text
    currentTextNode = null;
  } else if (token.type == 'text') {
    if (currentTextNode === null) {
      currentTextNode = {
        type: 'text',
        content: ''
      }
      // 当前这个 currentTextNode 就是栈顶元素的 子节点
      top.children.push(currentTextNode);
    }
    currentTextNode.content += token.content
  }
}
function data(c) {
  if (c == '<') {
    return tagOpen;
  }else {
    emit({
      type: 'text',
      content: c
    })
    return data;
  }
}
// < 的下一个状态：两个可能 1：/ 视为闭合标签 2：字母 视为标签名
function tagOpen(c) {
  if (c == '/') {
    return endTagOpen;
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'startTag',
      attributes: [],
      tagName: ''
    }
    return tagName(c);
  }
}
// 闭合标签 生成 token 交给 tagName
function endTagOpen(c) {
  if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'endTag',
      tagName: ''
    }
    return tagName(c);
  }
}
// 不管是 开始tag、还是结束tag，都会进入该状态
// 遇到 whiteSpace 处理属性
// 遇到 字母 拼接 token
// 遇到 结束符 emit token <div>
function tagName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  }else if (c.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += c;
    return tagName
  } else if (c === '>') {
    emit(currentToken);
    return data;
  }
}
// 处理 Attribute 略
// 遇到 / 自封闭
// 遇到 > 该标签结束
// 遇到 whiteSpace 循环处理属性
function beforeAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c == '/') {
    return selfClosingStartTag;
  } else if (c == '>') {
    emit(currentToken)
    return data;
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentAttribute = {
      name: c,
      value: ''
    }
    return attributeName;
  } else {
    return beforeAttributeName;
  }
}
/**
 * 1: 合格 拼接自己的 attributeName
   2: = 处理属性
 */
function attributeName(c) {
  if (c.match(/^[a-zA-Z]$/)) {
    currentAttribute.name += c;
    return attributeName;
  } else if (c === '=') {
    return attributeValue
  }
}
/**
 * 1: 合格 拼接自己的 attributeValue
   2: = 处理属性
 */
function attributeValue(c) {
  if (c === "\"" || c === "\"") {
    return attributeValue
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentAttribute.value += c;
    return attributeValue;
  } else {
    // 处理完一个属性
    currentToken.attributes.push(currentAttribute);
    currentAttribute = null;
    // <div class="abc"> 处理完 attributeValue 消耗一个 字符
    return beforeAttributeName(c);
  }
}
function selfClosingStartTag(c) {
  if (c == '>') {
    currentToken.isSelfClosing = true;
    emit(currentToken)
    return data;
  }
}
function parseHTML(html) {
  let state = data;
  for (let c of html) {
    state = state(c);
  }
  // state = state(EOF);
}
parseHTML(htmlStr);
console.log(JSON.stringify(stack, null, 2));
module.exports = {
  parseHTML
}