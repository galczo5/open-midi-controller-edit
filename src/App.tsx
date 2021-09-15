import React, {useState} from 'react';
import './App.css';
import {Controller} from "./controller/Controller";
import {PortSelector} from "./port-selector/PortSelector";

export function App() {

    const [ port, setPort ] = useState('');

    return (
        <div className="app__wrapper">
            <PortSelector onPortSelected={x => setPort(x)}/>
            <Controller port={port} />
        </div>
    );
}