/* @flow weak */


var stores = { };
function getStore( entityName: string )
{
  if( entityName in stores )
    return stores[ entityName ];
  else
    return ( stores[ entityName ] = [ ] );
}

function findIndexes( entityName: string, fieldName: string, value: any )
{
  const store = getStore( entityName );
  const arr_Indexes = [ ];

  store.map( ( objectInStore, index ) => {
    if( objectInStore[ fieldName ] == value )
      arr_Indexes.push( index );
  } );

  return arr_Indexes;
}

function findObjects( entityName: string, fieldName: string, value: any )
{
  const store = getStore( entityName );
  const arr_Objects = [ ];

  store.map( ( objectInStore ) => {
    if( objectInStore[ fieldName ] == value )
      arr_Objects.push( objectInStore );
  } );

  return arr_Objects;
}

function ObjectPersister_get( entityName: string, ObjectType: any, fieldName: string, values : Array<any> )
{
  const arr_Objects = values.map( value => findObjects( entityName, fieldName, value )[ 0 ] );
  return Promise.resolve( arr_Objects );
}

function ObjectPersister_getList( entityName: string, ObjectType: any, fieldName: string, values : Array<any> )
{
  const arr_arr_Objects = values.map( value => findObjects( entityName, fieldName, value ) );
  return Promise.resolve( arr_arr_Objects );
}

function ObjectPersister_add( entityName: string, fields: any, ObjectType: any )
{
  const store = getStore( entityName );
  const newObject = new ObjectType( fields );

  store.push( newObject );

  return Promise.resolve( );
}

function ObjectPersister_update( entityName: string, fields: any )
{
  const an_Object = findObjects( entityName, 'id', fields.id )[ 0 ];

  for( let fieldName in fields )
    an_Object[ fieldName ] = fields[ fieldName ];

  return Promise.resolve( );
}

function ObjectPersister_remove( entityName: string, fields: any )
{
  const store = getStore( entityName );

  const indexToDelete = findIndexes( entityName, 'id', fields.id );
  store.splice( indexToDelete, 1 );

  return Promise.resolve( );
}

export default {
  ObjectPersister_get,
  ObjectPersister_getList,
  ObjectPersister_add,
  ObjectPersister_update,
  ObjectPersister_remove,
};
