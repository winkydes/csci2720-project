import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home"
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
    </div>
  );
}

export default App;
