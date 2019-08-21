const { handleTagsTree } = require('./generate-tag-utils')

const parseHtml = function(tagsTree) {
  return handleTagsTree(tagsTree)
}

module.exports = { parseHtml }