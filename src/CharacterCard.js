import React from 'react';
import classnames from "classnames";
import './card.scss';

const Card = ({onclick, card, index, isInactive, isFlipped, isDisabled}) => {
    const handleClick = () => {
        !isFlipped && !isDisabled && onclick(index);
    };

    return(
        <div className = {classnames("card",{
                "is-flipped": isFlipped,
                "is-inactive": isInactive
        })}
        onclick = {handleClick}
        >

            <div className = "card-face card-front-face">
                <img src = "https://drive.google.com/file/d/1muVEPIxjfvHI12b3oGJ2iGAwbMhFp-Dn/view?usp=sharing"
                alt = "cover"/>
            </div>

            <div className = "card-face card-back-face">
            <img src = "https://drive.google.com/file/d/1muVEPIxjfvHI12b3oGJ2iGAwbMhFp-Dn/view?usp=sharing"
                alt = "cover"/>
            </div>
        </div>
    );
};

export default Card;