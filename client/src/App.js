import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import "./assets/style.css" //very important

import Home from './pages/Home';
import Topic from './pages/Topic'
import Profile from './pages/Profile'
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';

function App() {
  return (
      <Router>
          <div className="App">
            <Header />

            <main id="main" className="main">
              <Routes>
                <Route path="/"  element={<Home/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/topic" element={<Topic/>} />
                <Route path="/profile" element={<Profile/>} />
              </Routes>
            </main>
          </div>
        
      </Router>
  );
}

export default App;
