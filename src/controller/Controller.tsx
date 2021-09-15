import React, {useState} from 'react';
import './Controller.css';
import {Switch} from "../switch/Switch";
import {Display} from "../display/Display";
import {Pages} from "../pages/Pages";
import ReactDOM from "react-dom";
import {SwitchConfig} from "../switch-config/SwitchConfig";
import {DeviceConfig, FsConfig, PageConfig} from "../DeviceConfig";
import {HTTP} from "../HttpClient";
import axios from "axios";

function getPage(page: number, config: DeviceConfig): PageConfig {
    return config.find(x => x.page === page);
}

function getFsConfig(fs: number, pageConfig: PageConfig): FsConfig {
    return {
        click: pageConfig.click['fs' + fs],
        longClick: pageConfig.longClick['fs' + fs],
        doubleClick: pageConfig.doubleClick['fs' + fs]
    };
}

export function Controller(props: { port: string }) {

    const [ page, setPage ] = useState(0);
    const [ activeSwitch, setActiveSwitch ] = useState(1);
    const [ config, setConfig ]: [DeviceConfig, (arg: DeviceConfig) => void] = useState(null);

    const openConfig = (n: number) => {
        if (activeSwitch === n) {
            const pageConfig = getPage(page, config);
            const fsConfig = getFsConfig(n, pageConfig);
            ReactDOM.render(
                <React.StrictMode>
                    <SwitchConfig index={n} config={fsConfig} />
                </React.StrictMode>,
                document.querySelector('#outlet')
            );
        } else {
            setActiveSwitch(n);
        }
    };

    const setActivePage = async (n: number) => {
        await HTTP.changePage(n);
        setPage(n);
    };

    const loadConfig = async () => {
        const response = await axios.post('http://localhost:5000/port', {
            port: props.port
        });

        setConfig(response.data);
    }

    const toSwitch = (x, reversed) => {
        return (
            <Switch key={x}
                    index={x}
                    disabled={!config}
                    isActive={activeSwitch === x}
                    reveresedLabels={reversed}
                    onClick={() => openConfig(x)}/>
        );
    }

    let line2 = config ? 'CONFIG LOADED' : 'CONFIG NOT LOADED';

    const topRow = [1, 3, 5].map((x) => toSwitch(x, false));
    const bottomRow = [2, 4, 6].map(x => toSwitch(x, true));

    return (
        <div className="controller__body">

            { topRow }

            <Pages active={page}
                   disabled={!config}
                   onPageChange={i => setActivePage(i)}/>

            <Display line1="PORT NOT SELECTED"
                     line2={line2}
                     onLoad={() => loadConfig()}/>

            { bottomRow }

            <div className="controller__logo">
                <b>OPEN MIDI CONTROLLER</b>
            </div>
        </div>
    )
}