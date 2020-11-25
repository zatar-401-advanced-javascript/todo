import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvider from './context/auth';

import App from './app.js';

function Main() {
  return (
    <AuthProvider>
      < App />
    </AuthProvider>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Main />, rootElement);
