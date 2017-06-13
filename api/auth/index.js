const router = require('express').Router();

const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const jwt = require("jwt-simple");
const moment = require("moment");

const Account = require('../../models/account');

router.use(passport.initialize());
router.use(passport.session());

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

router.post('/register', function (req, res, next) {
    const user = {username: req.body.username, password: req.body.password};

    Account.register(new Account({username: user.username}), user.password, (err, account) => {
        if (err) {
            err.account = user;
            next(err);
        }

        passport.authenticate('local')(req, res, () => {
            const payload = {
                sub: user.username,
                exp: moment().add(10, 'days').unix()
            };

            const token = jwt.encode(payload, "shhh..");

            res.status(200).send({
                user: user.username,
                token: token
            });
        });
    });
});

router.post('/login', passport.authenticate('local'), function (req, res, next) {
    const user = {username: req.body.username, password: req.body.password};

    const payload = {
        sub: user.username,
        exp: moment().add(10, 'days').unix()
    };

    const token = jwt.encode(payload, "shhh..");

    res.status(200).send({
        user: user.username,
        token: token
    });
});

module.exports = router;