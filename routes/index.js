'use strict'

const express = require('express')
const api = express.Router()
const feedCtrl = require('../controllers/feed')

api.get('/feed', feedCtrl.feed)

api.get('/ping', function(req, res) {
    res.status(200).json('pong');
});

module.exports = api