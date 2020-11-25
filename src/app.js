import React from 'react';
import SettingsProvider from './context/settings';
import Header from './components/header'
import ToDo from './components/todo/todo.js';
import AuthProvider from './context/auth';
import Auth from './components/auth/auth'
import { Container } from 'react-bootstrap';
import './components/todo/todo.scss';

export default function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <Header />
        <Auth capability="read">
          <ToDo />
        </Auth>
        <Auth capability="guest">
          <Container style={{textAlign:'center', marginTop:'100px'}}>

            <h1>To Do List Manager</h1>
            <h3>Signup/Signin to start</h3>

          </Container>
        </Auth>
      </SettingsProvider>
    </AuthProvider>
  );
}
