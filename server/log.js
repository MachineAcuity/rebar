/* @flow weak */

import winston from 'winston';
import winstonCassandra from './winstonCassandra'

// Read environment
require( 'dotenv' ).load( );

import options from '../graphql/CassandraOptions.js';

// Transports for Winston
const transports = [ ];

// Use Cassandra for logging if Cassandra is configured
if( process.env.OBJECT_PERSISTENCE == 'cassandra' )
  transports.push( new winstonCassandra( options ) );
else
  transports.push( new (winston.transports.Console)( ) );


var log = new (winston.Logger)( { transports: transports } );

export default log;
