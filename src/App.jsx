import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Home from './Pages/Home'
import Saved from './Pages/Saved';
import SearchPage from './Pages/SearchPage';
import './App.css';


const Background = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 85vh; 
`;

const SearchBar=styled.input`
width:60%;
height:2.5rem;
background-color:white;
border-radius:0.75rem;
text-align:center;
font-size:1rem;
border:none;
`
const SearchButton=styled.button`
width:10%;
height:1.5rem;
background-color:blue;
border-radius:0.5rem;
border:none;
margin-top:0.5rem;
cursor: pointer;
`




function App() {
    return (
        <Router>
            <Background>
            <img src="/Heading.png" alt="Heading"/> 
              <img src="https://raw.githubusercontent.com/harshith1817/CinemaSeek/refs/heads/main/src/assets/Background.jpg" alt="background" className='bg'/>
                <SearchBar type="text" placeholder='Search Here'/>
                <SearchButton>Search</SearchButton>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/Saved' element={<Saved />} />
                </Routes>
            </Background>
        </Router>
    );
}

export default App;
