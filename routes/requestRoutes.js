const express = require('express');
const {
    RetrieveAllRequests,
    CreateRequeRequestById,
    DeleteRequestById,
    UpdateRequestById,
    RetrieveRequestById
} = require('../controller/requestController');

const RequestRouter = express.Router();

RequestRouter.route('/')
.get(RetrieveAllTrips)
.post(CreateTrip);

RequestRouter.route('/:id')
.get(RetrieveTripById)
.delete(DeleteTripById)
.put(UpdateTripById);

module.exports = RequestRouter;