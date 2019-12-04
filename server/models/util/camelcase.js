'use strict'

const camelCase = require('lodash.camelcase')

module.exports = function toCamelCase (input) {
  const result = {}

  for (const [key, value] of Object.entries(input)) {
    const k = camelCase(key)

    if (!Object.prototype.hasOwnProperty.call(result, k)) {
      result[k] = value
    }
  }

  return result
}
