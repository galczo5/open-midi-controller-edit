import React, {useCallback, useEffect, useState} from "react";
import './PortSelector.css';
import axios, {AxiosResponse} from "axios";

export function PortSelector(props: { onPortSelected: (port: string) => void }) {

    const [ports, setPorts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/port')
            .then((value: AxiosResponse<Array<{path: string, text: string}>>) => {
                setPorts(value.data);
                if (value.data && value.data[0]) {
                    props.onPortSelected(value.data[0].path);
                }
            });
    }, []);

    const options = ports.map(p => (
        <option key={ p.path } value={ p.path }>{ p.text }</option>
    ));

    return (
        <div className="port-selector__wrapper">
            <label className="port-selector__label">Port:</label>
            <select className="port-selector__select"
                    onChange={event => props.onPortSelected(event.target.value)}>
                { options }
            </select>
        </div>
    );
}