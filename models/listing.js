mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    coordinateLatitude: Number,
    coordinateLongitude: Number,
    streetName: String,
    streetNumber: Number,
    locationName: String,
    typeSummary: String,
    price: Number,
    monthlyFee: Number,
    bidding: Boolean
}); 

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;