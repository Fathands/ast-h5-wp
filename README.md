# 探索-如何将单个vue文件转换为小程序所需的四个文件(wxml, wxss, json, js)

最近在做需求的时候，经常是，同一个需求是在h5端实现一次，再在小程序实现一次，公司的h5端是用vue写的，微信小程序则是小程序的原生语言，这就导致了很多很重复的劳动，虽然语言不同，但逻辑和设计都是一模一样的。

而公司也没想过花点时间统一一下，比如考虑使用一下mpvue之类的，所以，在本着偷懒的心态下，开始想着如何能避免重复性的工作，比如只需要写一套代码。但是跟mpvue不一样，不需要一个DSL工程化的东西，只需要转换一下自己想转换的文件。

于是就有了这个想法，把所需要<font color=#ff502c size=2>单个vue文件</font>的转换为<font color=#ff502c size=2>小程序</font>原生语言所需要的四个文件<font color=#ff502c size=2>(wxml, wxss, json, js)</font>

## 预备知识
### AST

在开始之前，需要了解一点<font color=#ff502c size=2>AST(抽象语法树)</font>的相关知识。

比如JavaScript在执行之前，会经过<font color=#ff502c size=2>词法分析</font>和<font color=#ff502c size=2>语法分析</font>两个步骤之后，得到一个<font color=#ff502c size=2>抽象语法树</font>。

比如下面这段代码
```javascript
const foo = (item) => item.id
```

