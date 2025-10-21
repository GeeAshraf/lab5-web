const retrieveAllTrips = (req, res) => {
    const allTrips = trips;
    res.status(200).json({
        status: 'success',
        message: 'Trips retrieved successfully',
        results: allTrips.length,
        data: allTrips,
    });
};

