/* @flow weak */

import { runQuery, runQueryOneResult, runQueryNoResult } from './CassandraClient.js';

function ObjectPersister_get( entityName: string, ObjectType: any, fieldName: string, values: Array<any> )
{
  let cqlText = 'SELECT * FROM "' + entityName + '" WHERE "' + fieldName + '" = ?;';
  let resultPromises = [ ];

  for( let value of values )
    resultPromises.push( runQueryOneResult( ObjectType, cqlText, [ value ] ) );

  return Promise.all( resultPromises );
}

function ObjectPersister_getList( entityName: string, ObjectType: any, fieldName: string, values: Array<any> )
{
  let cqlText = 'SELECT * FROM "' + entityName + '" WHERE "' + fieldName + '" = ?;';
  let resultPromises = [ ];

  for( let value of values )
    resultPromises.push( runQuery( ObjectType, cqlText, [ value ] ) );

  return Promise.all( resultPromises );
}

/*eslint no-unused-vars: ["error", { "args": "none" }]*/
function ObjectPersister_add( entityName: string, fields: any, ObjectType: any )
{
  let cqlTextFieldNames = '';
  let cqlTextFieldValues = '';
  let cqlParams = [ ];

  for( let fieldName in fields )
  {
    cqlTextFieldNames += (cqlParams.length > 0 ? ', ' : '') + '"' + fieldName + '"';
    cqlTextFieldValues += (cqlParams.length > 0 ? ', ' : '') + '?';
    cqlParams.push( fields[ fieldName ] );
  }

  let cqlText = 'INSERT INTO "' + entityName + '" (' + cqlTextFieldNames + ') VALUES (' + cqlTextFieldValues + ');';

  return runQueryNoResult( cqlText, cqlParams );
}

function ObjectPersister_update( entityName: string, fields: any )
{
  let cqlText = 'UPDATE "' + entityName + '" SET ';
  let cqlParams = [ ];

  let followingItem = false;

  for( let fieldName in fields )
    if( fieldName != 'id' ) // Do not update id
    {
      if( followingItem )
        cqlText += ', ';
      else
        followingItem = true;

      cqlText += '"' + fieldName + '" = ?';
      cqlParams.push( fields[ fieldName ] );
    }

  cqlText += ' WHERE id = ?;';
  cqlParams.push( fields.id );

  return runQueryNoResult( cqlText, cqlParams );
}

function ObjectPersister_remove( entityName: string, fields: any )
{
  const cqlText = 'DELETE FROM "' + entityName + '" WHERE id = ?;';
  const cqlParams = [ fields.id ];

  return runQueryNoResult( cqlText, cqlParams );
}

export default {
  ObjectPersister_get,
  ObjectPersister_getList,
  ObjectPersister_add,
  ObjectPersister_update,
  ObjectPersister_remove,
};
