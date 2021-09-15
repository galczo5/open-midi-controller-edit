import React from 'react';
import './App.css';
import {Controller} from "./controller/Controller";
import {PortSelector} from "./port-selector/PortSelector";

export function App() {
  return (
      <div className="app__wrapper">
          <PortSelector/>
          <Controller />
      </div>
  );
}