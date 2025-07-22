const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signUp = (req, res) => {
  // Save User to Database
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  User.create({
    full_name: req.body.full_name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    address_line_1: req.body.address_line_1,
    address_line_2: req.body.address_line_2,
    phone_number: req.body.phone_number,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    nok_name: req.body.nok_name,
    nok_phone_number: req.body.nok_phone_number,
  })
    .then(user => {
      res.send({
        message: "User registered successfully!",
        data: user.dataValues
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signIn = (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({ message: 'Email are required' });
  }
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "The email or password is in-correct!" });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "The email or password is in-correct!"
        });
      }

      const token = jwt.sign({ id: user.id },
        config.secret,
        {
          algorithm: 'HS256',
          allowInsecureKeySizes: true,
          expiresIn: 86400, // 24 hours
        });

      res.status(200).send({
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        accessToken: token,
        address_line_1: user.address_line_1,
        address_line_2: user.address_line_2,
        phone_number: user.phone_number,
        city: user.city,
        state: user.state,
        country: user.country,
        nok_name: user.nok_name,
        nok_phone_number: user.nok_phone_number,
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
