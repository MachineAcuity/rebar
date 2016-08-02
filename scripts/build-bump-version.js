import fs from 'fs'

// Read environment
require( 'dotenv' ).load( )


import {version} from '../configuration/package.js'

console.log( 'Current version in package.json: ' + process.env.npm_package_version )
console.log( 'Current version in package.js:   ' + version )

let versionBuildNumber = version.split( '.' )[ 3 ]
if( versionBuildNumber == null )
  versionBuildNumber = 1

// Increment build
versionBuildNumber++
const newVersion = process.env.npm_package_version + '.' + versionBuildNumber

const fileName = './configuration/package.js'
const searchString = 'export const version = '
const newContentOfLine = 'export const version = \'' + newVersion + '\''

let fileLines = fs.readFileSync( fileName, 'utf8' ).split( '\n' )
let index = 0

while( index < fileLines.length )
{
  if( fileLines[ index ].indexOf( searchString ) > -1 )
  {
    if( fileLines[ index ] == newContentOfLine )
      console.log( '[' + fileName + '] is already up to date' )
    else
    {
      fileLines[ index ] = newContentOfLine
      fs.writeFileSync( fileName, fileLines.join( '\n' ) )

      console.log( 'New version in package.js:       ' + newVersion )
    }
    break
  }
  else
    index++
}
