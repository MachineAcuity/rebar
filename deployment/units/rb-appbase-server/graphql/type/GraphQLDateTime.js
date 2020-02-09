"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _graphql = require("graphql");
var _error = require("graphql/error");
var _language = require("graphql/language");

// The code in this file is largely modified version of:
// https://github.com/soundtrackyourbrand/graphql-custom-datetype/blob/master/datetype.js

function coerceDate(value) {
  value = new Date(value);
  if (!(value instanceof Date))
    // Is this how you raise a 'field error'?
    throw new Error(
    'Field error: value is not an instance of Date, value =' + JSON.stringify(value));


  if (isNaN(value.getTime())) throw new Error('Field error: value is an invalid Date');

  return value.toJSON();
}

function parseLiteral(ast) {
  if (ast.kind !== _language.Kind.STRING)
  throw new _error.GraphQLError('Query error: Can only parse strings to dates but got a: ' + ast.kind, [
  ast]);


  let result = new Date(ast.value);
  if (isNaN(result.getTime())) throw new _error.GraphQLError('Query error: Invalid date', [ast]);

  if (ast.value !== result.toJSON())
  throw new _error.GraphQLError(
  'Query error: Invalid date format, only accepts: YYYY-MM-DDTHH:MM:SS.SSSZ',
  [ast]);


  return result;
}var _default =

new _graphql.GraphQLScalarType({
  name: 'DateTime',
  description: 'Scalar type for storing date-time information',
  serialize: coerceDate,
  parseValue: coerceDate,
  parseLiteral: parseLiteral });exports.default = _default;
//# sourceMappingURL=GraphQLDateTime.js.map