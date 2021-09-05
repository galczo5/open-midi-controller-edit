import React from "react";
import './SwitchConfigForm.css';

export function SwitchConfigForm() {


    return (
        <div className="switch-form__row">
            <div className="switch-form__control">
                <label>Type:</label>
                <br/>
                <select name="" id="">
                    <option value="">NONE</option>
                    <option value="">NOTE</option>
                    <option value="">CC</option>
                    <option value="">TOGGLE CC</option>
                    <option value="">PAGE</option>
                    <option value="">NEXT PAGE</option>
                    <option value="">PREV PAGE</option>
                    <option value="">TEMP PAGE</option>
                </select>
            </div>
            <div className="switch-form__control">
                <label>CC:</label>
                <br/>
                <input type="text"/>
            </div>
            <div className="switch-form__control">
                <label>VALUE 1:</label>
                <br/>
                <input type="text"/>
            </div>
            <div className="switch-form__control">
                <label>VALUE 2:</label>
                <br/>
                <input type="text"/>
            </div>
        </div>
    );
}