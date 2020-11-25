import React, { useState, useEffect } from 'react';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import superagent from 'superagent';
import cookie from 'react-cookies';
dotenv.config();
const API = process.env.API_SERVER || 'https://auth-server-401.herokuapp.com';
const SECRET = process.env.JWT_SECRET || 'supersecret';

export const AuthContext = React.createContext();

function AuthProvider(props) {
  
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {
    const token = cookie.load('auth');
    validateToken(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const validateToken = (token) => {
    try {
      const user = jwt.verify(token, SECRET);
      setLoginState(true, token, user);
    } catch (e) {
      setLoginState(false, null, {});
    }
  };

  const setLoginState = (loggedIn, token, user) => {
    cookie.save('auth', token);
    setUser(user)
    setLoggedIn(loggedIn);
  };

  const login = async (username, password) => {
    try {
      const response = await superagent
        .post(`${API}/signin`)
        .set('authorization', `Basic ${btoa(`${username}:${password}`)}`);
      validateToken(response.body.token);
    } catch (e) {
      console.error(e.message);
    }
  };

  const signup = async (username, email, password, role) => {
    try {
      const response = await superagent
        .post(`${API}/signup`)
        .send({username,email,password,role});
      validateToken(response.body.token);
    } catch (e) {
      console.error(e.message);
    }
  };

  const logout = () => {
    setLoginState(false, null, {});
  };

  const state = { login, logout, signup, loggedIn,user };

  return (
    <AuthContext.Provider value={state}>
      {props.children}
    </AuthContext.Provider>
  );

}

export default AuthProvider;