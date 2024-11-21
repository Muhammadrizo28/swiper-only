import React, { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import '../style/swiper.scss';

import narrow_img from '../images/narrow.png';

import { Swiper as SwiperType, Pagination } from 'swiper/modules';

import { events } from '../datas/events';

type SwiperComponentProps = {
  activeSlide: (slide: { date: number; title: string, index : number }) => void;
  desktop: boolean;
  activeCircle: number; 
};

export default function SwiperComponent({ activeSlide, desktop, activeCircle, }: SwiperComponentProps) {
  const swiperRef = useRef<SwiperType | null>(null); 
  const paginationRef = useRef<HTMLDivElement | null>(null); 
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper: SwiperType) => {
    const realIndex = swiper.realIndex; 
    setActiveIndex(realIndex); 
    const activeEvent = events[realIndex]; 
    if (activeEvent) {
      activeSlide({ date: Number(activeEvent.date), title: activeEvent.title , index : realIndex}); // Передаем данные активного слайда
    }
  };

  useEffect(() => {
    if (swiperRef.current && typeof activeCircle === 'number') {
      swiperRef.current.slideToLoop(activeCircle); // Переход к нужному слайду
    }
  }, [activeCircle]);

  useEffect(() => {
    const swiper = swiperRef.current?.swiper;
    if (swiper) {
      const realIndex = swiper.realIndex; // Получаем индекс активной точки пагинации
      const activeEvent = events[realIndex];
      if (activeEvent) {
        activeSlide({ date: Number(activeEvent.date), title: activeEvent.title }); 
      }
    }
  }, [activeSlide]);

  return (
    <div className="swiperBox">
      <div className="custom-swiper-container">
        <Swiper
          pagination={{
            clickable: true,
            el: desktop ? null : paginationRef.current,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper; 
            const realIndex = swiper.realIndex; 
            setActiveIndex(realIndex); 
          }}
          onSlideChange={handleSlideChange}
          modules={[Pagination]}
          loop={true}
          slidesPerView={desktop ? 'auto' : 2}
          spaceBetween={desktop ? 0 : 20} // Убираем промежутки на desktop
          className="custom-swiper"
        >
          {events.map((item, index) => (
            <SwiperSlide
              className={activeIndex !== index && !desktop ? 'notActive_slider' : ''}
              key={index}
            >
              <h4>{item.date}</h4>
              <div className="slide_textBox">
                <span>{item.text}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="navigationsContainer">
        <div className="text_buttonsBox">
          <span>
            {activeIndex + 1 > 9 ? activeIndex + 1 : '0' + (activeIndex + 1)} /{' '}
            {events.length > 9 ? events.length : '0' + events.length}
          </span>

          <div className="buttons_box">
            <button className="custom-prev-button" onClick={() => swiperRef.current?.slidePrev()}>
              <img src={narrow_img} alt="slide_narrow" />
            </button>
            <button className="custom-next-button" onClick={() => swiperRef.current?.slideNext()}>
              <img src={narrow_img} alt="slide_narrow" />
            </button>
          </div>
        </div>

        <div ref={paginationRef} className={desktop ? 'hidden' : 'custom-pagination'}></div>
      </div>
    </div>
  );
}
