
const types = require('babel-types');

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

    if (path && path.node && path.node.key.name === 'methods' && !metadata.isComponent) {
      path.replaceWithMultiple(path.node.value.properties );
      return;
    }
    // 删除 name directives components
    if (path.node.key.name === 'name' || path.node.key.name === 'directives' || path.node.key.name === 'components') {
      path.remove();
      return;
    }
  },
  ObjectMethod: function(path) {
    const { metadata } = path.hub.file
    // 替换 props 中 的defalut
    if (path && path.node && path.node.key.name === 'default') {
      
      const parentPath = path.findParent((path) => path.isObjectProperty());
      const propsNode = parentPath.findParent((findParent) => findParent.isObjectExpression()).container
      if (propsNode.key.name === 'properties') {
        const key = types.identifier('value')
        const value = path.node.body.body[0].argument
        const newNode = types.objectProperty(key, value, false, false, null)
        path.replaceWith(newNode)
      }
    }
    if (path && path.node.key.name === 'data') {
      const key = types.identifier('data')
      const value = path.node.body.body[0].argument
      const newNode = types.objectProperty(key, value, false, false, null)

      // 将this可以访问到的值放到 thisKeyList 中
      const thisKeyList = value.properties.map(item => item.key.name)
      metadata.thisKeyList = metadata.thisKeyList ? [ ...metadata.thisKeyList, ...thisKeyList ] : [ ...thisKeyList ]

      path.replaceWith(newNode)
    }
  },
  Identifier(path) {
    const { metadata } = path.hub.file
    // 替换 props
    if (path.node.name === 'props') {
      metadata.isComponent = true
      
      // 将this可以访问到的值放到 thisKeyList 中
      const thisKeyList = path.parentPath.node.value.properties.map(item => item.key.name)
      metadata.thisKeyList = metadata.thisKeyList ? [ ...metadata.thisKeyList, ...thisKeyList ] : [ ...thisKeyList ]

      const name = types.identifier('properties')
      path.replaceWith(name)
    }
    
    if (path && path.node.name === 'created'){
      let name
      if (metadata.isComponent) {
        name = types.identifier('attached')
      } else {
        name = types.identifier('onLoad')
      }
      path.replaceWith(name)
    }
    if (path && path.node.name === 'mounted'){
      let name
      if (metadata.isComponent) {
        name = types.identifier('ready')
      } else {
        name = types.identifier('onReady')
      }
      path.replaceWith(name)
    }
    if (path && path.node.name === 'destroyed'){
      let name
      if (metadata.isComponent) {
        name = types.identifier('detached')
      } else {
        name = types.identifier('onUnload')
      }
      path.replaceWith(name)
    }
  },
  MemberExpression(path) {
    const { object, property} = path.node
    if (object.type === 'ThisExpression' && property.name !== 'data') {
      const container = path.container
      if (container.type === 'CallExpression') {
        return;
      }
      if (property.name === '$router') {
        return;
      }
      // 将 this.xx 转换成 this.data.xx
      const dataProperty = types.identifier('data')
      const newObject = types.memberExpression(object, dataProperty, false)
      const newMember = types.memberExpression(newObject, property, false)
      path.replaceWith(newMember)
    }
  },
  // 将 this.xx == xx 转换成 this.setData
  AssignmentExpression(path) {
    const leftNode = path.node.left
    const { object, property } = leftNode

    if (leftNode.type === 'MemberExpression' && leftNode.object.type === 'ThisExpression') {
      
      const properties = [types.objectProperty(property, path.node.right, false, false, null)]
      const arguments = [types.objectExpression(properties)]

      const object = types.thisExpression()
      const setDataProperty = types.identifier('setData')
      const callee = types.memberExpression(object, setDataProperty, false)

      const newCallExpression = types.CallExpression(callee, arguments)

      path.replaceWith(newCallExpression)
    }
  },

  CallExpression(path) {
    // 处理 router 路由跳转
    const { arguments, callee } = path.node
    
    const { object, property } = callee
    if (object && object.type === 'MemberExpression' && object.property.name === '$router') {
      const properties = arguments[0].properties
      const [ nameInfo ] = properties.filter(item => item.key.name === 'name')
      const [ paramsInfo ] = properties.filter(item => item.key.name === 'params')
      const [ queryInfo ] = properties.filter(item => item.key.name === 'query')

      const paramsValue = paramsInfo && paramsInfo.value
      const queryValue = queryInfo && queryInfo.value
      const paramsValueList = paramsValue && paramsValue.properties ? paramsValue.properties : []
      const queryValueList = queryValue && queryValue.properties ? queryValue.properties : []
      const paramsItems = [].concat(paramsValueList, queryValueList).map(item => ({ key: item.key, value: item.value }))

      const url = types.identifier('url')
      const routeName = nameInfo.value.value
      
      let expressions, quasis
      if (paramsItems.some(item => types.isCallExpression(item.value) || types.isMemberExpression(item.value))) {
        const expressionList = paramsItems.filter(item => types.isCallExpression(item.value) || types.isMemberExpression(item.value))
        const literalList = paramsItems.filter(item => types.isLiteral(item.value))
        const templateElementLastItem = literalList.reduce((finalString, cur) => {
          return `${finalString}&${cur.key.name}=${cur.value.value}`
        }, '')

        const templateElementItemList = expressionList.map((item, index) => {
          if (index === 0) {
            return `routeName?${item.key.name}=`
          }
          return `&${item.key.name}=`
        })
        
        expressions = expressionList.map(item => item.value)
        quasis = [ ...templateElementItemList, templateElementLastItem ].map(item => {
          return types.templateElement({ raw: item, cooked: item }, false)
        })
      }
      const newTemplateLiteral = types.templateLiteral(quasis, expressions)
      const objectProperty = types.objectProperty(url, newTemplateLiteral, false, false, null)

      // 构造一个CallExpression
      let newPoperty
      if (property.name === 'replace') {
        newPoperty = types.identifier('redirectTo')
      }
      if (property.name === 'push') {
        newPoperty = types.identifier('navigateTo')
      }
      const newArguments = [types.objectExpression([objectProperty])]

      const newObject = types.identifier('wx')
      const newCallee = types.memberExpression(newObject, newPoperty, false)

      const newCallExpression = types.CallExpression(newCallee, newArguments)
      path.replaceWith(newCallExpression)
    }
  }
}

const parseExportDefaultVisitor = {
  ExportDefaultDeclaration: function (path) {
    path.traverse(traverseJsVisitor)

    // 把export default 替换成 Page 或者 Component
    const { metadata } = path.hub.file
    const { declaration } = path.node
    const newArguments = [declaration]
    const name = metadata.isComponent ? 'Component' : 'Page'
    const newCallee = types.identifier(name)
    const newCallExpression = types.CallExpression(newCallee, newArguments)
    path.replaceWith(newCallExpression)
  }
}

module.exports = { parseImportVisitor, traverseJsVisitor, parseExportDefaultVisitor }