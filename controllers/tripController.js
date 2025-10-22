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

