import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Main from './pages/Main';
import PrivateRoute from './components/PrivateRoute';
import './assets/style.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/signin"
          element={<SignIn />}
        />
        <Route
          path="/main"
          element={
            <PrivateRoute>
              <Main />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={<SignIn />}
        />
      </Routes>
    </Router>
  );
};

export default App;