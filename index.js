const compiler = require('vue-template-compiler')
const circularJSON = require('circular-json');

const postcss = require('postcss');
const less = require('postcss-less-engine');
const autoprefixer = require('autoprefixer');
const clean = require('postcss-clean');
const rem2rpx = require('postcss-rem2rpx');

const path = require('path');
const fs = require('fs');

const babel = require('babel-core')
const types = require('babel-types');

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

function getBabelrc (src) {
  if (src && fs.existsSync(src)) {
    return src
  }
  const curBabelRc = path.resolve('./.babelrc')
  if (fs.existsSync(curBabelRc)) {
    return curBabelRc
  }
  return ''
}

const babelrc = getBabelrc()

const parseImportVisitor = {
  "ImportSpecifier|ImportDefaultSpecifier"(path) {
    const currentName = path.node.local.name

    const parentPath = path.findParent((path) => path.isImportDeclaration());
    const [ ExportDefaultDeclaration ] = parentPath.container.filter(item => item.type === 'ExportDefaultDeclaration')
    const { properties } = ExportDefaultDeclaration.declaration

    const [ directivesProperty ] = properties.filter(item => item.key.name === 'directives')
    if (directivesProperty) {
      const { properties } = directivesProperty.value
      properties.forEach(p => {
        const value = p.value.name || p.value.value
        if (value === currentName) {
          path.remove()
          if (!parentPath.node.specifiers.length) {
            path.parentPath.remove()
          }
        }
      })
    }

    const { metadata } = path.hub.file
    const [ componentsProperty ] = properties.filter(item => item.key.name === 'components')
    const usingComponents = {...metadata.usingComponents}
    if (componentsProperty) {
      const { properties } = componentsProperty.value
      properties.forEach(p => {
        const value = p.value.name || p.value.value
        if (value === currentName) {
          usingComponents[value] = parentPath.node.source.value
          path.remove()
          if (!parentPath.node.specifiers.length) {
            path.parentPath.remove()
          }
        }
      })

    }
    metadata.usingComponents = usingComponents

  },
}

const traverseJsVisitor = {
  ObjectProperty: function (path) {
    const { metadata } = path.hub.file
    if (path.node.key.name === 'name' || path.node.key.name === 'directives' || path.node.key.name === 'components') {
      path.remove();
    }
  },
  ObjectMethod: function(path) {
    if (path && path.node && path.node.key.name === 'default') {
      
      const parentPath = path.findParent((path) => path.isObjectProperty());
      const propsNode = parentPath.findParent((findParent) => findParent.isObjectExpression()).container
      if (propsNode.key.name === 'props') {
        path.node.key.name = "value";
      }
    }
  },
  Identifier(path) {
    if (path.node.name === 'props') {
      const name = types.identifier('properties')
      path.replaceWith(name)
    }
    if (path.node.name === 'default') {
      const parentPath = path.findParent((path) => path.isObjectProperty());
      const propsNode = parentPath.findParent((findParent) => findParent.isObjectExpression()).container
      if (propsNode.key.name === 'properties') {
        const name = types.identifier('value')
        path.replaceWith(name)
      }
    }
  }
}

const parseExportDefaultVisitor = {
  ExportDefaultDeclaration: function (path) {
    path.traverse(traverseJsVisitor)
  }
}

fs.readFile('./target/target.vue', 'utf8', (err, vueFileContent) => {
  const sfc = getSFCJson(vueFileContent)
  // const astTplRes = compileTpl(sfc.template.content).ast

  // const stylesSting = sfc.styles.reduce((pre, cur) => {
  //   return pre + cur.content.trim() + '\n'
  // }, '')

  // // html js less 的 ast 文件
  // fs.writeFileSync('./dist/index.js', circularJSON.stringify(sfc, null, 2));

  // fs.writeFileSync('./dist/res-html-ast.js', circularJSON.stringify(astTplRes, null, 2));

  // const [importString, mainString] = sfc.script.content.split('export default')


  const scriptContent = sfc.script.content
  const babelOptions = { extends: babelrc, plugins: [{visitor: parseImportVisitor}, { visitor: parseExportDefaultVisitor }] }
  const result = babel.transform(scriptContent, babelOptions)
  // const ExportDefaultDeclaration = result.ast.program.body.filter(item => item.type === 'ExportDefaultDeclaration').pop()

  // const { declaration } = ExportDefaultDeclaration

  fs.writeFileSync('./dist/res-js-tmp.js', result.code.trim());
  // fs.writeFileSync('./dist/res-js-tmp.js', circularJSON.stringify(result, null, 2));

  const jsonFile = {
    usingComponents: result.metadata.usingComponents
  }
  fs.writeFileSync('./dist/res-json.json', circularJSON.stringify(jsonFile, null, 2));
  
  // fs.writeFile('./dist/res-js-tmp.js', 'const data = ' + mainString, (err) => {
  //   if (err) throw err;

  //   // const jsData = require('./dist/res-js-tmp.js')
  //   // console.log(jsData);
    
  // });
  

  // // 处理less
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
