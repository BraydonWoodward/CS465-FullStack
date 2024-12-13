const express = require('express'); // Express app
const router = express.Router(); // Router Logic
const jwt = require('express-jwt');
const auth = jwt.expressjwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['HS256', 'RS256'] // Add this line to specify the allowed algorithms
});

const authController = require('../controllers/authentication');


// This is where we import the controllers 
const tripsController = require('../controllers/trips');

// define register endpoint
router
    .route('/register')
    .post(authController.register);

// define route for authentication endpoint
router
    .route('/login')
    .post(authController.login);

// define route for trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList) // GET method routes tripList
    .post(auth, tripsController.tripsAddTrip); // POST method adds a  trip

// GET Method routes tripsFindByCode - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip); // PUT method updates a trip





module.exports= router;


