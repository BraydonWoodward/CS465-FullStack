const express = require('express'); // Express app
const router = express.Router(); // Router Logic
const { expressjwt } = require('express-jwt');

const auth = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    requestProperty: 'payload' // replaces 'userProperty'
});


// Add console log to debug payload
router.use((req, res, next) => {
    console.log('Incoming Request:', req.method, req.url);
    console.log('Decoded Payload:', req.payload);
    next();
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
    .post(auth, tripsController.tripsAddTrip); // POST method adds a trip

// GET Method routes tripsFindByCode - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip); // PUT method updates a trip

module.exports= router;
