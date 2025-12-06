const express = require('express');
const {
    RetrieveAllRequests,
    CreateRequeRequestById,
    DeleteRequestById,
    UpdateRequestById,
    RetrieveRequestById
} = require('../controller/requestController');

const protect = require('../middleware/protectRoute');

const RequestRouter = express.Router();
RequestRouter.use(protect);

RequestRouter.route('/')
.get(RetrieveAllTrips)
.post(CreateTrip);

RequestRouter.route('/:id')
.get(RetrieveTripById)
.delete(DeleteTripById)
.put(UpdateTripById);

module.exports = RequestRouter;