const express = require("express");

const knex = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

const path = "/api/accounts";

server.get(`${path}`, (req, res) => {
    knex.select('*').from('accounts')
    .then(accounts => {
        res.status(200).json(accounts)
    })
})//working

server.get(`${path}/:id`, (req, res) => {
    knex.select('*').from('accounts').where({id: req.params.id})
    .first()
    .then(account => {
        res.status(200).json(account)
    })
})

server.post(`${path}`, (req, res) => {
    knex('accounts').insert({name: req.body.name, budget: req.body.budget})
    .then(newAccount => {
        res.status(200).json(newAccount);
    })
})

module.exports = server;
