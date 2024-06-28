import React, { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive'
import gsap from "gsap";
import { useGSAP } from '@gsap/react';

import "./Loader.css"

function LoadingPage() {
  const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });
  const LoadingPageTimeline = useRef(gsap.timeline())
  const [year, setYear] = useState(1901);
  const [startAnimation, setStartAnimation] = useState(false);
  const animationDuration = 500; // 2 secondes
  const initialDelay = 1600;

  useGSAP(() => {
    LoadingPageTimeline.current
      .fromTo(".nav__container", { opacity: 0 },{ delay: 0.8, duration: 2, opacity: 1}, "start")
      .to(".loader-date-item", { stagger: 0.06, duration: 0.5, transform: "translate3d(0px, 0%, 0px"},"start+=1")
      .to(".loader-text", { stagger: 0.06, duration: 0.6, transform: "translate3d(0px, 0%, 0px"}, "start+=1.2")
      .to(".loader-span", { duration: 0.6, opacity: 1}, "start+=1." )
      .to(".loader-date-item",  { delay : 1.2 ,duration: 0.6, transform: "translate3d(0px, -150%, 0px"})
      .to(".loader-text", { duration: 0.6, transform: "translate3d(0px, -100%, 0px"}, "<" )      
      .to(".loader-text", { opacity: 0, display: "none"}, ">" )
      .to(".loader-date-item", { opacity: 0, display: "none"}, "<" )
      .to(".loader-title__item", {  stagger: 0.06, delay: -.2,duration: 0.5, transform: "translate3d(0px, 0%, 0px"})
      .to(".loader-bg", { duration: 0.7, transform: "translate3d(0px, -150%, 0px"})
      .to(".loader-bg", { display: "none" }, "<")
      .fromTo(".hero-text__container p", {transform : "translate3d(0px, 100%, 0px)"}, { delay: .2, duration: 0.6, transform : "translate3d(0px, 0%, 0px)"}, "<")
      .to(".m-hero-text__item", { duration: 0.6, transform : "translate3d(0px, 0%, 0px"}, "<")
      .to(".loader-span", { duration: 0.3, opacity: 0, delay: isMobile ? -1 : 0}, "<")
      .to(".loader", { pointerEvents: "none"}, "<")
      .to(".loader-title", { delay: isMobile ? 1.25 : 0, opacity: 0}, "<")
      .to(".nav__burger", { delay: -.25, pointerEvents: "all"}, ">")
      .to(".body", { delay: -.25, overflowY: "auto"}, ">")
  })

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStartAnimation(true);
    }, initialDelay);
    
    return () => clearTimeout(timeout);
  }, []);                             
  
  useEffect(() => {
    if (startAnimation) {
      const years = [1924, 1947, 1984];
      let index = 0;

      const interval = setInterval(() => {
        if (index < years.length) {
          setYear(years[index]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, animationDuration);

      return () => clearInterval(interval);
    }
  }, [startAnimation]);

  const yearDigits = year.toString().split('').map((digit, i) => (
    <span key={i} className="loader-date-item">{digit}</span>
  ));
  
  return (
    <div className="loader">
        <div className="loader-bg"></div>
        <div className="loader-title">
           <div className='loader-title__container'>
              <span className='loader-title__item'>P</span>
              <span className='loader-title__item'>R</span>
              <span className='loader-title__item'>O</span>
              <span className='loader-title__item'>U</span>
              <span className='loader-title__item'>V</span>
              <span className='loader-title__item'>E</span>
           </div> 
        </div>
        <div className='loader-date'>
          <div className='loader-date__container'>
            {yearDigits}
          </div>
        </div>
        <div className='loader-text__container'>
          <div className='loader-text'>Scroll or Drag Sideways to Navigate.</div>
        </div>
        <div className="loader-span__container">
          <div className='loader-span'>DEVELOPED AND DESIGNED IN FRANCE</div>
        </div>
    </div>
  )
}

export default LoadingPage