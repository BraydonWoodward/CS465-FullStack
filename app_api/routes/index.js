const express = require('express'); // Express app
const router = express.Router(); // Router Logic

// This is where we import the controllers 
const tripsController = require('../controllers/trips');

// define route for trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList) // GET method routes tripList
    .post(tripsController.tripsAddTrip); // POST method adds a  trip

// GET Method routes tripsFindByCode - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(tripsController.tripsUpdateTrip); // PUT method updates a trip


module.exports= router;


