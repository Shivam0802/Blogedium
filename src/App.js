import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import Routing from "./Routing";
import { AuthProvider } from './Context/AuthContext';

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routing />
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
