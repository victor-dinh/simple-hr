const db = require("../models");
const User = db.user;

exports.userProfile = (req, res) => {
  const id = parseInt(req.params.id)

  User.findOne({
    where: {
      id: id
    },
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      res.status(200).send(user.dataValues);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateProfile = (req, res) => {
  const id = parseInt(req.params.id)

  User.findOne({
    where: {
      id: id
    },
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      User.update(
        // req.body
        {
          address_line_1: req.body.address_line_1,
          address_line_2: req.body.address_line_2,
          phone_number: req.body.phone_number,
          city: req.body.city,
          state: req.body.state,
          country: req.body.country,
          nok_name: req.body.nok_name,
          nok_phone_number: req.body.nok_phone_number
        }
        ,
        { where: { id: id } },
      ).then(num => {
        if (num == 1) {
          res.send({
            message: "Update successfully."
          });
        } else {
          res.send({
            message: `Update failed with id=${id}.!`
          });
        }

      })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });

    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });


};
