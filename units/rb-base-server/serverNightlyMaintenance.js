// @flow

// curl http://localhost:28603/serverNightlyMaintenance/start?secret=7IG5NRoy7JIQM96MtE8115VRNQgX8qpfs0uRh5IaMPSCjqj8XC2MKW2kS0fbNZxI02rkaDtqYCarczVcGH20WtKzUVm2Z9jromJw9QhmUSi4PGx92LikqN

import express from 'express'

import serverNightlyMaintenanceExtenders_async from '../_configuration/rb-base-server/serverNightlyMaintenanceExtenders'
import log from '../rb-base-server/log'
import ObjectManager, { getObjectManager } from '../rb-base-server/ObjectManager'

// Read environment
require('dotenv').config()

//

const serverNightlyMaintenance = serverNightlyMaintenanceExtenders_async ? express() : null

//

async function nightlyMaintenance_async(req, objectManager: ObjectManager) {
  const executionStatus = { step: 'initialize' }

  try {
    if (!serverNightlyMaintenanceExtenders_async) throw new Error()

    log('info', 'rb-base-server serverNightlyMaintenance: start', { req })

    await serverNightlyMaintenanceExtenders_async(objectManager, executionStatus)

    log('info', 'rb-base-server serverNightlyMaintenance: finished successfully', { req })
  } catch (err) {
    log('error', 'rb-base-server serverNightlyMaintenance execution: Failed', {
      err,
      executionStatus,
      req,
    })
  }
}

//

async function nightlyMaintenance(req, res) {
  try {
    //  Check password
    if (req.query.secret !== process.env.REBAR_INTERNAL_CALL_SECRET) {
      throw new Error('Please provide secret')
    }

    const objectManager = await getObjectManager(req, res)

    if (!objectManager.siteInformation) {
      throw new Error('Site information not found')
    }

    // Notice that we will not wait for this to finish
    nightlyMaintenance_async(req, objectManager)

    res.json({ success: true })
  } catch (err) {
    log('error', 'rb-base-server serverNightlyMaintenance launch: Failed', {
      err,
      req,
    })
    res.status(500).json({
      error: 'Could not execute serverNightlyMaintenance',
      success: false,
    })
  }
}

if (serverNightlyMaintenance) {
  serverNightlyMaintenance.get('/start', nightlyMaintenance)
}

export default serverNightlyMaintenance
