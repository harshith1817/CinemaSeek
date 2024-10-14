import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Home from './Pages/Home'
import Saved from './Pages/Saved';
import SearchPage from './Pages/SearchPage';
import './App.css';


const Background = styled.div`
  
`;





function App() {
    return (
        <Router>
            <Background>
              <img src="./Background.jpg" alt="background" className='bg'/>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/Saved' element={<Saved />} />
                </Routes>
            </Background>
        </Router>
    );
}

export default App;
