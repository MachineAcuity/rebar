"use strict";

var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));

var _prettierEslint = _interopRequireDefault(require("prettier-eslint"));
var _sortedJsonStringify = _interopRequireDefault(require("sorted-json-stringify"));


var _eslintrc = _interopRequireDefault(require("../../.eslintrc.json"));
var _fsExists = _interopRequireDefault(require("../rb-base-server/fsExists"));

var _prettierrc = _interopRequireDefault(require("../../.prettierrc.json"));
var _buildUnits = _interopRequireDefault(require("../_configuration/rb-base-tools/buildUnits"));
var _ensureFileContent = _interopRequireDefault(require("../rb-base-server/ensureFileContent"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // $FlowIgnore Not sure why it gives an error. The file does exist
// $FlowIgnore it is a valid path actually
const fs = _fs.default.promises;

const prettierESLintOptions = {
  eslintConfig: _eslintrc.default,
  prettierOptions: _prettierrc.default };


function mergeScripts(scripts1, scripts2) {
  const scripts = Object.assign({}, scripts1);

  for (let scriptName in scripts2) {
    const script = scripts[scriptName];
    const script2 = scripts2[scriptName];

    if (script && script2) {
      scripts[scriptName] = script + ' && ' + script2;
    } else if (script2) {
      scripts[scriptName] = script2;
    }
  }

  return scripts;
}

async function createPackageJson(units) {
  const packageJsonFileName = _path.default.resolve('./package.json');
  const currentPackageAsJSONString = (await fs.readFile(packageJsonFileName)).toString();
  const currentPackageAsObject = JSON.parse(currentPackageAsJSONString);
  const packageAsObject = {
    dependencies: {},
    devDependencies: {},
    engines: {},
    husky: {},
    name: null,
    //prettier: {},
    scripts: {},
    version: null };


  // Make sure not to overwrite version information
  packageAsObject.version = currentPackageAsObject.version;
  packageAsObject.name = currentPackageAsObject.name;

  // Add packages to object
  for (let unitName of units) {
    const packageAsObjectName = _path.default.resolve('./units', unitName, 'package.part.json');
    if (await (0, _fsExists.default)(packageAsObjectName)) {
      const packageToAddAsObject = JSON.parse((await fs.readFile(packageAsObjectName)).toString());

      if (packageToAddAsObject.dependencies)
      Object.assign(packageAsObject.dependencies, packageToAddAsObject.dependencies);
      if (packageToAddAsObject.devDependencies)
      Object.assign(packageAsObject.devDependencies, packageToAddAsObject.devDependencies);
      if (packageToAddAsObject.engines)
      Object.assign(packageAsObject.engines, packageToAddAsObject.engines);
      if (packageToAddAsObject.husky)
      Object.assign(packageAsObject.husky, packageToAddAsObject.husky);
      // if (packageToAddAsObject.prettier)
      //   Object.assign(packageAsObject.prettier, packageToAddAsObject.prettier)
      if (packageToAddAsObject.scripts)
      packageAsObject.scripts = mergeScripts(
      packageAsObject.scripts,
      packageToAddAsObject.scripts);

    }
  }

  await (0, _ensureFileContent.default)(
  packageJsonFileName,
  currentPackageAsJSONString,
  (0, _sortedJsonStringify.default)(packageAsObject, null, 2),
  true);

}

async function createMutations(units) {
  const mutationsImports = [];
  const mutationsExports = [];

  for (let unitName of units)
  if (unitName.endsWith('-server')) {
    const mutationsDir = _path.default.resolve('./units', unitName, 'graphql/mutation');
    if (await (0, _fsExists.default)(mutationsDir)) {
      const mutationFileNames = await fs.readdir(mutationsDir);

      for (let mutationFileName of mutationFileNames) {
        if (mutationFileName.endsWith('.js')) {
          const mutation = mutationFileName.substring(0, mutationFileName.length - 3);
          mutationsImports.push(
          'import ' +
          mutation.replace('.', '_') +
          " from '../../../" +
          unitName +
          '/graphql/mutation/' +
          mutation +
          "'");

          mutationsExports.push('  ' + mutation + ',');
        }
      }
    }
  }

  let mutations = ['// @flow', ''];
  mutations = mutations.concat(mutationsImports);
  mutations = mutations.concat(['', 'export default {']);
  mutations = mutations.concat(mutationsExports);
  mutations = mutations.concat(['}']);

  await (0, _ensureFileContent.default)(
  _path.default.resolve('./units/_configuration/rb-base-server/graphql/_mutations.js'),
  null,
  (0, _prettierEslint.default)({ text: mutations.join('\r\n'), ...prettierESLintOptions }),
  true);

}

async function createSchemas(units) {
  const schemasImports = [];

  for (let unitName of units)
  if (unitName.endsWith('-server')) {
    const schemasDir = _path.default.resolve('./units', unitName, 'graphql/model');
    if (await (0, _fsExists.default)(schemasDir)) {
      const objectTypeFileNames = await fs.readdir(schemasDir);

      for (let objectTypeFileName of objectTypeFileNames) {
        if (objectTypeFileName.endsWith('.js')) {
          const objectType = objectTypeFileName.substring(0, objectTypeFileName.length - 3);
          schemasImports.push(
          "import '../../../" + unitName + '/graphql/model/' + objectType + "'");

        }
      }
    }
  }

  let schemas = ['// @flow', ''];
  schemas = schemas.concat(schemasImports);
  schemas = schemas.concat(['', 'export default true']);

  await (0, _ensureFileContent.default)(
  _path.default.resolve('./units/_configuration/rb-base-server/graphql/_schemas.js'),
  null,
  (0, _prettierEslint.default)({ text: schemas.join('\r\n'), ...prettierESLintOptions }),
  true);

}

async function createViewerFields(units) {
  const viewerFieldsImports = [];
  const viewerFieldsExports = [];

  for (let unitName of units)
  if (unitName.endsWith('-server')) {
    const viewerFieldsFileName = _path.default.resolve(
    './units',
    unitName,
    'graphql/type/_ViewerFields.js');

    if (await (0, _fsExists.default)(viewerFieldsFileName)) {
      const viewerFieldsImportName = unitName.replace(/-/g, '_');
      viewerFieldsImports.push(
      'import ' +
      viewerFieldsImportName +
      " from '../../../" +
      unitName +
      "/graphql/type/_ViewerFields'");

      viewerFieldsExports.push('  ...' + viewerFieldsImportName + ',');
    }
  }

  let viewerFields = ['// @flow', ''];
  viewerFields = viewerFields.concat(viewerFieldsImports);
  viewerFields = viewerFields.concat(['', 'export default {']);
  viewerFields = viewerFields.concat(viewerFieldsExports);
  viewerFields = viewerFields.concat(['}']);

  await (0, _ensureFileContent.default)(
  _path.default.resolve('./units/_configuration/rb-base-server/graphql/_ViewerFields.js'),
  null,
  (0, _prettierEslint.default)({
    text: viewerFields.join('\r\n'),
    ...prettierESLintOptions }),

  true);

}

async function getUnits() {
  const units = (await fs.readdir('./units/')).filter(
  fileName => fileName !== '.DS_Store' && fileName !== '_configuration');

  return units;
}

async function main() {
  const units = await getUnits();

  const taskPromises = [
  createPackageJson(units),
  createViewerFields(units),
  createSchemas(units),
  createMutations(units),
  (0, _buildUnits.default)(units)];


  await Promise.all(taskPromises);
}

main().then(() => console.log('Fin.'));
//# sourceMappingURL=buildUnits.js.map