
import React from "react";
import "./Card.css";

const Card = props => (
    <div className="neutral item-click" onClick = {() => { props.inc(props.id); props.shuffle(props.id); }}>
        <img className="card-img" src={props.image} alt={props.name}/>
    </div>
);

export default Card;