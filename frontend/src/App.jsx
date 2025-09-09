import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Create from './pages/Create';
import Portfolio from './pages/Portfolio';

export default function App(){
  return (
    <div>
      <div className="container header">
        <h1>Portfolio Generator</h1>
        <div>
          <Link to="/"><button className="btn" style={{marginRight:8}}>Profiles</button></Link>
          <Link to="/create"><button className="btn">Create Profile</button></Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/create" element={<Create/>} />
        <Route path="/portfolio/:id" element={<Portfolio/>} />
      </Routes>

      <div className="container footer">Built minimal. Extend templates & styling as needed.</div>
    </div>
  );
}
