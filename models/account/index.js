const passportLocalMongoose = require('passport-local-mongoose');
const mongoose = require('mongoose');
const config = require('config');

const Schema = mongoose.Schema;

const Account = new Schema({
    username: String,
    password: String
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model(config.get('db.schemas.account'), Account);