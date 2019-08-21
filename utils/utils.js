const compiler = require('vue-template-compiler')

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

module.exports = { getSFCJson, compileTpl }