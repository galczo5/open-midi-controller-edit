import React, {useCallback, useEffect, useState} from "react";
import './SwitchConfigForm.css';
import axios from "axios";
import {HTTP} from "../HttpClient";

const labels = {
    '0': ['Disabled', 'Disabled', 'Disabled', 'Disabled'],
    '1': ['Channel', 'Note', 'Value', 'Disabled'],
    '2': ['Channel', 'CC', 'Value', 'Disabled'],
    '3': ['Channel', 'CC', 'Value 1', 'Value 2'],
    '4': ['Channel', 'Disabled', 'Disabled', 'Disabled'],
    '5': ['Channel', 'Disabled', 'Disabled', 'Disabled'],
    '6': ['Channel', 'Page', 'Disabled', 'Disabled'],
    '7': ['Channel', 'Page', 'Disabled', 'Disabled']
}

export function SwitchConfigForm(props: { clickType: number, fsNo: number, config: Array<number> }) {

    let [channel, type, data1, data2, data3] = props.config;

    if (type > 7 || type < 0) {
        type = 0;
    }

    const [newType, setNewType] = useState('0');
    const [newChannel, setNewChannel] = useState('0');
    const [newData1, setNewData1] = useState('0');
    const [newData2, setNewData2] = useState('0');
    const [newData3, setNewData3] = useState('0');

    useCallback(() => {
        setNewType(type.toString());
        setNewChannel(channel.toString());
        setNewData1(data1.toString());
        setNewData2(data2.toString());
        setNewData3(data3.toString());
    }, []);

    const saveConfig = async () => {
        await HTTP.saveConfig(
                props.fsNo - 1,
                props.clickType,
                Number(newChannel),
                Number(newType),
                Number(newData1),
                Number(newData2),
                Number(newData3)
        );
    };

    function getLabel(n: number): string {
        return labels[newType][n];
    }

    return (
        <div className="switch-form__row">
            <div className="switch-form__control">
                <label>Type</label>
                <br/>
                <select onChange={x => setNewType(x.target.value.toString())}>
                    <option value="0" selected={newType === '0'}>NONE</option>
                    <option value="1" selected={newType === '1'}>NOTE</option>
                    <option value="2" selected={newType === '2'}>CC</option>
                    <option value="3" selected={newType === '3'}>TOGGLE CC</option>
                    <option value="4" selected={newType === '4'}>NEXT PAGE</option>
                    <option value="5" selected={newType === '5'}>PREV PAGE</option>
                    <option value="6" selected={newType === '6'}>PAGE</option>
                    <option value="7" selected={newType === '7'}>TEMP PAGE</option>
                </select>
            </div>
            <div className="switch-form__control">
                <label>{getLabel(0)}</label><br/>
                <input disabled={getLabel(0) === 'Disabled'}
                       value={newChannel}
                       type="number"
                       onChange={x => setNewChannel(x.target.value)}/>
            </div>
            <div className="switch-form__control">
                <label>{getLabel(1)}</label><br/>
                <input disabled={getLabel(1) === 'Disabled'}
                       value={newData1}
                       type="number"
                       onChange={x => setNewData1(x.target.value)}/>
            </div>
            <div className="switch-form__control">
                <label>{getLabel(2)}</label><br/>
                <input disabled={getLabel(2) === 'Disabled'}
                       value={newData2}
                       type="number"
                       onChange={x => setNewData2(x.target.value)}/>
            </div>
            <div className="switch-form__control">
                <label>{getLabel(3)}:</label><br/>
                <input disabled={getLabel(3) === 'Disabled'}
                       value={newData3}
                       type="number"
                       onChange={x => setNewData3(x.target.value)}/>
            </div>

            <div className="switch-form__control">
                <label>Actions</label><br/>
                <button onClick={() => saveConfig()}>
                    Send configuration
                </button>
            </div>
        </div>
    );
}