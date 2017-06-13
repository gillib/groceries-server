const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Grocery = new Schema({
    name: String,
    username: String
});

module.exports = mongoose.model('Grocery', Grocery);