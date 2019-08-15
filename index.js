const compiler = require('vue-template-compiler')
const circularJSON = require('circular-json');
const postcss = require('postcss');
const less = require('postcss-less-engine');
const autoprefixer = require('autoprefixer');
const clean = require('postcss-clean');
const rem2rpx = require('postcss-rem2rpx');
const path = require('path');
const fs = require('fs');

const getSFCJson = function (content) {
  let res = compiler.parseComponent(content)
  return res
}

const compileTpl = function (tpl) {
  let res = compiler.compile(tpl, {
    comments: true,
    preserveWhitespace: false,
    shouldDecodeNewlines: true
  })
  return res
}

fs.readFile('./target/target.vue', 'utf8', (err, vueFileContent) => {
  const sfc = getSFCJson(vueFileContent)
  const astTplRes = compileTpl(sfc.template.content).ast

  const stylesSting = sfc.styles.reduce((pre, cur) => {
    return pre + cur.content.trim() + '\n'
  }, '')

  // html js less 的 ast 文件
  fs.writeFileSync('./dist/index.js', circularJSON.stringify(sfc, null, 2));

  fs.writeFileSync('./dist/res-html-ast.js', circularJSON.stringify(astTplRes, null, 2));

  fs.writeFileSync('./dist/res-js.js', sfc.script.content.trim());
  

  // 处理less
  postcss([
    less({ strictMath: true }),
    rem2rpx({ rootFontSize: 50 }),
    autoprefixer(), 
    clean()
  ])
  .process(stylesSting, { parser: less.parser, from: 'res-styles-ast.less' })
  .then(function (result) {
    fs.writeFileSync('./dist/res-style.wxss', result.css);
  }, function(err) {
    console.log(err);
  });

});
