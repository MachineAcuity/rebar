// @flow

import fsWithCallbacks from 'fs'
import path from 'path'

import prettierESLint from 'prettier-eslint'
import sortedJSONStringify from 'sorted-json-stringify'

// $FlowIgnore Not sure why it gives an error. The file does exist
import eslintRC from '../../.eslintrc.json'
import fsExists from '../rb-base-server/fsExists'
// $FlowIgnore it is a valid path actually
import prettierOptions from '../../.prettierrc.json'
import buildUnits from '../_configuration/rb-base-tools/buildUnits'
import ensureFileContent from '../rb-base-server/ensureFileContent'

const fs = fsWithCallbacks.promises

const prettierESLintOptions = {
  eslintConfig: eslintRC,
  prettierOptions,
}

function mergeScripts(scripts1, scripts2) {
  const scripts = Object.assign({}, scripts1)

  for (let scriptName in scripts2) {
    const script = scripts[scriptName]
    const script2 = scripts2[scriptName]

    if (script && script2) {
      scripts[scriptName] = script + ' && ' + script2
    } else if (script2) {
      scripts[scriptName] = script2
    }
  }

  return scripts
}

async function createPackageJson(units: Array<string>) {
  const packageJsonFileName = path.resolve('./package.json')
  const currentPackageAsJSONString = (await fs.readFile(packageJsonFileName)).toString()
  const currentPackageAsObject = JSON.parse(currentPackageAsJSONString)
  const packageAsObject = {
    dependencies: {},
    devDependencies: {},
    engines: {},
    husky: {},
    name: null,
    //prettier: {},
    scripts: {},
    version: null,
  }

  // Make sure not to overwrite version information
  packageAsObject.version = currentPackageAsObject.version
  packageAsObject.name = currentPackageAsObject.name

  // Add packages to object
  for (let unitName of units) {
    const packageAsObjectName = path.resolve('./units', unitName, 'package.part.json')
    if (await fsExists(packageAsObjectName)) {
      const packageToAddAsObject = JSON.parse((await fs.readFile(packageAsObjectName)).toString())

      if (packageToAddAsObject.dependencies)
        Object.assign(packageAsObject.dependencies, packageToAddAsObject.dependencies)
      if (packageToAddAsObject.devDependencies)
        Object.assign(packageAsObject.devDependencies, packageToAddAsObject.devDependencies)
      if (packageToAddAsObject.engines)
        Object.assign(packageAsObject.engines, packageToAddAsObject.engines)
      if (packageToAddAsObject.husky)
        Object.assign(packageAsObject.husky, packageToAddAsObject.husky)
      // if (packageToAddAsObject.prettier)
      //   Object.assign(packageAsObject.prettier, packageToAddAsObject.prettier)
      if (packageToAddAsObject.scripts)
        packageAsObject.scripts = mergeScripts(
          packageAsObject.scripts,
          packageToAddAsObject.scripts,
        )
    }
  }

  await ensureFileContent(
    packageJsonFileName,
    currentPackageAsJSONString,
    sortedJSONStringify(packageAsObject, null, 2),
    true,
  )
}

async function createMutations(units: Array<string>) {
  const mutationsImports = []
  const mutationsExports = []

  for (let unitName of units)
    if (unitName.endsWith('-server')) {
      const mutationsDir = path.resolve('./units', unitName, 'graphql/mutation')
      if (await fsExists(mutationsDir)) {
        const mutationFileNames = await fs.readdir(mutationsDir)

        for (let mutationFileName of mutationFileNames) {
          if (mutationFileName.endsWith('.js')) {
            const mutation = mutationFileName.substring(0, mutationFileName.length - 3)
            mutationsImports.push(
              'import ' +
                mutation.replace('.', '_') +
                " from '../../../" +
                unitName +
                '/graphql/mutation/' +
                mutation +
                "'",
            )
            mutationsExports.push('  ' + mutation + ',')
          }
        }
      }
    }

  let mutations = [ '// @flow', '' ]
  mutations = mutations.concat(mutationsImports)
  mutations = mutations.concat([ '', 'export default {' ])
  mutations = mutations.concat(mutationsExports)
  mutations = mutations.concat([ '}' ])

  await ensureFileContent(
    path.resolve('./units/_configuration/rb-base-server/graphql/_mutations.js'),
    null,
    prettierESLint({ text: mutations.join('\r\n'), ...prettierESLintOptions }),
    true,
  )
}

async function createSchemas(units: Array<string>) {
  const schemasImports = []

  for (let unitName of units)
    if (unitName.endsWith('-server')) {
      const schemasDir = path.resolve('./units', unitName, 'graphql/model')
      if (await fsExists(schemasDir)) {
        const objectTypeFileNames = await fs.readdir(schemasDir)

        for (let objectTypeFileName of objectTypeFileNames) {
          if (objectTypeFileName.endsWith('.js')) {
            const objectType = objectTypeFileName.substring(0, objectTypeFileName.length - 3)
            schemasImports.push(
              "import '../../../" + unitName + '/graphql/model/' + objectType + "'",
            )
          }
        }
      }
    }

  let schemas = [ '// @flow', '' ]
  schemas = schemas.concat(schemasImports)
  schemas = schemas.concat([ '', 'export default true' ])

  await ensureFileContent(
    path.resolve('./units/_configuration/rb-base-server/graphql/_schemas.js'),
    null,
    prettierESLint({ text: schemas.join('\r\n'), ...prettierESLintOptions }),
    true,
  )
}

async function createViewerFields(units: Array<string>) {
  const viewerFieldsImports = []
  const viewerFieldsExports = []

  for (let unitName of units)
    if (unitName.endsWith('-server')) {
      const viewerFieldsFileName = path.resolve(
        './units',
        unitName,
        'graphql/type/_ViewerFields.js',
      )
      if (await fsExists(viewerFieldsFileName)) {
        const viewerFieldsImportName = unitName.replace(/-/g, '_')
        viewerFieldsImports.push(
          'import ' +
            viewerFieldsImportName +
            " from '../../../" +
            unitName +
            "/graphql/type/_ViewerFields'",
        )
        viewerFieldsExports.push('  ...' + viewerFieldsImportName + ',')
      }
    }

  let viewerFields = [ '// @flow', '' ]
  viewerFields = viewerFields.concat(viewerFieldsImports)
  viewerFields = viewerFields.concat([ '', 'export default {' ])
  viewerFields = viewerFields.concat(viewerFieldsExports)
  viewerFields = viewerFields.concat([ '}' ])

  await ensureFileContent(
    path.resolve('./units/_configuration/rb-base-server/graphql/_ViewerFields.js'),
    null,
    prettierESLint({
      text: viewerFields.join('\r\n'),
      ...prettierESLintOptions,
    }),
    true,
  )
}

async function getUnits() {
  const units = (await fs.readdir('./units/')).filter(
    (fileName) => fileName !== '.DS_Store' && fileName !== '_configuration',
  )
  return units
}

async function main() {
  const units = await getUnits()

  const taskPromises = [
    createPackageJson(units),
    createViewerFields(units),
    createSchemas(units),
    createMutations(units),
    buildUnits(units),
  ]

  await Promise.all(taskPromises)
}

main().then(() => console.log('Fin.'))
