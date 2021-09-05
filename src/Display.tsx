import React from 'react';
import './Display.css';

export function Display(props: { line1: string, line2: string }) {
    return (
        <div className="display">
            <div className="display__frame">
                <div className="display__lcd">
                    <div className="display__text">
                        { props.line1 }
                        <br/>
                        { props.line2 }
                        <br/>
                        <span className="display__load">CLICK TO LOAD FROM DEVICE</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
