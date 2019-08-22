
const handleAttrsMap = function(attrsMap) {
  let stringExpression = ''
  stringExpression = Object.entries(attrsMap).map(([key, value]) => {
    // 替换 bind 的 :
    if (key.charAt(0) === ':') {
      return `${key.slice(1)}="{{${value}}}"`
    }
    // 统一做成 bindtap
    if (key === '@click') {
      const [ name, params ] = value.split('(')
      let paramsList
      let paramsString = ''
      if (params) {
        paramsList = params.slice(0, params.length - 1).replace(/\'|\"/g, '').split(',')
        paramsString = paramsList.reduce((all, cur) => {
          return `${all} data-${cur.trim()}="${cur.trim()}"`
        }, '')
      }
      return `bindtap="${name}"${paramsString}`
    }
    if (key === 'v-model') {
      return `value="{{${value}}}"`
    }
    if (key === 'v-if') {
      return `wx:if="{{${value}}}"`
    }
    if (key === 'v-else-if') {
      return `wx:elif="{{${value}}}"`
    }
    if (key === 'v-else') {
      return `wx:else`
    }
    if (key === 'v-for') {
      const [ params, list ] = value.split('in ')
      
      const paramsList = params.replace(/\(|\)/g, '').split(',')
      const [item, index] = paramsList
      const indexString = index ? ` wx:for-index="${index.trim()}"` : ''
      return `wx:for="{{${list.trim()}}}" wx:for-item="${item.trim()}"${indexString}`
    }
    return `${key}="${value}"`
  }).join(' ')
  return stringExpression
}

const handleTag = function ({
  attrsMap,
  tag
}) {
  let stringExpression = ''
  if (attrsMap) {
    stringExpression = handleAttrsMap(attrsMap)
  }
  return `<${tag} ${stringExpression}>`
}

const generateStartTag = function (node) {
  let startTag
  const { tag, attrsMap, type, isComment, text } = node
  if (type === 3) {
    startTag = isComment ? `<!-- ${text} -->` : text
    return startTag;
  }
  if (type === 2) {
    startTag = text.trim()
    return startTag;
  }
  switch (tag) {
    case 'div':
    case 'p':
    case 'span':
    case 'em':
      startTag = handleTag({ tag: 'view', attrsMap });
      break;
    case 'img':
      startTag = handleTag({ tag: 'image', attrsMap });
      break;
    default:
      startTag = handleTag({ tag, attrsMap });
  }
  return startTag
}

const generateEndTag = function (node) {
  let endTag
  const { tag, attrsMap, type, isComment, text } = node
  if (type === 3 || type === 2) {
    endTag = ''
    return endTag;
  }
  switch (tag) {
    case 'div':
    case 'p':
    case 'span':
    case 'em':
      endTag = '</view>'
      break;
    case 'img':
      endTag = '</image>'
      break;
    default:
      endTag = `</${tag}>`
  }
  return endTag
}

// 递归生成 首尾标签
const generateTag = function (node) {
  let children = node.children
  // 如果是if表达式 需要做如下处理
  if (children && children.length) {
    let ifChildren
    const ifChild = children.find(subNode => subNode.ifConditions && subNode.ifConditions.length)
    if (ifChild) {
      const ifChildIndex = children.findIndex(subNode => subNode.ifConditions && subNode.ifConditions.length)
      ifChildren = ifChild.ifConditions.map(item => item.block)
      delete ifChild.ifConditions
      children.splice(ifChildIndex, 1, ...ifChildren)
    }
    children.forEach(function (subNode) {
      generateTag(subNode)
    })
  }
  node.startTag = generateStartTag(node)
  node.endTag = generateEndTag(node)
}

 // 递归生成 所需要的文本
const createWxml = function(node) {
  let templateString = '';
  const { startTag, endTag, children } = node
  let childrenString = ''
  if (children && children.length) {
    childrenString = children.reduce((allString, curentChild) => {
      const curentChildString = createWxml(curentChild)
      return `${allString}\n${curentChildString}\n`
    }, '')
  }
  return `${startTag}${childrenString}${endTag}`
}

// 处理标签并且生成新的标签
const handleTagsTree = function (topTreeNode) {

  generateTag(topTreeNode)

  return createWxml(topTreeNode)

};

module.exports = {
  handleTagsTree
}