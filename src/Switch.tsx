import React from 'react';
import './Switch.css';

type SwitchProps = {
    index: number,
    isActive?: boolean,
    onClick: () => void
}

export function Switch(props: SwitchProps) {
    let className = 'switch';

    if (props.isActive) {
        className += ' switch--active';
    }

    return (
        <div className="switch__wrapper" onClick={() => props.onClick()}>
            <div className={className}>
                <div className="switch__inner"/>
            </div>
            <div className="switch__label">
                FS{ props.index }
            </div>
        </div>
    );
}
