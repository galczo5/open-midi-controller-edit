import React from "react";
import './SwitchConfig.css';
import {SwitchConfigForm} from "./SwitchConfigForm";
import ReactDOM from "react-dom";
import {FsConfig} from "../DeviceConfig";

export function SwitchConfig(props: { index: number, config: FsConfig }) {

    const close = () => {
        ReactDOM.unmountComponentAtNode(document.getElementById('outlet') as Element);
    }

    return (
        <div className="switch-config__background">
            <div className="switch-config__dialog">
                <div className="switch-config__header">
                    <h2>FS{ props.index } Configuration</h2>
                    <button onClick={() => close()}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <h3>Click configuration</h3>
                <SwitchConfigForm fsNo={props.index} clickType={1} config={props.config.click}/>

                <h3>Long Click configuration</h3>
                <SwitchConfigForm fsNo={props.index} clickType={2} config={props.config.longClick}/>

                <h3>Double Click configuration</h3>
                <SwitchConfigForm fsNo={props.index} clickType={3} config={props.config.doubleClick}/>
            </div>
        </div>
    );
}