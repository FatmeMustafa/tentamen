// Mongoose and mocking requests
const sinon = require('sinon');

const mongoose = require('mongoose')
require('sinon-mongoose')

// initialize the app and models
const app = require('../index.js')

// sending requests
const agent = require('supertest').agent(app);
// validating results
const expect = require('chai').expect;

// get the model
const Listing = mongoose.model('Listing')

var Mock = sinon.mock(Listing)

beforeEach(() => {
	Mock.restore(); // Unwraps the spy
	Mock = sinon.mock(Listing)
});

afterEach( () => {
	Mock.verify();
});

describe('Integration tests', ()  => {
// Our test data
const request = {
	"coordinateLatitude": 30,
	"coordinateLongitude": 20,
	"streetName": "RandomStreetName",
	"streetNumber": 4,
	"locationName": "RandomLocationName",
	"typeSummary": "RandomTypeSummarye",
	"price": 599,
	"monthlyFee": 23,
	"bidding": true
}

const expected = {
	"_id": "5d00bfa57385713028096a77",
	"coordinateLatitude": 30,
	"coordinateLongitude": 20,
	"streetName": "RandomStreetName",
	"streetNumber": 4,
	"locationName": "RandomLocationName",
	"typeSummary": "RandomTypeSummarye",
	"price": 599,
	"monthlyFee": 23,
	"bidding": true,
	"__v":0
}

describe('listings.getListing', ()  => {

	it('Should return an array of all listings', (done) => {

		// Given (preconditions)
		Mock
		.expects('find')
		.chain('exec')
		.resolves([expected]);

		// When (someting happens)
		agent
		.get('/listings')
		.end((err,res) => {
		// Then (something should happen)
			expect(res.status).to.equal(200);
			expect(res.body).to.eql([expected]);
			done();
		});
	});

	it('Should get a listing by name', (done) => {

		// Given (preconditions)
		Mock
		.expects('findOne')
		.withArgs({"locationName": "RandomLocationName"})
		.chain('exec')
		.resolves(expected);

		// When (someting happens)
		agent
		.get('/listings?locationName=RandomLocationName')
		.end((err,res) => {
		// Then (something should happen)
			expect(res.status).to.equal(200);
			expect(res.body).to.eql(expected);
			done();
		});
	});
});

describe('listings.addListing', ()  => {
	it('Should be able to create a listing', (done) => {
		// Given (preconditions)
		Mock
		.expects('create')
		.withArgs({
			"coordinateLatitude": 30,
			"coordinateLongitude": 20,
			"streetName": "RandomStreetName",
			"streetNumber": 4,
			"locationName": "RandomLocationName",
			"typeSummary": "RandomTypeSummarye",
			"price": 599,
			"monthlyFee": 23,
			"bidding": true
		})
		.chain('exec')
		.resolves(expected);

		// When (someting happens)
		agent
		.post('/listings/')
		.send(expected)
		.end((err,res) => {
		// Then (something should happen)
			expect(res.status).to.equal(201);
			expect(res.body).to.eql(expected);
			done();
		});
	});
})

describe('listings.deleteListing', ()  => {
    it('Should be able to delete a listing', (done) => {
      // Given (preconditions)
      Mock
      .expects('findByIdAndRemove')
      .withArgs("5d00bfa57385713028096a77")
      .chain('exec')
      .resolves(expected);

      // When (someting happens)
      agent
      .delete('/listings/5d00bfa57385713028096a77')
      .send(expected)
      .end((err,res) => {
      // Then (something should happen)
        expect(res.status).to.equal(200);
        done();
      });
    });
  })











  describe('listings.updateListing', ()  => { 
	it('Should be able to create a listing', (done) => {
		// Given (preconditions)
		Mock
		.expects('updateOne')
		.withArgs({ _id: "5d00bfa57385713028096a77" }, request)
		.chain('exec')
		.resolves({ n: 1,
			nModified: 0,
			upserted: [ { index: 0, _id: "5d00bfa57385713028096a77" } ],
			ok: 1 });

		// When (someting happens)
		agent
		.put('/listings/5d00bfa57385713028096a77')
		.send(request)
		.end((err,res) => {
		// Then (something should happen)
			expect(res.status).to.equal(201);
			done();
		});
	});

	it('Should be able to update a listing', (done) => {
		// Given (preconditions)
		Mock
		.expects('updateOne')
		.withArgs({ _id: "5d00bfa57385713028096a77" }, request)
		.chain('exec')
		.resolves({ n: 1,
			nModified: 1,
			ok: 1 });

		// When (someting happens)
		agent
		.put('/listings/5d00bfa57385713028096a77')
		.send(request)
		.end((err,res) => {
		// Then (something should happen)
			expect(res.status).to.equal(200);
			done();
		});
	});
	

	it('Should return 204 when not updating a listing', (done) => {
		// Given (preconditions)
		Mock
		.expects('updateOne')
		.withArgs({ _id: "5d00bfa57385713028096a77" }, request)
		.chain('exec')
		.resolves({ n: 1,
			nModified: 0,
			ok: 1 });

		// When (someting happens)
		agent
		.put('/listings/5d00bfa57385713028096a77')
		.send(request)
		.end((err,res) => {
		// Then (something should happen)
			expect(res.status).to.equal(204);
			done();
		});
	});
});
});