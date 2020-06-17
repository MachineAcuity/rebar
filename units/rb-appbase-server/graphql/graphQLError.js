// @flow
// This is a modified version of: https://github.com/kadirahq/graphql-errors/blob/master/lib/index.js

//import uuid from 'uuid';
import { GraphQLObjectType, GraphQLSchema } from 'graphql'

import log from '../../rb-base-server/log'

// Mark field/type/schema
export const Processed = Symbol()

// Used to identify UserErrors
export const IsUserError = Symbol()

// UserErrors will be sent to the user
export class UserError extends Error {
  // $FlowIgnore
  constructor(...args) {
    super(...args)
    this.name = 'Error'
    this.message = args[0]

    // $FlowIgnore
    this[IsUserError] = true

    Error.captureStackTrace(this, 'Error')
  }
}

// Modifies errors before sending to the user
export let defaultHandler = function(err: any) {
  if (err[IsUserError]) {
    return err
  }

  log('error', 'rb-appbase-server graphQLError', { err })

  return new Error('GraphQL internal error')
}

// Changes the default error handler function
export function setDefaultHandler(handlerFn: any) {
  defaultHandler = handlerFn
}

// Masks graphql schemas, types or individual fields
export function maskErrors(thing: any, fn: any = defaultHandler) {
  if (thing instanceof GraphQLSchema) {
    maskSchema(thing, fn)
  } else if (thing instanceof GraphQLObjectType) {
    maskType(thing, fn)
  } else {
    maskField(thing, fn)
  }
}

function maskField(field, fn) {
  const resolveFn = field.resolve
  if (field[Processed] || !resolveFn) {
    return
  }

  field[Processed] = true
  field.resolve = async function(...args) {
    try {
      const out = resolveFn.call(this, ...args)
      return await Promise.resolve(out)
    } catch (e) {
      throw fn(e)
    }
  }

  // save the original resolve function
  field.resolve._resolveFn = resolveFn
}

function maskType(type, fn) {
  if (type[Processed] || !type.getFields) {
    return
  }

  const fields = type.getFields()
  for (const fieldName in fields) {
    if (!Object.hasOwnProperty.call(fields, fieldName)) {
      continue
    }

    maskField(fields[fieldName], fn)
  }
}

function maskSchema(schema, fn) {
  const types = schema.getTypeMap()
  for (const typeName in types) {
    if (!Object.hasOwnProperty.call(types, typeName)) {
      continue
    }

    maskType(types[typeName], fn)
  }
}
