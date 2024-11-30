const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips'); 

// GET: /trips - list all trips
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async(req, res) => {
    const q = await Model
            .find({}) // No filter, return all records
            .exec();

    // Uncomment to show results on console
    // console.log(q);

    if (!q)
    { // Database returned no data
        return res
                .status(404)
                .json(err);
    } else { // Return resulting list
        return res
                .status(200)
                .json(q);
    }
};

// GET: /trips:tripCode - list a single trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsFindByCode = async(req, res) => {
    const q = await Model
            .find({'code': req.params.tripCode}) // Return single record
            .exec();

    // Uncomment to show results on console
    // console.log(q);

    if (!q)
    { // Database returned no data
        return res
                .status(404)
                .json(err);
    } else {
        return res
                .status(200)
                .json(q);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode
}; 