import React from 'react';
import "./Score.css";

const Score = props => (
    <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-8"></div>
        <div className="col-lg-2">
            <button id={props.shake} className={`btn btn-block btn-score btn-${props.alertType}`}>
                <h3>Score <span className="badge">{props.score}</span></h3>
            </button>
            <button className={`btn btn-block btn-score btn-${props.topScoreType}`}>
                <h3>Top Score <span className="badge">{props.topScore}</span></h3>
            </button>
        </div>
    </div>
)

export default Score;