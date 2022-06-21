import React from 'react';

/* --------------------------------- styles --------------------------------- */
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import "./assets/style.css" //very important

/* ---------------------------- react-router-dom ---------------------------- */
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';


/* ---------------------------------- pages --------------------------------- */
import Home from './pages/Home';
import Topic from './pages/Topic'
import Profile from './pages/Profile'
import Register from './pages/Register';

/* ------------------------------- components ------------------------------- */
import Header from './components/Header/Header';
import AuthModal from './components/AuthModal/AuthModal';


function App() {

  return (
      <Router>
          <div className="App">
            <Header/>

            <main id="main" className="main p-0 pt-3">
              <Routes>
                <Route path="/"  element={<Home/>} />
                <Route path="/topic/:id" element={<Topic/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/register" element={<Register/>} />
              </Routes>
            </main>

            <AuthModal />

          </div>
        
      </Router>
  );
}

export default App;
