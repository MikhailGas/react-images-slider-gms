import { useEffect, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIos } from "react-icons/md";
import "./slider.css";

export default function Slider({
  slides,
  delay = 5,
  auto = true,
  navs = true,
  pags = true,
  loop = true,
}) {
  const [slidesList] = useState(slides);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);
  const [autoPlay, setAutoPlay] = useState(auto);
  const [isRight, setIsRigt] = useState(true);

  const driveRight = () => {
    if (!isAnimated && !(!loop && activeSlide === 0)) {
      setActiveSlide(activeSlide - 1);
    }
    return;
  };
  const driveLeft = () => {
    if (!isAnimated && !(!loop && activeSlide === slidesList.length - 1)) {
      setActiveSlide(activeSlide + 1);
    }
    return;
  };

  useEffect(() => {
    const lastElement = slidesList.length - 1;
    setIsAnimated(true);
    setTimeout(() => {
      setIsAnimated(false);
    }, delay * 500);
    if (activeSlide > lastElement) {
      if (!loop) {
        setIsRigt(false);
        setActiveSlide(lastElement);
      } else {
        setActiveSlide(0);
      }
    }
    if (activeSlide < 0) {
      if (!loop) {
        setIsRigt(true);
        setActiveSlide(0);
      } else {
        setActiveSlide(lastElement);
      }
    }
  }, [activeSlide, slidesList, delay, loop]);

  useEffect(() => {
    if (autoPlay && auto) {
      let slider = setInterval(() => {
        if (!loop && isRight) {
          setActiveSlide(activeSlide + 1);
        } else {
          setActiveSlide(activeSlide + 1);
        }
        if (!loop && !isRight) {
          setActiveSlide(activeSlide - 1);
        } else {
          setActiveSlide(activeSlide + 1);
        }
      }, delay * 1000);
      return () => clearInterval(slider);
    }
  }, [activeSlide, autoPlay, delay, auto, loop, isRight]);

  return (
    <div className='slider'>
      {pags && (
        <div className='pagination'>
          {slidesList.map((_, index) => (
            <div
              className={`pagination-item ${index === activeSlide && "active"}`}
              key={index}
              onClick={() => setActiveSlide(index)}></div>
          ))}
        </div>
      )}

      <div
        className='container'
        onMouseEnter={() => setAutoPlay(false)}
        onMouseLeave={() => setAutoPlay(true)}>
        <span className='counter'>
          {activeSlide + 1}/{slidesList.length}
        </span>

        {slidesList.map((slide, index) => {
          let position = "nextSlide";
          if (activeSlide === index) {
            position = "activeSlide";
          }
          if (
            index === activeSlide - 1 ||
            (activeSlide === 0 && index === slidesList.length - 1)
          ) {
            position = "lastSlide";
          }
          return (
            <div
              className={`slide ${position}`}
              style={{ transition: `all ${delay / 2}s ease` }}
              key={index}>
              <img src={slide.img} alt={`slide_`} />
              <span className='caption'>{slide.text}</span>
            </div>
          );
        })}
        {navs && (
          <div>
            <span
              className={`arrow left ${
                isAnimated || (!loop && activeSlide === slidesList.length - 1)
                  ? "arrow-disabled"
                  : ""
              }`}
              onClick={driveLeft}>
              <MdArrowBackIos />
            </span>
            <span
              className={`arrow right ${
                isAnimated || (!loop && activeSlide === 0)
                  ? "arrow-disabled"
                  : ""
              }`}
              onClick={driveRight}>
              <MdArrowForwardIos />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
