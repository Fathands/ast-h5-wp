const circularJSON = require('circular-json');

const postcss = require('postcss');
const less = require('postcss-less-engine');
const autoprefixer = require('autoprefixer');
const clean = require('postcss-clean');
const rem2rpx = require('postcss-rem2rpx');

const path = require('path');
const fs = require('fs');

const { getSFCJson, compileTpl } = require('./utils/utils')

const babel = require('babel-core')
const { parseImportVisitor, traverseJsVisitor, parseExportDefaultVisitor } = require('./utils/parse-script')
const { parseHtml } = require('./utils/parse-html')

const babelrc = path.resolve('./.babelrc')

fs.readFile('./target/target.vue', 'utf8', (err, vueFileContent) => {
  const sfc = getSFCJson(vueFileContent)

  const astTplRes = compileTpl(sfc.template.content).ast
  const wxmlResult = parseHtml(astTplRes)
  // fs.writeFileSync('./dist/res-html-ast.js', circularJSON.stringify(wxmlResult, null, 2));
  fs.writeFileSync('./dist/res-html.wxml', wxmlResult);

  // 生成js文件
  const scriptContent = sfc.script.content
  const babelOptions = { extends: babelrc, plugins: [{visitor: parseImportVisitor}, { visitor: parseExportDefaultVisitor }] }
  const result = babel.transform(scriptContent, babelOptions)
  fs.writeFileSync('./dist/res-js.js', result.code.trim());
  
  // 生成json文件
  // const jsonFile = {
  //   component: result.metadata.isComponent ? true : undefined,
  //   usingComponents: result.metadata.usingComponents
  // }
  // fs.writeFileSync('./dist/res-json.json', circularJSON.stringify(jsonFile, null, 2));

  // // 处理less 生成 css 文件
  // const stylesSting = sfc.styles.reduce((pre, cur) => {
  //   return pre + cur.content.trim() + '\n'
  // }, '')
  // postcss([
  //   less({ strictMath: true }),
  //   rem2rpx({ rootFontSize: 50 }),
  //   autoprefixer(), 
  //   clean()
  // ])
  // .process(stylesSting, { parser: less.parser, from: 'res-styles-ast.less' })
  // .then(function (result) {
  //   fs.writeFileSync('./dist/res-style.wxss', result.css);
  // }, function(err) {
  //   console.log(err);
  // });

});
