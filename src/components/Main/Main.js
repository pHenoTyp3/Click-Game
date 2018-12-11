import React from 'react';
import "./Main.css";

const Main = props => (
    <main className={`${props.shake}`}>
        <div className="sound">
            <button className={`btn btn-link ${props.vol_on}`} onClick = {() => { props.volume(); }}>
                <i className={`fas fa-volume-up fa-4x volume-icon`}></i>
            </button> 
           <button className={`btn btn-link`} onClick = {() => { props.volume(); }}>
                <i className={"fas fa-volume-off fa-4x volume-icon"}></i>
            </button> 
        </div>
        <div className="container">
            {props.children}
        </div>

    </main>
)

export default Main;
