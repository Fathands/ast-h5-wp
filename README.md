# 探索-如何将单个vue文件转换为小程序所需的四个文件(wxml, wxss, json, js)

最近在做需求的时候，经常是，同一个需求是在h5端实现一次，再在小程序实现一次，公司的h5端是用vue写的，微信小程序则是小程序的原生语言，这就导致了很多很重复的劳动，虽然语言不同，但逻辑和设计都是一模一样的。

而公司也没想过花点时间统一一下，比如考虑使用一下mpvue之类的，所以，在本着偷懒的心态下，开始想着如何能避免重复性的工作，比如只需要写一套代码。但是跟mpvue不一样，不需要一个工程化的东西，只需要转换一下自己想转换的文件。

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

这里就不描述具体步骤了，在后面的将<font color=#ff502c size=2>script中的内容 -> 小程序的js文件</font>中有具体描述。

### vue-template-compiler

另外还有一个需要了解的是<font color=#ff502c size=2>vue-template-compiler</font>。
我们写的单个vue文件叫做<font color=#ff502c size=2>SFC(Single File Components)</font>。
vue-template-compiler 就是解析SFC文件，提取每个语言块，将单个VUE文件的<font color=#ff502c size=2>template、script、styles</font>分别解析，得到一个json文件。

具体步骤如下。

```javascript
const fs = require('fs');
const compiler = require('vue-template-compiler')

// 读取文件
const vueFileContent = fs.readFileSync('./target/target.vue', 'utf8');
const sfc = compiler.parseComponent(content)

```

得到的sfc的json文件的结构如下：

![SFC](https://raw.githubusercontent.com/Fathands/ast-h5-wp/master/assets/images/ast-demo.png "SFC")

可以看到单个的vue文件已经被解析成了三个部分，styles是一个数组是因为可以写多个style标签。
我们拿到解析后的json文件之后，就可以正式开始了。

