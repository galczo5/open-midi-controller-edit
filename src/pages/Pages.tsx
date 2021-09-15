import React from 'react';
import './Pages.css';

export function Pages(props: { active: number, onPageChange: (index: number) => void, disabled: boolean }) {
    const wrapperClass = 'pages__wrapper ' + (props.disabled ? 'pages__wrapper--disabled' : '');
    const pages = [0, 1, 2]
        .map((x, i) => {
            const cssClass = 'pages__selector' + (i === props.active ? ' pages__selector--active' : '');
            return (
                <div className={cssClass} onClick={() => props.onPageChange(x)}>{x + 1}</div>
            );
        });

    return (
        <div className={wrapperClass}>
            <div> { pages } </div>
        </div>
    )
}