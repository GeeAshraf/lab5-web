const {trips} = require('../models/tripmodel');
const { db } = require('../db.js');

// Create a new trip
const createTrip = (req, res) => {
  const {
    destinationName,
    location,
    continent,
    language,
    description,
    flightCost = 0,
    accommodationCost = 0,
    mealCost = 0,
    visaCost = 0,
    transportationCost = 0,
    currencyCode = 'USD', // optional default
  } = req.body;

  // Validate required fields
  if (!destinationName || !location || !continent || !language || !description) {
    return res.status(400).json({
      message:
        'Missing required fields: destinationName, location, continent, language, description',
    });
  }

  const query = `
  INSERT INTO Trip (
    destinationName,
    location,
    continent,
    language,
    description,
    flightCost,
    accommodationCost,
    mealCost,
    visaCost,
    transportationCost,
    currencyCode
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

const values = [
    destinationName,
    location,
    continent,
    language,
    description,
    flightCost,
    accommodationCost,
    mealCost,
    visaCost,
    transportationCost,
    currencyCode,
  ];

  db.run(query, values, function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: 'Database error',
        error: err.message,
      });
    }

    return res.status(201).json({
      message: 'Trip created successfully',
      tripId: this.lastID,
    });
  });
};

module.exports = { createTrip };

const {
    trips, getTripWithDailycost
} = require('../models/Trip');
const retrieveAllTrips = (req, res) => {
    const allTrips = trips;
    res.status(200).json({
        status: 'success',
        message: 'Trips retrieved successfully',
        results: allTrips.length,
        data: allTrips,
    });
};



//create new trip
const createNewTrip = (req, res) => 
{
  const {destinationName, 
    location, 
    continent, 
    language, 
    description, 
    flightCost, 
    accommodationCost, 
    mealCost, 
    visaCost, 
    transportationCost, 
    currencyCode} = req.body;
    
const newTrip = {
    id: trips.length + 1,
    destinationName,
    location,
    continent,
    language,
    description,
    flightCost,
    accommodationCost,
    mealCost,
    visaCost,
    transportationCost,
    currencyCode,
}

trips.push(newTrip);

}
const deleteTripById = (req, res) => 
    {
    const id = Number(req.params.id);
    const Index = trips.findIndex(t => t.id === id);
    trips.slice(Index, 1);            
    res.status(204).json({
        status: 'success',
        message: 'Trip deleted successfully'
    });
} 
const updateTripById = (req, res) => 
{
    const id = Number(req.params.id);
    const trip = trips.find(t => t.id === id);
    Object.assign(trip, req.body);
}
module.exports = 
{retrieveAllTrips,createNewTrip, deleteTripById, updateTripById};

