dotify = require('node-dotify');

//post method
addListing = (req, res, next) => {
    req.models.Listing.create({
        coordinateLatitude: req.body.coordinateLatitude,
        coordinateLongitude: req.body.coordinateLongitude,
        streetName: req.body.streetName,
        streetNumber: req.body.streetNumber,
        locationName: req.body.locationName,
        typeSummary: req.body.typeSummary,
        price: req.body.price,
        monthlyFee: req.body.monthlyFee,
        bidding: req.body.bidding
    }).then((listing) => {
        return res.status(201).send(listing)
    }).catch((error) => {
        next(error)
    })
} 

//get all/locationName method
getListing = (req, res, next) => {
    var query;
    if(req.query.locationName) {
        query = req.models.Listing.findOne({locationName: req.query.locationName})
    }
    else {
        query = req.models.Listing.find()
    }
    query.exec().then((listing) => {
        return res.send(listing);
    }).catch((error) => next(error))
}

//put method
updateListing = (req, res, next) => {
    req.models.Listing.updateOne({_id: req.params.id}, {
        coordinateLatitude: req.body.coordinateLatitude,
        coordinateLongitude: req.body.coordinateLongitude,
        streetName: req.body.streetName,
        streetNumber: req.body.streetNumber,
        locationName: req.body.locationName,
        typeSummary: req.body.typeSummary,
        price: req.body.price,
        monthlyFee: req.body.monthlyFee,
        bidding: req.body.bidding
    },
    {
        new: true,
        upsert: true,
        runvalidators: true,
    }).then((status) => {
        console.log("status: ", status)
        if (status.upserted)
            res.status(201)
        else if (status.nModified)
            res.status(200)
        else 
            res.status(204)
    res.send()
    }).catch((error) => next(error))
}

//delete method
deleteListing = (req, res, next) => {
    req.models.Listing.findByIdAndRemove(req.params.id).then((listing) => {
        return res.status(200).send(`${listing.streetName} has been deleted!`)
    }).catch((error) => {
        next(error)
    })
}

module.exports = {
    addListing,
    getListing,
    updateListing,
    deleteListing
}