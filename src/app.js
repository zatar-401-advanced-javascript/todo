import React, { useContext } from 'react';
import SettingsProvider from './context/settings';
import Header from './components/header'
import ToDo from './components/todo/todo.js';
import { AuthContext } from './context/auth';
import Auth from './components/auth/auth'
import { Container } from 'react-bootstrap';
import './components/todo/todo.scss';

export default function App() {
  // Guest component
  const context = useContext(AuthContext)
  const Guest = () => {
    if (!context.loggedIn) {
      return (
        <Container style={{ textAlign: 'center', marginTop: '100px' }}>
          <h1>To Do List Manager</h1>
          <h3>Signup/Signin to start</h3>
        </Container>
      )
    } else {
      return <></>
    }
  }


  return (
    <SettingsProvider>
      <Header />
      <Auth capability="read">
        <ToDo />
      </Auth>
      <Guest />
    </SettingsProvider>
  );
}
