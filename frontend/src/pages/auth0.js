// src/components/Auth.js

import React, { useState, useEffect } from 'react';
import Auth0 from '../auth';

function Auth() {
  const [auth0, setAuth0] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    Auth0().then((auth0) => {
      setAuth0(auth0);
      if (window.location.search.includes('code=')) {
        auth0.handleRedirectCallback();
      }
    });
  }, []);

  const login = async () => {
    const { loginWithRedirect } = await auth0();
    loginWithRedirect();
  };

  const logout = async () => {
    const { logout } = await auth0();
    logout();
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Hello, {user.name}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
}

export default Auth;
