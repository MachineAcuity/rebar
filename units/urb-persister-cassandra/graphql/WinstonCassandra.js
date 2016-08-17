var util = require('util');
var events = require('events');

var winston = require('winston');
var cql = require('cassandra-driver');

var defaultOptions = {
  //column family to store the logs
  table: 'logs',
  //determines if the partition key is changed per day or hour
  partitionBy: 'day',
  consistency: cql.types.consistencies.quorum,
  level: 'info',
  name: 'cassandra'
};

function Cassandra (options) {
  if (!options) {
    throw new Error('Transport options is required');
  }
  if (!options.keyspace) {
    throw new Error('You must specify the options.keyspace');
  }
  this.options = Cassandra.extend({}, defaultOptions, options);
  //winston options
  this.name = this.options.name;
  this.level = this.options.level;
  //create a queue object that will emit the event 'prepared'
  this.schemaStatus = new events.EventEmitter();
  this.schemaStatus.setMaxListeners(0);
  this.client = new cql.Client(this.options);
}

util.inherits(Cassandra, winston.Transport);

Cassandra.prototype.log = function (level, msg, meta, callback) {
  var self = this;
  return self._insertLog(level, msg, meta, function (err) {
    callback(err, !err);
  });
};

/**
 * Gets the log partition key
 */
Cassandra.prototype.getKey = function () {
  if (this.options.partitionBy === 'day') {
    return new Date().toISOString().slice(0, 10);
  }
  else if (this.options.partitionBy === 'hour') {
    return new Date().toISOString().slice(0, 13);
  }
  return null;
};

/**
 * Inserts the log in the db
 */
Cassandra.prototype._insertLog = function (level, msg, meta, callback) {
  var key = this.getKey();
  if (!key) {
    return callback(new Error('Partition ' + this.options.partitionBy + ' not supported'), false);
  }
  //execute as a prepared query as it would be executed multiple times
  return this.client.execute(
    'INSERT INTO ' + this.options.table + ' (key, date, level, message, meta) VALUES (?, ?, ?, ?, ?)',
    [key, new Date(), level, msg, util.inspect(meta)],
    {prepare: true, consistency: this.options.consistency},
    callback);
};


/**
 * Merge the contents of two or more objects together into the first object.
 * Similar to jQuery.extend
 */
Cassandra.extend = function (target) {
  var sources = [].slice.call(arguments, 1);
  sources.forEach(function (source) {
    for (var prop in source) {
      if (source.hasOwnProperty(prop)) {
        target[prop] = source[prop];
      }
    }
  });
  return target;
};

//Define as a property of winston transports for backward compatibility
winston.transports.Cassandra = Cassandra;
module.exports = Cassandra;
//The rest of winston transports uses (module).name convention
//Create a field to allow consumers to interact in the same way
module.exports.Cassandra = Cassandra;
module.exports.types = cql.types;
