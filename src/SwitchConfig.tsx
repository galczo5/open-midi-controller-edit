import React from "react";
import './SwitchConfig.css';
import {SwitchConfigForm} from "./SwitchConfigForm";
import ReactDOM from "react-dom";

export function SwitchConfig(props: { index: number }) {

    const close = () => {
        ReactDOM.unmountComponentAtNode(document.getElementById('outlet') as Element);
    }

    return (
        <div className="switch-config__background">
            <div className="switch-config__dialog">
                <h2>FS{ props.index } Configuration</h2>

                <h3>Click configuration</h3>
                <SwitchConfigForm/>

                <h3>Long Click configuration</h3>
                <SwitchConfigForm/>

                <h3>Double Click configuration</h3>
                <SwitchConfigForm/>

                <div className="switch-config__footer">
                    <button>Save</button>
                    <button onClick={() => close()}>Cancel</button>
                </div>
            </div>
        </div>
    );
}