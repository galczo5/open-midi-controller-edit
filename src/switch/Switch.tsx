import React from 'react';
import './Switch.css';

type SwitchProps = {
    index: number,
    isActive?: boolean,
    disabled: boolean,
    reveresedLabels?: boolean,
    onClick: () => void
}

export function Switch(props: SwitchProps) {
    let className = 'switch';

    if (props.isActive) {
        className += ' switch--active';
    }

    const disabledClass = props.disabled ? 'switch__wrapper--disabled ' : '';
    const reveresedClass = props.reveresedLabels ? 'switch__wrapper--reversed ' : '';

    return (
        <div className={'switch__wrapper ' + disabledClass + reveresedClass}
             onClick={() => props.onClick()}>
            <div className={className}>
                <div className="switch__inner"/>
            </div>
            <div className="switch__label">
                FS{ props.index }
            </div>
        </div>
    );
}
