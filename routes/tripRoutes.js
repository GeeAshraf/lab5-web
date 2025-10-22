const express = require('express');
const {
    retrieveAllTrips
    , createNewTrip
} = require('../controllers/tripController');  

const tripRouter = express.Router();

tripRouter
    .route('/')
    .get(retrieveAllTrips)
    .post(createNewTrip);

tripRouter
    .route('/:id')
    .get(retrieveAllTrips)
    .put(updateTripById)
    .delete(deleteTripById);
    
module.exports = tripRouter;