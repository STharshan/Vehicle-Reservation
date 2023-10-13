// src/auth/auth0.js

import createAuth0Client from '@auth0/auth0-spa-js';

const Auth0 = async () => {
  const auth0 = await createAuth0Client({
    domain: 'YOUR_AUTH0_DOMAIN',
    client_id: 'YOUR_CLIENT_ID',
    redirect_uri: window.location.origin,
  });

  return auth0;
};

export default Auth0;
