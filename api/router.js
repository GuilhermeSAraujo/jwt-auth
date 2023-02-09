const express = require('express');
const app = module.exports = express();
const jwt = require('jsonwebtoken');

app.post('/login', (req, res, next) => {
    if(req.body.user === 'abc' && req.body.password === '123'){
      const id = 1;
      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 300 // expires in 5min
      });
      return res.json({ auth: true, token: token });
    }
    res.status(500).json({message: 'Login inválido!'});
  });
  
app.post('/logout', function(req, res) {
    res.json({ auth: false, token: null });
  });
  
  
  
app.get('/dados', verifyJWT, function(req, res) {
    res.json([{id:1, nome:"teste1"}, {id:2, nome:"teste2"}]);
});

function verifyJWT(req, res, next){
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    req.userId = decoded.id;
    next();
  });
}
