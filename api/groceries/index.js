/**
 * Created by gilbartsion on 13/06/2017.
 */

const router = require('express').Router();
const jwt = require("jwt-simple");
const config = require('config');

const Grocery = require('../../models/grocery');

const AUTH_SECRET = config.get('auth.secret');

router.get('/', function (req, res, next) {
    const username = jwt.decode(req.headers.authorization, AUTH_SECRET).sub;

    Grocery.find({username}, (err, groceries) => {
        if (err) next(err);
        res.status(200).send(groceries);
    });
});

router.post('/', function (req, res, next) {
    const username = jwt.decode(req.headers.authorization, AUTH_SECRET).sub;

    Grocery.create({name: req.body.name, username}, function (err, grocery) {
        if (err) next(err);
        res.status(200).send(grocery);
    });
});

router.delete('/:groceryId', function (req, res, next) {
    Grocery.findById(req.params.groceryId, function (err, grocery) {
        if (err) next(err);

        const username = jwt.decode(req.headers.authorization, AUTH_SECRET).sub;
        if (grocery.username === username) {
            grocery.remove(function () {
                res.status(200).send();
            });
        }
        else {
            next(new Error('not allowed to remove this'));
        }
    });
});


module.exports = router;