import './App.css';
import React from "react";
import NavBar from "./navBar";
import Weather from './weather';

function App() {
    return (
        <div className='App bg-light '>
            <NavBar/>
            <div className='container text-body'>
                <Weather/>
            </div>
        </div>
    );
}

export default App;
