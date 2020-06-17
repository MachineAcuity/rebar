// @flow

import fsWithCallbacks from 'fs'
import path from 'path'

import { graphql, buildSchema } from 'graphql'
import { getIntrospectionQuery, printSchema } from 'graphql/utilities'
import prettierESLint from 'prettier-eslint'

import ensureFileContent from '../../../rb-base-server/ensureFileContent'
// $FlowIgnore Not sure why it gives an error. The file does exist
import eslintRC from '../../../../.eslintrc.json'
import fsExists from '../../../rb-base-server/fsExists'
import packageJSON from '../../../../package.json'
import schema from '../../../rb-appbase-server/graphql/schema'

const fs = fsWithCallbacks.promises

const prettierESLintOptions = { eslintConfig: eslintRC, prettierOptions: packageJSON.prettier }

// It is a complete mystery to me why the comments are encased in """ but the relay
// compiler does not like them. Either way, this sanitizes the schema and removes the comment.
const reRemoveComments = new RegExp('"""[^"]*"""', 'g')

async function createGraphQLSchema(units: Array<string>) {
  const result = await graphql(schema, getIntrospectionQuery())
  if (result.errors)
    throw new Error('Failed introspecting schema: ' + JSON.stringify(result.errors, null, 2))

  const printedSchema = printSchema(schema).replace(reRemoveComments, '#')

  const taskPromises = [
    ensureFileContent(
      path.resolve('./units/_configuration/rb-base-server/graphql/schema.json'),
      null,
      JSON.stringify(result, null, 2),
      true,
    ),
    ensureFileContent(path.resolve('schema.graphql'), null, printedSchema, true),
  ]

  await Promise.all(taskPromises)
}

async function createRouteFile(fileName: string, imports: Array<string>, exports: Array<string>) {
  let routesAppFrame = [ '// @flow', '' ]
  routesAppFrame = routesAppFrame.concat(imports)
  routesAppFrame = routesAppFrame.concat([ '', 'export default [' ])
  routesAppFrame = routesAppFrame.concat(exports)
  routesAppFrame = routesAppFrame.concat([ ']' ])

  await ensureFileContent(
    fileName,
    null,
    prettierESLint({ text: routesAppFrame.join('\r\n'), ...prettierESLintOptions }),
    true,
  )
}

async function createRoutes(units: Array<string>) {
  const routesAppFrameImports = []
  const routesRootImports = []
  const routesAppFrameExports = []
  const routesRootExports = []

  for (let unitName of units)
    if (unitName.endsWith('-webapp')) {
      const routesDir = path.resolve('./units', unitName)
      if (await fsExists(routesDir)) {
        const routeFileNames = await fs.readdir(routesDir)

        for (let routeFileName of routeFileNames) {
          if (routeFileName.endsWith('.jsx'))
            if (routeFileName.startsWith('routeAppFrame')) {
              const route = routeFileName.substring(0, routeFileName.length - 4)
              routesAppFrameImports.push(
                'import ' + route + " from '../../" + unitName + '/' + route + "'",
              )
              routesAppFrameExports.push('  ' + route + ',')
            } else if (routeFileName.startsWith('routeRoot')) {
              const route = routeFileName.substring(0, routeFileName.length - 4)
              routesRootImports.push(
                'import ' + route + " from '../../" + unitName + '/' + route + "'",
              )
              routesRootExports.push('  ' + route + ',')
            }
        }
      }
    }

  await Promise.all([
    createRouteFile(
      path.resolve('./units/_configuration/rb-appbase-webapp/routesAppFrame.js'),
      routesAppFrameImports,
      routesAppFrameExports,
    ),
    createRouteFile(
      path.resolve('./units/_configuration/rb-appbase-webapp/routesRoot.js'),
      routesRootImports,
      routesRootExports,
    ),
  ])
}

export default (async function buildUnits(units: Array<string>) {
  const taskPromises = [ createGraphQLSchema(units), createRoutes(units) ]

  await Promise.all(taskPromises)
})
