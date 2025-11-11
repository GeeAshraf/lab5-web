const express = require('express');
const {
  createTrip,
  retrieveAllTrips,
} = require('../controllers/tripController.js');

const { verifyToken, verifyAdmin } = require('../controllers/authcontroller.js'); // import it

const tripRouter = express.Router();

// All trips
tripRouter
  .route('/')
  .post(verifyAdmin, createTrip)        // Add new trip
  .get(verifyToken, retrieveAllTrips);  // Get all trips for authenticated users


module.exports = tripRouter;