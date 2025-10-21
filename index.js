const express = require('express');
const tripRouter = require('./routes/tripRoutes.js');


 const app = express();
//const TripsRouter = require('./routes/TripsRouter');

app.use(express.json());
//app.use('/trips', TripsRouter);
app.use('/trips', tripRoutee);

module.exports = 
{
     app 
};
