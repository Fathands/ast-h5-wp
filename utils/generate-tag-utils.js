
const generateViewStartTag = function ({
  attrsMap
}) {
  const stringExpression = attrsMap && Object.entries(attrsMap).map(([key, value]) => `${key}="${value}"`).join(' ')
  return `<view ${stringExpression}>`
}
const generateImgStartTag = function ({
  attrsMap
}) {
  const stringExpression = attrsMap && Object.entries(attrsMap).map(([key, value]) => `${key}="${value}"`).join(' ')
  return `<image ${stringExpression}>`
}

const generateDefaultStartTag = function ({
  attrsMap,
  tag
}) {
  const stringExpression = Object.entries(attrsMap).map(([key, value]) => `${key}="${value}"`).join(' ')
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
    startTag = text
    return startTag;
  }
  switch (tag) {
    case 'div':
    case 'p':
    case 'span':
    case 'em':
      startTag = generateViewStartTag({ attrsMap });
      break;
    case 'img':
      startTag = generateImgStartTag({ attrsMap });
      break;
    default:
      startTag = generateDefaultStartTag({ tag, attrsMap });
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
  if (children && children.length) {
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