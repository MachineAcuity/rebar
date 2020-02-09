// @flow

import bodyParser from 'body-parser'
import express from 'express'

import log from '../rb-base-server/log'
import { getObjectManager } from '../rb-base-server/ObjectManager'

import { getUserAndSessionIDByUserToken1_async } from './checkCredentials'

// Read environment
require('dotenv').config()

//

const serverClientError = express()

serverClientError.use(bodyParser.json())

//

async function report(req, res) {
  let step = 'initialize'

  try {
    const objectManager = await getObjectManager(req, res)

    if (!objectManager.siteInformation) {
      throw new Error('Site information not found')
    }

    await getUserAndSessionIDByUserToken1_async(objectManager, req, true)

    // Indicate to not include body, since it is meaningless for www errors
    req.body.__DO_NOT_INCLUDE__ = true

    // Generate random ticket
    const issue_id = (Math.random().toString(36).substring(2, 5) +
      '-' +
      Math.random().toString(36).substring(2, 5) +
      '-' +
      Math.random().toString(36).substring(2, 5))
      .toUpperCase()
      .replace('O', '0')
      .replace('I', '1')

    if (req.body.err.message) {
      log('error', 'WWW', {
        err: req.body.err,
        err_info: req.body.err_info,
        objectManager,
        req,
        issue_id,
      })
    }

    res.json({ success: true, issue_id })
  } catch (err) {
    log('error', 'rb-appbase-server serverClientError report: Failed', {
      step,
      err,
      body: req.body,
    })
    res.status(500).send(
      JSON.stringify({
        error: 'Could not record error from client',
      }),
    )
  }
}

serverClientError.post('/report', report)

export default serverClientError
