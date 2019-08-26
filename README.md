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

