"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));

var _graphql = require("graphql");
var _utilities = require("graphql/utilities");
var _prettierEslint = _interopRequireDefault(require("prettier-eslint"));

var _ensureFileContent = _interopRequireDefault(require("../../../rb-base-server/ensureFileContent"));

var _eslintrc = _interopRequireDefault(require("../../../../.eslintrc.json"));
var _fsExists = _interopRequireDefault(require("../../../rb-base-server/fsExists"));
var _package = _interopRequireDefault(require("../../../../package.json"));
var _schema = _interopRequireDefault(require("../../../rb-appbase-server/graphql/schema"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // $FlowIgnore Not sure why it gives an error. The file does exist

const fs = _fs.default.promises;

const prettierESLintOptions = { eslintConfig: _eslintrc.default, prettierOptions: _package.default.prettier };

// It is a complete mystery to me why the comments are encased in """ but the relay
// compiler does not like them. Either way, this sanitizes the schema and removes the comment.
const reRemoveComments = new RegExp('"""[^"]*"""', 'g');

async function createGraphQLSchema(units) {
  const result = await (0, _graphql.graphql)(_schema.default, (0, _utilities.getIntrospectionQuery)());
  if (result.errors)
  throw new Error('Failed introspecting schema: ' + JSON.stringify(result.errors, null, 2));

  const printedSchema = (0, _utilities.printSchema)(_schema.default).replace(reRemoveComments, '#');

  const taskPromises = [
  (0, _ensureFileContent.default)(
  _path.default.resolve('./units/_configuration/rb-base-server/graphql/schema.json'),
  null,
  JSON.stringify(result, null, 2),
  true),

  (0, _ensureFileContent.default)(_path.default.resolve('schema.graphql'), null, printedSchema, true)];


  await Promise.all(taskPromises);
}

async function createRouteFile(fileName, imports, exports) {
  let routesAppFrame = ['// @flow', ''];
  routesAppFrame = routesAppFrame.concat(imports);
  routesAppFrame = routesAppFrame.concat(['', 'export default [']);
  routesAppFrame = routesAppFrame.concat(exports);
  routesAppFrame = routesAppFrame.concat([']']);

  await (0, _ensureFileContent.default)(
  fileName,
  null,
  (0, _prettierEslint.default)({ text: routesAppFrame.join('\r\n'), ...prettierESLintOptions }),
  true);

}

async function createRoutes(units) {
  const routesAppFrameImports = [];
  const routesRootImports = [];
  const routesAppFrameExports = [];
  const routesRootExports = [];

  for (let unitName of units)
  if (unitName.endsWith('-webapp')) {
    const routesDir = _path.default.resolve('./units', unitName);
    if (await (0, _fsExists.default)(routesDir)) {
      const routeFileNames = await fs.readdir(routesDir);

      for (let routeFileName of routeFileNames) {
        if (routeFileName.endsWith('.jsx'))
        if (routeFileName.startsWith('routeAppFrame')) {
          const route = routeFileName.substring(0, routeFileName.length - 4);
          routesAppFrameImports.push(
          'import ' + route + " from '../../" + unitName + '/' + route + "'");

          routesAppFrameExports.push('  ' + route + ',');
        } else if (routeFileName.startsWith('routeRoot')) {
          const route = routeFileName.substring(0, routeFileName.length - 4);
          routesRootImports.push(
          'import ' + route + " from '../../" + unitName + '/' + route + "'");

          routesRootExports.push('  ' + route + ',');
        }
      }
    }
  }

  await Promise.all([
  createRouteFile(
  _path.default.resolve('./units/_configuration/rb-appbase-webapp/routesAppFrame.js'),
  routesAppFrameImports,
  routesAppFrameExports),

  createRouteFile(
  _path.default.resolve('./units/_configuration/rb-appbase-webapp/routesRoot.js'),
  routesRootImports,
  routesRootExports)]);


}var

buildUnits = async function buildUnits(units) {
  const taskPromises = [createGraphQLSchema(units), createRoutes(units)];

  await Promise.all(taskPromises);
};exports.default = buildUnits;
//# sourceMappingURL=buildUnits.js.map