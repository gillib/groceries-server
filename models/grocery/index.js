const mongoose = require('mongoose');
const config = require('config');

const Schema = mongoose.Schema;

const Grocery = new Schema({
    name: String,
    username: String
});

module.exports = mongoose.model(config.get('db.schemas.grocery'), Grocery);