得到的<font color=#ff502c size=2>抽象语法树</font>如下图。
这是在[AST Explorer](https://astexplorer.net/)转换得到的。

![抽象语法树](https://raw.githubusercontent.com/Fathands/ast-h5-wp/master/assets/images/ast-demo.png "抽象语法树")

可以看到我们的js代码已经被转换成一个<font color=#ff502c size=2>json对象</font>，这个json对象的描述了这段代码。
我们可以通过拿到这个json对象去进行树形遍历，从而把这一段js代码进行加工成一段我们想要的代码。比如可以把它转换成一段<font color=#ff502c size=2>ES5的代码</font>。

这里就不描述具体步骤了，在后面的将<font color=#ff502c size=2>script -> js</font>中有具体描述。

这是js的部分。而在vue中，也是将template中的代码转换成了AST结构的json文件。后面我们需要使用到的postcss也是把less或者css文件转换成一个AST结构的json文件，然后再加工，输出成所需要的文件。

### vue-template-compiler

另外还有一个需要了解的是<font color=#ff502c size=2>vue-template-compiler</font>。
我们写的单个vue文件叫做<font color=#ff502c size=2>SFC(Single File Components)</font>。
vue-template-compiler 就是解析SFC文件，提取每个语言块，将单个VUE文件的<font color=#ff502c size=2>template、script、styles</font>分别解析，得到一个json文件。

具体步骤如下。

```javascript
const fs = require('fs');
const compiler = require('vue-template-compiler')

// 读取vue文件
const vueFileContent = fs.readFileSync('./target/target.vue', 'utf8');
const sfc = compiler.parseComponent(content)

```

得到的sfc的json文件的结构如下：

![SFC](https://github.com/Fathands/ast-h5-wp/blob/master/assets/images/sfc.png?raw=true "SFC")

可以看到单个的vue文件已经被解析成了三个部分，styles是一个数组是因为可以写多个style标签。
我们拿到解析后的json文件之后，就可以正式开始了。

## style -> wxss

首先从最简单的开始。将<font color=#ff502c size=2>styles部分</font>转换成<font color=#ff502c size=2>wxss文件</font>。

因为在vue中我们使用的是less的语法，所以解析出来的styles中content的代码是less语法。但是小程序需要的是css的语法。所以我们需要将<font color=#ff502c size=2>less</font>转换成<font color=#ff502c size=2>css</font>。另外在h5端我们less的单位是rem，所以还需要将<font color=#ff502c size=2>rem</font>转换成<font color=#ff502c size=2>rpx</font>。

将less换成css，将rem转换成rpx的方案有很多，这里采用的是postcss。另外还有gulp的方案也可以试试。

postcss已经有插件可以将less转换成css，rem转换成rpx。所以我们直接用<font color=#ff502c size=2>postcss</font>以及postcss的插件<font color=#ff502c size=2>(postcss-less-engine, postcss-clean, postcss-rem2rpx)</font>。

具体步骤如下：

```javascript
const postcss = require('postcss');
const less = require('postcss-less-engine');
const clean = require('postcss-clean');
const rem2rpx = require('postcss-rem2rpx');

// 将styles数组中的content合并成一个字符串
const stylesSting = sfc.styles.reduce((pre, cur) => {
  return pre + cur.content.trim() + '\n'
}, '')

postcss([
  less({ strictMath: true }),
  rem2rpx({ rootFontSize: 50 }),
  clean()
])
.process(stylesSting, { parser: less.parser, from: 'res-styles-ast.less' })
.then((result) =>{
  fs.writeFileSync('./dist/res-style.wxss', result.css);
}, (err) =>{
  console.log(err);
});

```

这里有几个需要注意的点。

1.由于styles是一个数组，postcss需要处理的是一个字符串，所以我们需要事先使用reduce把styles数组中的content合并成一个字符串。

2.在rem2rpx中，需要设置一个rootFontSize，这就需要根据自己的项目情况来。

3.如果style中有<font color=#ff502c size=2>@import "./assets/styles/mixin.less";</font>这样的import代码，则需要把这个文件copy到本地来。

4.这里安装的less包版本为<font color=#ff502c size=2>"less": "2.7.1"</font>，版本3以上好像<font color=#ff502c size=2>postcss-less-engine</font>好像会失效。

## script -> js
### babel

在进行这个步骤之前，先得讲一个很重要的工具，就是<font color=#ff502c size=2> Babel</font>

在将vue中的script部分转换成小程序需要的js文件过程中，最重要的就是Babel。比如需要把created方法转换为小程序的 onLoad 或者 组件中的 attached方法,
我们需要使用Babel把script部分的代码解析成一个AST抽象语法树，再用Babel的api去转换和修改这颗抽象语法树，最后再生成所需要的代码。bable在这里就像一把带有魔法的手术刀，
可以把现有代码转换成任意代码。这一点感觉和lisp的元编程有点像。

总结一下 Babel 的三个主要步骤是：

1.解析(parse)

利用 babylon 对源代码字符串进行解析并生成初始 AST 抽象语法树

2.转换(transform)

遍历初始的 AST 抽象语法树，babel 中有个 babel-core，它向外暴露出 babel.transform 接口。

3.生成(generate)

生成部分 babel 会利用 babel-generator 将转换后的 AST 树转换为新的代码字符串。

以上是理论，下面我们来实践一下。还是那上面AST的箭头函数来练手，将它变成一个ES5语法的函数。

```javascript
const babel = require('babel-core')
const types = require('babel-types'); // types就是用来构造一个新的node节点的

const visitor = {
  ArrowFunctionExpression(path) { // 在visitor中拦截箭头函数
    let params = path.node.params // 获取函数参数
    const returnStatement = types.returnStatement(path.node.body) //构建一个return表达式
    const blockStatement = types.blockStatement([returnStatement]) // 构建一个blockStatement
    // babel-types的functionExpression构造成一个新的ES function语法的函数
    let func = types.functionExpression(null, params, blockStatement, false, false)
    //替换当前箭头函数节点
    path.replaceWith(func)
  },
  VariableDeclaration(path) { // 在visitor中变量声明
    path.node.kind = 'var'
  }
}

const scriptContent = 'const foo = (item) => item.id' // 源代码
const result = babel.transform(scriptContent, {
  plugins: [
      { visitor }
  ]
})

console.log(result.code.trim())
// 结果为：
// var foo = function (item) {
//   return item.id;
// };
```

以上只是简单地讲解了下babel运行原理，然后举了一个简单的例子，整个过程基本是这样的，复杂的部分主要是对每一个需要拦截的节点进行处理。

如果想多了解一点可以参考一下这里

[Babel 插件手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)

[babel-types的使用手册](https://babeljs.io/docs/en/babel-types)

### 处理import文件

现在可以正式开始了。

首先来看一下vue文件中script的基本结构。