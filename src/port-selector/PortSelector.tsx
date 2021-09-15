import React, {useCallback, useEffect, useState} from "react";
import './PortSelector.css';
import axios, {AxiosResponse} from "axios";

export function PortSelector() {

    const [ports, setPorts] = useState([]);
    const [port, setPort] = useState('');
    const [connected, setConnected] = useState(false);

    useCallback(() => {
        axios.get('http://localhost:5000/port')
            .then((value: AxiosResponse<Array<{path: string, text: string}>>) => {
                setPorts(value.data);
                if (value.data && value.data[0]) {
                    setPort(value.data[0].path);
                }
            });
    }, []);

    const connect = async () => {
        const data = {
            "port": port
        };

        axios.post('http://localhost:5000/port', data)
            .then(
                () => setConnected(true),
                () => setConnected(false)
            );
    }

    const options = ports.map(p => (
        <option value={ p.path }>{ p.text }</option>
    ));

    return (
        <div className="port-selector__wrapper">
            <label className="port-selector__label">Port:</label>
            <select className="port-selector__select"
                    onChange={event => setPort(event.target.value)}>
                { options }
            </select>
            <button style={{color: connected ? 'green' : 'red'}} onClick={() => connect()}>
                CONNECT
            </button>
        </div>
    );
}