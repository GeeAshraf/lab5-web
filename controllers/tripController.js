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
    // const allTrips = trips;
    // res.status(200).json({
    //     status: 'success',
    //     message: 'Trips retrieved successfully',
    //     results: allTrips.length,
    //     data: allTrips,
    // });
    const query = 'select * from Trips';
    db.all (query, (err, rows) =>
    {
      if (err) {
         console.log(err);
         return res.status(500).json({message: " Error retreiving trips"});
          } 
          return res.status(200).json({
            message: "Trips retreived successfully",
            data: rows
          }); 
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

const deleteTripById = (req, res) => {
    const id =req.params.id;
    const query = `DELETE FROM TRIP WHERE ID = ${ID}`;


    db.run(query, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({message: 'Error deleting trip'});
      }
      if (this.changes == 0)
        return res.status(400).json({ message: 'Trip not found'});
      return res.status(200).json({message: 'Trip  deleted successfully' });
});
};
const retriveTripById = (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM TRIP WHERE ID = ${id}`;
  
  db.get(query, (err, row) => {
    if (err) {
    console.log(err);
    return res.status(500).json ({ message: `Error fetching trip`});
  }
  if (!row) return res.status(404).json({message:'Trip not found'});
  return res.status(200).json({message: `Trip retrieved successfully` ,data:row});  
});
};

const updateTripById = (req, res) => 
{
    const id = req.params.id;
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

const query = `
  UPDATE TRIP SET 
    DESTINATIONNAME = '${destinationName}',
    LOCATION = '${location}',
    CONTINENT = '${continent}',
    LANGUAGE = '${language}',
    DESCRIPTION = '${description}',
    FLIGHTCOST = '${flightCost}',
    ACCOMMODATIONCOST = '${accommodationCost}',
    MEALCOST = '${mealCost}',
    VISACOST = '${visaCost}',
    TRANSPORTATIONCOST = '${transportationCost}',
    CURRENCYCODE= '${currencyCode}',
  WHERE ID = ${id}
`;
 db.run(query, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({message: 'Error deleting trip'});
      }
      if (this.changes == 0)
        return res.status(400).json({ message: 'Trip not found'});
      return res.status(200).json({message: 'Trip  deleted successfully' });
});
};
module.exports = 
{retrieveAllTrips,createNewTrip, deleteTripById, updateTripById};

