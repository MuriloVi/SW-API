import React from 'react';
import './Card.css';

function Card(props) {
    return (
        <div className="Card">
            <div className="Card__img">
                <h1>{props.h1}</h1>

            </div>
            <div className="Card__name">
                <h2>{props.info1}</h2>

            </div>
            <div className="Card__types">
                <p>{props.info2}</p>

            </div>
            <div className="Card__info">
                <div className="Card__data Card__data--weight">
                    <p>{props.info3}</p>
                    <p>{props.info4}</p>
                </div>
                <div className="Card__data Card__data--height">
                   <p>{props.info5}</p>
                </div>
                <div className="Card__data Card__data--ability">

                  <p>{props.info6}</p>
                </div>

            </div>
        </div>

    )
}

export default Card;