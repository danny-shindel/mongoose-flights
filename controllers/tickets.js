const Ticket = require('../models/ticket');

module.exports = {
    new: newTicket,
    create,
    delete: deleteTicket,
}

function newTicket(req, res){
    res.render('tickets/new', {flightid: req.params.id});
}

function create(req, res){
    req.body.flight = req.params.id;
    const ticket = new Ticket(req.body);
    ticket.save(function(err){
        console.log(err)
        res.redirect(`/flights/${req.params.id}`)
    })
}

function deleteTicket(req, res){
    Ticket.findById(req.params.id, function(err, ticket){
        let a = ticket.flight
        ticket.delete()
        res.redirect(`/flights/${a}`)
    })
}