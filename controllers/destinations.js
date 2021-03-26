const Flight = require('../models/flight');

module.exports = {
    create,
}

function create(req,res) {
    if (req.body.arrival === '') delete req.body.arrival
    Flight.findById(req.params.id, function(err, flight){
        flight.destinations.push(req.body);
        flight.save(function(err){
            res.redirect(`/flights/${req.params.id}`)
        });
    })
}





