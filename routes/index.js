const express = require('express')
const router = express.Router()

const listing = require('./listing.js')

router.post("/listings", listing.addListing)
router.get("/listings", listing.getListing)
router.put("/listings/:id", listing.updateListing)
router.delete("/listings/:id", listing.deleteListing)

module.exports = router