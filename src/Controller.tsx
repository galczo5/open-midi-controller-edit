import React, {useState} from 'react';
import './Controller.css';
import {Switch} from "./Switch";
import {Display} from "./Display";
import {Pages} from "./Pages";
import ReactDOM from "react-dom";
import {SwitchConfig} from "./SwitchConfig";

export function Controller() {

    const [ page, setPage ] = useState(0)
    const [ activeSwitch, setActiveSwitch ] = useState(1)

    const openConfig = (n) => {
        setActiveSwitch(n);
        ReactDOM.render(
            <React.StrictMode>
                <SwitchConfig index={n}/>
            </React.StrictMode>,
            document.querySelector('#outlet')
        )
    };

    return (
        <div className="controller__body">
            <Switch index={1}
                    isActive={activeSwitch === 1}
                    onClick={() => openConfig(1)}/>

            <Switch index={3}
                    isActive={activeSwitch === 3}
                    onClick={() => openConfig(3)}/>

            <Switch index={5}
                    isActive={activeSwitch === 5}
                    onClick={() => openConfig(5)}/>

            <Pages active={page} onPageChange={i => setPage(i)}/>
            <Display line1="OPEN MIDI CONTROLLER" line2="EDITOR"/>

            <Switch index={2}
                    isActive={activeSwitch === 2}

                    onClick={() => openConfig(2)}/>

            <Switch index={4}
                    isActive={activeSwitch === 4}

                    onClick={() => openConfig(4)}/>

            <Switch index={6}
                    isActive={activeSwitch === 6}

                    onClick={() => openConfig(6)}/>

        </div>
    )
}