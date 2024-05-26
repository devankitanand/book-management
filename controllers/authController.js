const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Seller = require('../models/seller');
const User = require('../models/User');

const signup = (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  if (role === 'seller') {
    Seller.create({ name, email, password: hashedPassword }, (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).send({ message: 'Seller registered successfully' });
    });
  } else {
    User.create({ name, email, password: hashedPassword }, (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).send({ message: 'User registered successfully' });
    });
  }
};

const login = (req, res) => {
  const { email, password, role } = req.body;

  const Model = role === 'seller' ? Seller : User;

  Model.findByEmail(email, (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send({ message: 'User not found' });

    const user = results[0];

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) return res.status(401).send({ token: null, message: 'Invalid password' });

    const token = jwt.sign({ id: user.id, role }, process.env.SECRET, { expiresIn: 86400 });

    res.status(200).send({ token });
  });
};

module.exports = { signup, login };
