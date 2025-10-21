const express = require('express');
const {
    retrieveAllTrips
} = require('../controllers/tripController');  

const tripRouter = express.Router();

tripRouter
    .route('/')
    .get(retrieveAllTrips);
    
module.exports = tripRouter;