const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips'); 
const User = mongoose.model('users'); 

// GET: /trips - list all trips
const tripsList = async(req, res) => {
    const q = await Model
            .find({}) // No filter, return all records
            .exec();

    if (!q) { // Database returned no data
        return res.status(404).json(err);
    } else { // Return resulting list
        return res.status(200).json(q);
    }
};

// GET: /trips:tripCode - list a single trip
const tripsFindByCode = async(req, res) => {
    const q = await Model
            .find({'code': req.params.tripCode}) // Return single record
            .exec();

    if (!q) { // Database returned no data
        return res.status(404).json(err);
    } else {
        return res.status(200).json(q);
    }
};

// POST: /trips - create a new trip
const tripsAddTrip = async (req, res) => {
    try {
        const trip = await Trip.create({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });
        return res.status(201).json(trip);
    } catch (err) {
        return res.status(400).json(err);
    }
} 

// PUT: /trips/:tripCode - Updates a Trip
const tripsUpdateTrip = async (req, res) => {
    try {
        const trip = await Trip.findOneAndUpdate(
            { 'code': req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            { new: true }
        );

        if (!trip) {
            return res.status(404).send({ message: "Trip not found with code " + req.params.tripCode });
        }
        return res.send(trip);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({ message: "Trip not found with code " + req.params.tripCode });
        }
        return res.status(500).json(err);
    }
};


// Method for validating user email and returning their name
const getUser = (req, res) => {
    console.log('Payload:', req.payload); // Log the payload for debugging
    if (req.payload && req.payload.email) {
        User.findOne({ email: req.payload.email })
            .exec((err, user) => {
                if (!user) {
                    return res.status(404).json({ "message": "User not found. get user1" });
                } else if (err) {
                    console.log(err);
                    return res.status(404).json(err);
                }
            });
    } else {
        return res.status(404).json({ "message": "User not found. get user2" });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    getUser
};
