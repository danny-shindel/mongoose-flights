const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    index,
    new: newFlight,
    create,
    show,
}

function index(req, res) {
    Flight.find ({}).sort({departs: "ascending"}).exec(function(err,flights) {
        res.render('flights/index', { flights });
    });
}

function newFlight(req, res){
    const newFlight = new Flight();
    const dt = newFlight.departs;
    let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
    departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
    res.render('flights/new', {departsDate});
}

function create(req, res) {
    if (req.body.departs === '') delete req.body.departs;
    Flight.create(req.body, function (err, flight) {
        if (err) console.log(err);
        res.redirect(`/flights`);
    })
}

function show(req, res) {
    Flight.findById(req.params.id, function(err,flight){
        flight.destinations = flight.destinations.sort((a,b) => {return a.arrival - b.arrival;})
            Ticket.find({flight: flight._id}, function(err, tickets){
                res.render('flights/show', {flight, tickets})
            })
    })
}


