const express = require('express');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const app = express();

app.use(
  jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://YOUR_AUTH0_DOMAIN/.well-known/jwks.json',
    }),
    audience: 'YOUR_API_IDENTIFIER',
    issuer: 'https://YOUR_AUTH0_DOMAIN/',
    algorithms: ['RS256'],
  })
);

app.get('/api/private', (req, res) => {
  res.json({ message: 'This is a private route.' });
});

app.listen(3002, () => {
  console.log('Server is running on port 3002');
});
