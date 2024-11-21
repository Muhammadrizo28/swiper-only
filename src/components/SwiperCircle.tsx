import React, { useCallback, useEffect, useState } from "react";
import "swiper/css/pagination";
import "../style/swiperCircle.scss";

import { events } from "../datas/events";

const SwiperCircle = ({ activeIndexFunc, activeIndex }) => {
  const totalDots = events.length;
  const angleStep = 360 / (totalDots / 2); 
  const [animation, setAnimation] = useState<number | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const [rotation, setRotation] = useState<number>(0);

  const calculateRotation = useCallback(
    (index: number) => {
      const targetAngle = 60; 
      return targetAngle - index * angleStep; 
    },
    [angleStep]
  );

  useEffect(() => {
    if (activeIndex !== null && activeIndex !== undefined) {
      const correctedIndex = activeIndex + 1; 
      const pairIndex = Math.floor(correctedIndex / 2); 
      const isFirstDot = correctedIndex % 2 === 0; 
      setRotation(calculateRotation(pairIndex + (isFirstDot ? 0 : 2.5))); 
      setActive(correctedIndex); 
    }
  }, [activeIndex, calculateRotation]);

  return (
    <div className="circle-swiper" style={{ rotate: `${rotation}deg` }}>
      {Array.from({ length: totalDots / 2 }, (_, index) => (
        <div
          key={index}
          className="circleLine"
          style={{
            transform: `rotate(${index * angleStep}deg)`,
          }}
        >
          {/* Первая точка в паре */}
          <div
            style={{ transform: `rotate(${-rotation - index * angleStep}deg)` }}
            className={`${animation === index * 2 + 1 && active !== index * 2 + 1 ? "smallDoteAnim" : "dote"} ${
              active === index * 2 + 1 ? "active" : ""
            }`}
            onMouseLeave={() => setAnimation(index * 2 + 1)}
            onMouseEnter={() => setAnimation(null)}
            onClick={() => {
              setActive(index * 2 + 1);
              activeIndexFunc(index * 2 + 1);
              setRotation(calculateRotation(index + 2.5));
            }}
          >
            <span>{index * 2 + 1}</span>
          </div>

          {/* Вторая точка в паре */}
          <div
            style={{ transform: `rotate(${-rotation - index * angleStep}deg)` }}
            className={`${animation === index * 2 + 2 && active !== index * 2 + 2 ? "smallDoteAnim2" : "dote2"} ${
              active === index * 2 + 2 ? "active" : ""
            }`}
            onMouseLeave={() => setAnimation(index * 2 + 2)}
            onMouseEnter={() => setAnimation(null)}
            onClick={() => {
              setActive(index * 2 + 2);
              activeIndexFunc(index * 2 + 2);
              setRotation(calculateRotation(index - 5));
            }}
          >
            <span>{index * 2 + 2}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SwiperCircle;
