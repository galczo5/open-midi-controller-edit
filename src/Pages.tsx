import React from 'react';
import './Pages.css';

export function Pages(props: { active: number, onPageChange: (index: number) => void }) {

    const cssClasses = [
        'pages__selector',
        'pages__selector',
        'pages__selector'
    ];

    cssClasses[props.active] += ' pages__selector--active';

    return (
        <div className="pages__wrapper">
            <div className={cssClasses[0]} onClick={() => props.onPageChange(0)}>1</div>
            <div className={cssClasses[1]} onClick={() => props.onPageChange(1)}>2</div>
            <div className={cssClasses[2]} onClick={() => props.onPageChange(2)}>3</div>
            <div className="pages__selector">
                <i className="fa fa-cog"/>
            </div>
        </div>
    )
}