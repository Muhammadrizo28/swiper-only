
import React from "react";
import '../style/numbersDesktop.scss';

function NumbersDesktop({ activeSlider }) {
    
    const date = parseInt(activeSlider.date); 

    return ( 
        <div className="numbersTitle_container2">
            <div className="numbers_container2">
                <h1 className="left_year2">{date}</h1>
                <h1 className="right_year2">{date + 1 >= 2020 ? 2020 : date + 3}</h1>
            </div>
            <div className="numbers_line2"></div>
        </div>
    );
}

export default NumbersDesktop;
