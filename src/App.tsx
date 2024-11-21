import React, { useState } from "react";
import SwiperCircle from "./components/SwiperCircle.tsx";
import Numbers from "./components/Numbers.tsx";
import SwiperComponent from "./components/SwiperComponent.tsx";
import './style/App.scss'
import WindowWidth from "./datas/WindowWidth.tsx";
import NumbersDesktop from "./components/NumbersDesktop.tsx";
import {events} from './datas/events.js'

const App = () => {
  const [activeSlider, setActiveSlider] = useState<object>({date : '', title : '', index : ''}); 
  const [desktop, setDesktop] = useState<boolean>(false)
  const [activeIndex, setActiveIndex] = useState<string | null>(null)


  const activeSlide = (obj: object) => {
    setActiveSlider(obj); 
    setActiveIndex(obj.title)
    
  };

  const windowSize = (bull: boolean) => {

    setDesktop(bull)
    
  }

  const activeIndexFunc = (index : number) => {

    setActiveIndex(events[index - 1].title)
    console.log(events[index-1].title);

  }

  

  

  return (
    <div className="container">
      <header>
        <h1>Исторические даты</h1>
      </header>


      {!desktop && <Numbers activeSlider={activeSlider} /> }

      { desktop &&
        <div className="circle_numbersContainer">
          {activeIndex !== null? <h3>{activeIndex}</h3> : null}
          <SwiperCircle activeIndexFunc = {activeIndexFunc} activeIndex = {activeSlider.index}/>
          <NumbersDesktop activeSlider={activeSlider}/>
        </div>
      }

      <div className="line"></div>

      <SwiperComponent activeSlide={activeSlide} desktop =  {desktop} activeCircle = {activeIndex} />

      <WindowWidth desktop={windowSize} />
    </div>
  );
};

export default App;
