import React from "react";
import '../style/numbers.scss';

function Number({ activeSlider }) {
    
    const date = parseInt(activeSlider.date); 

    return ( 
        <div className="numbersTitle_container">
            <div className="numbers_container">
                <h1 className="left_year">{date}</h1>
                <h1 className="right_year">{date + 1 >= 2020 ? 2020 : date + 3}</h1>
            </div>
            <div className="event_titleBox"><span>{activeSlider.title}</span></div>
            <div className="numbers_line"></div>
        </div>
    );
}

export default Number;
