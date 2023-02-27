const express = require('express');
const app = module.exports = express();
const jwt = require('jsonwebtoken');
const CredentialsService = require('../service/cretendialsService.js');

const verifyJWT = (req, res, next) => {
  const token = req.headers['token'];

  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    req.userId = decoded.id;
    next();
  });
}

app.post('/register', (req, res, next) => {
  const { user, password } = req.body;
  const success = CredentialsService.registerUser(user, password);
  res.send(success);
});

app.post('/login', (req, res, next) => {
  const { user, password } = req.body;
  const authUser = CredentialsService.verify(user, password);

  if (authUser) {
    const userId = authUser.id;

    const token = jwt.sign({ userId }, process.env.SECRET, {
      expiresIn: 300 // expires in 5min
    });

    return res.json({ auth: true, token: token });
  }

  res.status(500).json({ message: 'Login inválido!' });
});

app.post('/logout', (req, res) => {
  res.json({ auth: false, token: null });
});

app.get('/dados', verifyJWT, (req, res) => {
  res.json([{ dados: true }]);
});

