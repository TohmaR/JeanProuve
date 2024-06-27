import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { MorphSVGPlugin } from '../../../gsap/MorphSVGPlugin.min.js';
import { InertiaPlugin } from '../../../gsap/InertiaPlugin.min.js';
import Draggable from 'gsap/Draggable';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

import { furnitureList } from '../FurnitureList.js';

//import css
import './MainDesktop.css';

//import assets
import ProuvePortrait from '../../../assets/images/ProuvePortrait.webp';
import s3MarieDuhamel from '../../../assets/images/s3MarieDuhamel.webp';
import s3VictorProuve from "../../../assets/images/s3VictorProuve.webp";
import s3VictorProuve2 from "../../../assets/images/s3VictorProuve2.webp";
import s5atelier from '../../../assets/images/s5atelier.webp';
import s6atelier from '../../../assets/images/s6atelier.webp';
import s7Collab from "../../../assets/images/s7Collab.webp";
import s7citeUniversitaire from "../../../assets/images/s7citeUniversitaire.webp";
import s7metaldoor from "../../../assets/images/s7metaldoor.webp";
import s7maisondupeuple from "../../../assets/images/s7maisondupeuple.webp";
import s8habitattropical from "../../../assets/images/s8HabitatTropical.webp";
import s9bureauMaxeville from "../../../assets/images/s9BureauxdetudesMaxeville.webp";
import s9maison10x12 from "../../../assets/images/s9maison10x12.webp";
import s9maison10x12indoor from "../../../assets/images/s9maison10x12indoor.webp";
import s10baraquemilitaire from "../../../assets/images/s10baraquemilitaire.webp";
import s11maisondemontable from "../../../assets/images/s11maisondemountable6x6.webp";
import s11maisondemontable2 from "../../../assets/images/s11maisondemountable6x62.webp";
import s11maisondemontableplan from "../../../assets/images/s11maisondemountableplan.webp";
import s12maison6x6 from "../../../assets/images/s12Maison6x6.webp";
import s13academic from "../../../assets/images/s13academic.webp"

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin, Draggable, InertiaPlugin, ScrollToPlugin);

const FurnitureNavList = [
    { text: "1920" },
    { text: "1930" },
    { text: "1940" },
    { text: "1950" },
];

function FurnitureItem({ name, year, description, image }){
    return(
        <div className="furniture-item">
            <img className="furniture-image" src={image} alt={name} />
            <div className="furniture-info">
                <div className="furniture-ld">LEFT</div>
                <div className="furniture-name">{name}</div>
                <div className="furniture-year">{year}</div>
                <div className="furniture-description">{description}</div>
            </div>
        </div>
    )
}

const MainDesktop = () => {
    const horizontalContainer = useRef(null);
    const horizontalContainer__sm = useRef(null);
    const navTimelineWhite = useRef(gsap.timeline({ paused: true }));
    const navTimelineTransparent = useRef(gsap.timeline({ paused: true }));
    const navTimelineGreen = useRef(gsap.timeline({ paused: true }));
    const navTimelineBlack = useRef(gsap.timeline({ paused: true }));
    const dragInstance = useRef(null);
    let mm = gsap.matchMedia();
    const scrollTriggerRef = useRef(null);
    const [totalWidth, setTotalWidth] = useState(0);
    const [savedProgress, setSavedProgress] = useState(0);

    //Ref sections
    const section1 = useRef(null);
    const section3 = useRef(null);
    const section5 = useRef(null);
    const section7 = useRef(null);
    const section9 = useRef(null);
    const section11 = useRef(null);
    const section13 = useRef(null);
    const section14 = useRef(null);

    //Furniture Effect
    const FurnitureContainer = useRef()
    const FurnitureOverlay = useRef();
    const FurnitureHorizontal = useRef()
    const FurnitureSectionRef = useRef([]);
    const FurnitureNavItems = useRef([]);
    const [FurnitureYear, setFurnitureYear] = useState(1920);

    //Parallax Effect
    const containerParallaxRefs = useRef([]);
    const imageParallaxRefs = useRef([]);

    //Transform Effect Title p
    const titleTranformEffectRefs = useRef([]);

    //ZoomOut Effect
    const zoomOutEffectRefs = useRef([]);

    //Reveal Text Effect
    const revealTextEffectRefs = useRef([]);

    const CircleArrowTimeline = useRef(null);
    const [isShownArrow, setIsShownArrow] = useState(null);
    const svgWave = useRef(null);
    const svgArrow = useRef(null);

    const onClickArrow = () => {
        scrollTriggerRef.current.scroll(section1.current.offsetLeft);

    };


    useEffect(() => {
        const totalWidth = horizontalContainer__sm.current.scrollWidth;
        setTotalWidth(totalWidth);
        const handleResize = () => {
            if (scrollTriggerRef.current) {
                const progress = scrollTriggerRef.current.progress;
                setSavedProgress(progress);
            }
            const totalWidth = horizontalContainer__sm.current.scrollWidth;
            setTotalWidth(totalWidth);
        };
    
        handleResize(); // Initial call
        window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const scrollableWidth = totalWidth - window.innerWidth;
        const offsetSection1 = section1.current.getBoundingClientRect().left;
        const offsetSection3 = section3.current.getBoundingClientRect().left;
        const offsetSection5 = section5.current.getBoundingClientRect().left;
        const offsetSection7 = section7.current.getBoundingClientRect().left;
        const offsetSection9 = section9.current.getBoundingClientRect().left;
        const offsetSection11 = section11.current.getBoundingClientRect().left;
        const offsetSection13 = section13.current.getBoundingClientRect().left;
        const offsetSection14 = section14.current.getBoundingClientRect().left;
        const offsetFurniture0 = FurnitureSectionRef.current[0].getBoundingClientRect().left;
        const offsetFurniture1 = FurnitureSectionRef.current[1].getBoundingClientRect().left;
        const offsetFurniture2 = FurnitureSectionRef.current[2].getBoundingClientRect().left;
        const offsetFurniture3 = FurnitureSectionRef.current[3].getBoundingClientRect().left;
      
        

        mm.add("(min-width: 1025px)", () => {
        
            navTimelineWhite.current
            .to(".nav__container", { duration: 0.25, backgroundColor: "white", borderColor: "black" }, "start")
            .to(".burger__toggleBtn span", { duration: 0.25, backgroundColor: "black" }, "start")
            .to(".nav__burger", { duration: 0.25, borderBottomColor: "black" }, "start")
            .to(".nav__vertical-credits", { duration: 0.25, color: "black" }, "start")
            .to(".nav__vertical-credits a", { duration: 0.25, color: "black" }, "start")
            .to(".nav__vertical-title", { duration: 0.25, color: "black" }, "start")
            .to(".nav__vertical-separator", { duration: 0.25, backgroundColor: "black" }, "start")
            .to(".nav__vertical-compas path", { duration: 0.25, fill: "#678846", stroke: "#678846" }, "start")
            .to(".progress__thumb", { duration: 0.25, backgroundColor: "#678846" }, "start");

            navTimelineBlack.current
                .to(".nav__container", { duration: 0.25, backgroundColor: "black", borderColor: "white" }, "start")
                .to(".burger__toggleBtn span", { duration: 0.25, backgroundColor: "white" }, "start")
                .to(".nav__burger", { duration: 0.25, borderBottomColor: "white" }, "start")
                .to(".nav__vertical-credits", { duration: 0.25, color: "white" }, "start")
                .to(".nav__vertical-credits a", { duration: 0.25, color: "white" }, "start")
                .to(".nav__vertical-title", { duration: 0.25, color: "white" }, "start")
                .to(".nav__vertical-separator", { duration: 0.25, backgroundColor: "white" }, "start")
                .to(".nav__vertical-compas path", { duration: 0.25, fill: "#678846", stroke: "#678846" }, "start")
                .to(".progress__thumb", { duration: 0.25, backgroundColor: "#678846" }, "start");

            navTimelineTransparent.current
                .to(".nav__container", { duration: 0.25, backgroundColor: "transparent", borderColor: "white" }, "start")
                .to(".burger__toggleBtn span", { duration: 0.25, backgroundColor: "white" }, "start")
                .to(".nav__burger", { duration: 0.25, borderBottomColor: "white" }, "start")
                .to(".nav__vertical-credits", { duration: 0.25, color: "white" }, "start")
                .to(".nav__vertical-credits a", { duration: 0.25, color: "white" }, "start")
                .to(".nav__vertical-title", { duration: 0.25, color: "white" }, "start")
                .to(".nav__vertical-separator", { duration: 0.25, backgroundColor: "white" }, "start")
                .to(".nav__vertical-compas path", { duration: 0.25, fill: "#678846", stroke: "#678846" }, "start")
                .to(".progress__thumb", { duration: 0.25, backgroundColor: "#678846" }, "start");
            
            navTimelineGreen.current
                .to(".nav__container", { duration: 0.25, backgroundColor: "#678846", borderColor: "black" }, "start")
                .to(".burger__toggleBtn span", { duration: 0.25, backgroundColor: "black" }, "start")
                .to(".nav__burger", { duration: 0.25, borderBottomColor: "black" }, "start")
                .to(".nav__vertical-credits", { duration: 0.25, color: "black" }, "start")
                .to(".nav__vertical-credits a", { duration: 0.25, color: "black" }, "start")
                .to(".nav__vertical-title", { duration: 0.25, color: "black" }, "start")
                .to(".nav__vertical-separator", { duration: 0.25, backgroundColor: "black" }, "start")
                .to(".nav__vertical-compas path", { duration: 0.25, fill: "black", stroke: "black" }, "start")
                .to(".progress__thumb", { duration: 0.25, backgroundColor: "white" }, "start");

        
            // Initialize horizontal scrolling
            const horizontalScroll = gsap.to(horizontalContainer__sm.current, {
                x: () => -scrollableWidth,
                ease: "none",
                scrollTrigger: {
                    trigger: horizontalContainer.current,
                    start: 'top top',
                    end: `+=${totalWidth}`, // Assurez-vous que la fin est correctement configuree
                    pin: true,
                    scrub: 1,
                    onUpdate: (self) => {
                        const progress = self.progress; // Progression du ScrollTrigger
                        const pxProgress = (progress * scrollableWidth) + (window.innerWidth * 0.0416667); // Progression en pixels
                        const biographyMenuItem = document.querySelector(".nav__menu-item:nth-child(1)");
                        const furnitureMenuItem = document.querySelector(".nav__menu-item:nth-child(2)");
                        //timeline background white
                        if (((pxProgress >= offsetSection1 && pxProgress <= offsetSection3) || (pxProgress > offsetSection7 && pxProgress < offsetSection9) || (pxProgress > offsetSection11 && pxProgress < offsetSection13 ) || (pxProgress > offsetSection14 && pxProgress < offsetFurniture1) || (pxProgress > offsetFurniture3)) && !navTimelineWhite.current.isActive()) {
                            navTimelineWhite.current.invalidate().seek(0).play();
                            if((pxProgress < offsetFurniture1) || (pxProgress > offsetFurniture3)){
                                gsap.to(FurnitureContainer.current, { backgroundColor: "white", color: "black", duration : .25 });
                                gsap.to(".furniture-overlay", { color: "black", duration : .25 });
                                if(pxProgress < offsetFurniture1){
                                    setFurnitureYear(1920);
                                    const activeItem = document.querySelector('.furniture-nav-item.active');
                                    if (activeItem) activeItem.classList.remove('active');
                                    if (FurnitureNavItems.current[0]) FurnitureNavItems.current[0].classList.add('active');
                                } else {
                                    setFurnitureYear(1950);
                                    const activeItem = document.querySelector('.furniture-nav-item.active');
                                    if (activeItem) activeItem.classList.remove('active');
                                    if (FurnitureNavItems.current[3]) FurnitureNavItems.current[3].classList.add('active');
                                }
                            }
                        }
                    
                        //timeline background transparent
                        else if (pxProgress < offsetSection1 && !navTimelineTransparent.current.isActive()) { 
                            navTimelineTransparent.current.invalidate().seek(0).play();
                        }
                    
                        //timeline background green
                        else if (((pxProgress > offsetSection3 && pxProgress < offsetSection5) || (pxProgress > offsetSection13 && pxProgress < offsetSection14) || (pxProgress > offsetFurniture2 && pxProgress < offsetFurniture3)) && !navTimelineGreen.current.isActive()) {
                            navTimelineGreen.current.invalidate().seek(0).play();
                            if(pxProgress > offsetFurniture2 && pxProgress < offsetFurniture3){
                                gsap.to(FurnitureContainer.current, { backgroundColor: "#678846", color: "black", duration : .25 });
                                gsap.to(".furniture-overlay", { color: "black", duration : .25 });
                                setFurnitureYear(1940);
                                const activeItem = document.querySelector('.furniture-nav-item.active');
                                if (activeItem) activeItem.classList.remove('active');
                                if (FurnitureNavItems.current[2]) FurnitureNavItems.current[2].classList.add('active');
                            }
                        }
                    
                        //timeline background black
                        else if (((pxProgress > offsetSection5 && pxProgress < offsetSection7 ) || (pxProgress > offsetSection9 && pxProgress < offsetSection11) || (pxProgress > offsetFurniture1 && pxProgress < offsetFurniture2 )) && !navTimelineBlack.current.isActive()){
                            navTimelineBlack.current.invalidate().seek(0).play();
                            if(pxProgress > offsetFurniture1 && pxProgress < offsetFurniture2){
                                gsap.to(FurnitureContainer.current, { backgroundColor: "black", color: "white", duration : .25 });
                                gsap.to(".furniture-overlay", { color: "white", duration : .25 });
                                setFurnitureYear(1930);
                                const activeItem = document.querySelector('.furniture-nav-item.active');
                                if (activeItem) activeItem.classList.remove('active');
                                if (FurnitureNavItems.current[1]) FurnitureNavItems.current[1].classList.add('active');
                            }
                        }
                        else if(pxProgress >= offsetFurniture0){
                            gsap.to(".furniture-nav", { transform: "translate3d(0px, 0%, 0px)", duration : .6 });
                            gsap.to(".furniture-overlay-year", { transform: "translate3d(0px, 0%, 0px)", duration : .6 });
                        }
                        else if(pxProgress < offsetFurniture0){
                            gsap.to(".furniture-nav", { transform: "translate3d(0px, 100%, 0px)", duration : .6 });
                            gsap.to(".furniture-overlay-year", { transform: "translate3d(0px, 100%, 0px)", duration : .6 });
                        }

                        if(pxProgress >= offsetSection14){
                            furnitureMenuItem.classList.add("active");
                            biographyMenuItem.classList.remove("active");
                        }
                        else if(pxProgress < offsetSection14){
                            furnitureMenuItem.classList.remove("active");
                            biographyMenuItem.classList.add("active");
                        }
                    },
                    onRefresh: () => {
                        if (savedProgress && scrollTriggerRef.current) {
                            scrollTriggerRef.current.scroll(savedProgress * scrollTriggerRef.current.end);
                        }
                    }
                },
            });

            zoomOutEffectRefs.current.forEach((container, index) => {

                gsap.fromTo(container, 
                    { 
                        scale: 1.15, 
                    },
                    {
                        scale: 1,
                        scrollTrigger: {
                            trigger: container,
                            start: "left right", // Ajustez ces valeurs pour vous assurer qu'elles correspondent à la position correcte
                            end: "right center",
                            scrub: 1,
                            horizontal: true,
                            containerAnimation: horizontalScroll,   
                        },
                        immediateRender: false, 
                    }
                );
            });

            containerParallaxRefs.current.forEach((container, index) => {
                const image = imageParallaxRefs.current[index];

                gsap.fromTo(image, 
                    { xPercent: 0 },
                    {
                        xPercent: -25,
                        scrollTrigger: {
                            trigger: container,
                            start: "left right",
                            end: "right left",
                            scrub: 1,
                            horizontal: true,
                            containerAnimation: horizontalScroll,
                        },
                        immediateRender: false,
                    }
                );
            });

            titleTranformEffectRefs.current.forEach((title, index) => {
                gsap.to(title, 
                    {
                        transform: "translate3d(0px, 0%, 0px)",
                        duration: 0.75,
                        scrollTrigger: {
                            trigger: title,
                            start: "left 80%",
                            end: "right left",
                            horizontal: true,
                            containerAnimation: horizontalScroll,
                        },
                        immediateRender: false,
                    }
                );
            });

            revealTextEffectRefs.current.forEach((text, index) => {

                const spans = text.querySelectorAll('span');

                gsap.fromTo(spans, 
                    {
                        transform: "translate3d(0px, 100%, 0px)",
                    },
                    {
                        transform: "translate3d(0px, 0%, 0px)",
                        duration: 0.75,
                        stagger: 0.05,
                        scrollTrigger: {
                            trigger: text,
                            start: "left 80%",
                            end: "right left",
                            horizontal: true,
                            containerAnimation: horizontalScroll,
                        },
                        immediateRender: false,
                    }
                );
            });

            // Save ScrollTrigger instance
            scrollTriggerRef.current = horizontalScroll.scrollTrigger;

            // Initialize Draggable
            dragInstance.current = Draggable.create(horizontalContainer__sm.current, {
                type: 'x',
                edgeResistance: 0.9,
                inertia: true,
                dragResistance: 0.87,
                bounds: { minX: -scrollableWidth, maxX: 0 },
                force3D: false,
                onDrag: function() {
                    // Update ScrollTrigger progress after drag ends
                    const progress = -this.x / scrollableWidth;
                    scrollTriggerRef.current.scroll(progress * scrollTriggerRef.current.end);
                },
                onThrowUpdate: function() {
                    // Update ScrollTrigger progress after inertia ends
                    const progress = -this.x / scrollableWidth;
                    scrollTriggerRef.current.scroll(progress * scrollTriggerRef.current.end);
                },
            });
        });

        
        // Clean-up function
        return () => {
            mm.revert();
        };
    }, [totalWidth]);

    const scrollToDecade = (target) => {
        const element = document.getElementById(target);
        if (element) {
            const containerOffset =
                (horizontalContainer__sm.current.offsetTop + element.offsetLeft) *
                (horizontalContainer__sm.current.offsetWidth /
                    (horizontalContainer__sm.current.offsetWidth - window.innerWidth));

            const currentScrollPosition = window.scrollY;
            const distance = Math.abs(containerOffset - currentScrollPosition);
    
            const speed = 1000; // Pixels per second
            const duration = distance / speed; // Duration in seconds
    
            gsap.to(window, {
                scrollTo: {
                    y: containerOffset,
                    autoKill: false
                },
                duration: 1.5
            });
        } else {
            console.error(`Element with selector "${target}" not found.`);
        }
    };


    useEffect(() => {
        if (!CircleArrowTimeline.current) {
            const wavePath = MorphSVGPlugin.convertToPath(svgWave.current);
            const arrowPath = MorphSVGPlugin.convertToPath(svgArrow.current);

            CircleArrowTimeline.current = gsap.timeline({ paused: true });
            CircleArrowTimeline.current.to(wavePath, { duration: 0.3, morphSVG: arrowPath });
        }

        if (isShownArrow !== null) {
            if (isShownArrow) {
                CircleArrowTimeline.current.invalidate().play();
            } else {
                CircleArrowTimeline.current.reverse();
            }
        }
        return () => {
            if(CircleArrowTimeline.current){
                CircleArrowTimeline.current.kill();
            }
        };
    }, [isShownArrow]);
    
    return (  
        <div className="horizontalContainer" ref={horizontalContainer}>
            <div className="horizontalContainer__sm" ref={horizontalContainer__sm}>
                <section className="hero">
                    <div className="hero-title__container">
                        <div className="hero-title">PROUVE</div>
                    </div>
                    <div className="hero-text">
                        <div className='hero-text__container'>
                            <p>A glimpse into the life and creations of Jean</p>
                        </div>
                        <div className='hero-text__container'>
                            <p>Prouve, pioneers of the innovative production of</p>
                        </div>
                        <div className='hero-text__container'>
                            <p>furniture and architecture of the 20th century</p>
                        </div>
                        <span>Developed and designed in France</span>
                    </div>
                    <div 
                        className="hero-circleArrow" 
                        onMouseEnter={() => setIsShownArrow(true)}
                        onMouseLeave={() => setIsShownArrow(false)}
                        onClick={onClickArrow}
                    >
                        <div className="hero-circleArrow__container">
                            <svg viewBox="0 0 130 60" fill="white">
                                <polygon ref={svgWave} points="4.6 6.8 3.4 8.3 3 9.5 3.2 10.7 3.9 11.8 5 12.5 6.3 12.7 7.2 12.5 8.2 11.9 9.6 10.4 11.4 9.3 13.5 8.5 15.7 8.2 18.2 8.4 20.8 9.1 23.6 10.6 26.6 13.1 30.2 17.5 33.2 22.4 36.7 29.1 39.2 34 41 37.6 43.4 41.9 46.5 46.7 49.1 50.1 52.1 53 54.7 54.9 57.3 56.2 59.9 57.1 63.2 57.7 66.3 57.8 68.8 57.5 71.7 56.7 74 55.7 78 53.1 81.3 49.8 83.9 46.4 86.3 42.7 88.9 38.2 91.3 33.5 93.2 29.8 94.8 26.6 95.6 25 97.2 22.1 99.2 18.8 101.6 15.4 104.6 12.2 108.2 9.7 112.2 8.4 116.3 7.9 122 8.7 119.9 6.1 117.8 4.4 115.7 3.2 113.3 2.9 110.9 3.3 108.5 3.9 105.4 5.4 103 6.8 101.1 8.6 99.3 10.5 97.8 12.3 95.6 14.9 99.2 18.8 100.9 16.4 102.6 14.3 104.1 12.7 106.7 10.7 108.8 9.5 111.7 8.5 113.5 8.2 115.5 8.3 117 8.6 118.4 9.2 120.2 10.3 121.7 11.7 122.8 12.5 124.1 12.7 125.2 12.4 126.2 11.7 126.8 10.7 127 9.5 126.5 8.2 124.9 6.4 122.7 4.7 120.7 3.6 119 2.9 117.5 2.5 116.2 2.3 114.9 2.2 113.7 2.2 112.2 2.3 110.2 2.6 108.6 3 107.3 3.4 106 4 104.3 5 102.5 6.3 100.4 7.9 98.2 10.2 95.6 13.6 99 16.7 100.4 14.7 101.5 13.4 103.4 11.7 104.5 10.7 105.5 9.8 106.8 9.2 108 8.4 109.8 7.6 111.4 7.3 113 7 114.7 6.8 117.1 6.7 119.4 6.9 122.7 6.4 118.6 3.8 114.7 2.2 111.3 2.4 107.5 3.4 103.9 5.2 100.7 7.5 97.7 10.7 94.6 14.8 91.8 19.6 89.3 24.3 87.3 28.4 84.8 33.4 82.4 37.8 80.2 41.5 77.6 45 74.9 47.9 72.6 49.6 70.4 50.8 68.2 51.5 66.1 51.8 63.7 51.7 61.6 51.3 59.6 50.6 57 49.1 54.8 47.2 52.6 44.8 50.7 42.1 48.1 37.9 45.4 32.9 43.3 28.7 41.3 24.8 37.3 17.3 33 11.1 28.5 6.6 26 4.9 23 3.5 20.5 2.7 17.9 2.3 16.5 2.2 14.8 2.2 13 2.5 11.2 2.9 9.3 3.7 7.6 4.5 5.9 5.7"></polygon>
                            </svg>
                            <svg viewBox="0 0 130 60" fill="white">
                                <polygon ref={svgArrow} points="0 24.8 0 26 0 26.8 0 27.7 0 28.6 0 29.6 0 30.8 2.1 30.8 4.2 30.8 8.1 30.8 12.3 30.8 14.6 30.8 16.9 30.8 19.3 30.8 21.8 30.8 25.4 30.8 28.8 30.8 32.6 30.8 36.5 30.8 38.6 30.8 41.6 30.8 45.7 30.8 49.4 30.8 51.6 30.8 53.5 30.8 55.3 30.8 56.9 30.8 58.8 30.8 61.3 30.8 63.7 30.8 66.7 30.8 68.5 30.8 71.2 30.8 73.2 30.8 76 30.8 79.2 30.8 82.6 30.8 84.7 30.8 87.1 30.8 90.2 30.8 93.4 30.8 95.8 30.8 98.5 30.8 101.8 30.8 103.4 30.8 106.2 30.8 109.8 30.8 111.8 30.8 114.2 30.8 116.7 30.8 118.5 30.8 116.7 32.6 114.9 34.4 113 36.3 111.3 38 109.4 39.9 107.6 41.7 106.1 43.2 104.5 44.8 102.9 46.4 101 48.3 99.6 49.6 98 51.3 102.2 55.5 104.2 53.6 106 51.8 107.4 50.4 108.6 49.2 110.1 47.7 111.7 46 113.5 44.3 115.6 42.2 117.3 40.5 118.9 38.9 120.3 37.5 121.7 36.1 123.1 34.7 124.5 33.3 126 31.8 127.2 30.5 128.6 29.2 130 27.8 128.3 26.1 126.9 24.7 125.2 22.9 123.8 21.6 122.5 20.3 121.2 19 119.9 17.7 118.5 16.3 116.9 14.7 115.4 13.1 113.7 11.5 112.3 10.1 110.9 8.7 109.4 7.2 108.1 5.9 106.7 4.4 105.3 3.1 103.9 1.7 102.2 0 98 4.2 99.4 5.7 100.6 6.9 102.1 8.4 103.7 10 105 11.2 106.2 12.5 107.9 14.1 108.9 15.1 110.3 16.5 111.9 18.2 113.8 20.1 115.6 21.9 117.1 23.4 118.5 24.8 116.7 24.8 114.5 24.8 112 24.8 109.3 24.8 106 24.8 103 24.8 99.6 24.8 96.8 24.8 94.4 24.8 91.9 24.8 89.4 24.8 87.5 24.8 85.2 24.8 83.2 24.8 79.6 24.8 75.9 24.8 72.3 24.8 70.6 24.8 68 24.8 65.9 24.8 63.7 24.8 62 24.8 59.9 24.8 57.5 24.8 55.9 24.8 54.1 24.8 52.4 24.8 50.6 24.8 48.3 24.8 44.1 24.8 41.3 24.8 37.9 24.8 33.1 24.8 30.1 24.8 26.6 24.8 23 24.8 19.7 24.8 17.1 24.8 14.7 24.8 13 24.8 11.3 24.8 8.7 24.8 6.4 24.8 4.2 24.8 1.8 24.8"></polygon></svg>
                        </div>
                    </div>
                </section>
                <section className="s1" ref={section1} id="biography">
                    <div className="s1-biography">
                        <h2 className="p-title">
                            <span ref={el => titleTranformEffectRefs.current[0] = el}>Biography</span>
                        </h2>
                        <div className="s1-biography__no">
                            <svg viewBox="0 0 1200 1948">
                                <path fill="#678846" d="M1199.5,1948V0L0.5,600.9v658.5l1089.2-540.5c60.4-30.2,98.8-5.5,98.8,60.4V1948H1199.5z"></path>
                            </svg>
                        </div>
                        <div className="s1-biography__scroll">Scroll / drag.</div>
                    </div>
                    <div className="s1-prv">
                        <div className="s1-prv__texte">
                        Jean Prouve marked his era with his innovations and avant-garde vision of architecture and design. His functional, modular and aesthetically sober approach continues to inspire contemporary architects and designers, confirming his place among the great names of the 20th century.
                        </div>
                        <div className="s1-prv__caption">
                            <div>RIGHT</div>
                            <div>'Jean Prouve in front of the front door of his house'</div>
                            <div>Nancy, c. 1955.</div>
                        </div>
                        <div className="s1-prv__title">
                            FRANCE
                        </div>
                    </div>
                </section>

                <section className="s2 parallax">
                    <div className="parallax-image__container" ref={el => containerParallaxRefs.current[0] = el} >
                        <img className="parallax-image" ref={el => imageParallaxRefs.current[0] = el} src={ProuvePortrait} alt="Portrait of Jean Prouve"/>
                    </div>
                </section>

                <section className="s3" ref={section3}>
                    <div className="s3-image__container">
                        <img className="s3-image" ref={el => zoomOutEffectRefs.current[0] = el}  src={s3MarieDuhamel} alt="Jean Poruvé with his mother Marie Duhamel"/>
                    </div>
                    <div>
                        <div className="s3-texte-b">Jean Prouve was born on April 8, 1901 in Paris into a family deeply rooted in art and intellect. His father, Victor Prouve, was an emblematic figure of the Art Nouveau movement, both a painter, sculptor and president of the School of Nancy. This group of artists and architects, to which Victor was closely linked, advocated a harmonious integration of art and industry, strongly influencing young Jean. The family home, often frequented by renowned artists and intellectuals, constitutes a true hotbed of creativity.</div>
                        <div className="s3-caption">
                            <div>LEFT</div>
                            <div>'Jean Prouve in the arms of his mother Marie Duhamel'</div>
                            <div>c. 1901.</div>
                        </div>
                    </div>
                    <div>
                        <div className="s3-texte border-left">In 1902, the Prouve family moved to Nancy, a dynamic center of Art Nouveau. Growing up in this vibrant setting, Jean Prouve was deeply influenced by the artistic and intellectual milieu around him. His father, Victor, a pivotal figure in the Art Nouveau movement, imparted to Jean a holistic vision of art that seamlessly integrated aesthetics with functionality. This ideology was further enriched by his mother, Marie Duhamel, whose musical talents added another layer of cultural depth to their home. Jean’s exposure to his parents' diverse artistic disciplines played a crucial role in shaping his understanding of art and design.</div>
                        <div className="s3-caption">
                            <div>LEFT</div>
                            <div>'Jean Prouve on the shoulders of his father Victor Prouve'</div>
                        </div>
                    </div>
                    <div className="s3-image__container2" >
                        <img className="s3-image2" ref={el => zoomOutEffectRefs.current[1] = el}  src={s3VictorProuve} alt="Jean Poruvé with his father Victor Prouve"/>
                    </div>
             
                        <div className="s3-texte">The foundations of Jean Prouve's career were laid very early, in an atmosphere where art and innovation were omnipresent. Immersed in a world where visual arts, music, and architecture constantly coexisted, Jean developed a unique sensitivity that would characterize his future work. He observed and participated in the creative processes of his father's art and his mother's music, fostering a practical approach to artistic creation. This broad exposure enabled him to envision and execute designs that married engineering and aesthetics, emphasizing a philosophy where form and function are inseparable. His early experiences equipped him with the tools to innovate in ways that resonated with both his artistic sensibilities and practical needs.</div>
            
                
                    <h2 className="bottom-title" ref={el => revealTextEffectRefs.current[0] = el}>
                        <span>A</span>
                        <span>R</span>
                        <span>T</span>
                        <span>I</span>
                        <span>S</span>
                        <span>T</span>
                        <span>I</span>
                        <span>C</span>
                        <span>&nbsp;</span>
                        <span>H</span>
                        <span>E</span>
                        <span>R</span>
                        <span>I</span>
                        <span>T</span>
                        <span>A</span>
                        <span>G</span>
                        <span>E</span>
                    </h2>
                </section> 

                <section className="s4 parallax">
                    <div className="parallax-image__container" ref={el => containerParallaxRefs.current[1] = el} >
                        <img className="parallax-image" ref={el => imageParallaxRefs.current[1] = el} src={s3VictorProuve2} alt="Jean Poruvé with his father Victor Prouve"/>
                    </div>
                </section>
                <section className="s5" ref={section5}>
                    <div className="s5-container">
                        <div className="s5-texte__container">
                            <div className='s5-texte-b'>Jean Prouve began his apprenticeship in ironwork in 1916 with Emile Robert in Enghien, where he acquired the basics of the trade. He continued his training with Adalbert Szabo in Paris, perfecting his skills in the traditional techniques of artistic metalwork. In 1921, he returned to Nancy and worked for the artistic ironworker Emile Brandt, where he refined his know-how and developed a personal style. These experiences allow him to master artisanal techniques while promoting innovation and quality in his work.</div>
                            <div className="s5-caption">
                                <div>LEFT</div>
                                <div>'Jean Prouve and his father Victor'</div>
                                <div>c. 1911.</div>
                            </div>
                        </div>
                        <div className="s5-texte__container">
                            <div className='s5-texte'>In 1924, Jean Prouve opened his own ironwork workshop in Nancy. He began by creating wrought iron banisters, gates and doors, demonstrating his skill at transforming metal into functional works of art. He quickly became interested in the design of furniture and architectural elements in metal. His first creations, influenced by Art Nouveau, evolved towards a more modern aesthetic, characterized by simplicity, functionality and the use of new materials such as steel and aluminum. His works combine beauty and practicality, establishing his workshop as a place of innovation in metal design.</div>
                            <div className="s5-caption">
                                <div>RIGHT</div>
                                <div>'Jean Prouve at the workshop of emile Robert'</div>
                                <div>c. 1917.</div>
                            </div>
                        </div>
                        <div className='s5-image__container'>
                            <img className="s5-image" ref={el => zoomOutEffectRefs.current[2] = el} src={s5atelier} alt="Jean Prouve at the workshop of emile Robert"/>
                        </div> 
                    </div>
                    <h2 className="bottom-title" ref={el => revealTextEffectRefs.current[1] = el}>
                        <span>W</span>
                        <span>O</span>
                        <span>R</span>
                        <span>K</span>
                        <span>S</span>
                        <span>H</span>
                        <span>O</span>
                        <span>P</span>
                        <span>S</span>
                    </h2>
                </section>
                
                <section className="s6 parallax">
                    <div className="parallax-image__container" ref={el => containerParallaxRefs.current[2] = el} >
                        <img className="parallax-image" ref={el => imageParallaxRefs.current[2] = el} src={s6atelier} alt="Jean Prouve during his apprenticeship with emile Robert"/>
                        <div className="parallax-caption">
                            <div>IMAGE</div>
                            <div>'Jean Prouve during his apprenticeship with emile Robert'</div>
                            <div>Enghien-les-Bains, c. 1917.</div>
                        </div>
                    </div>
                </section>

                <section className="s7" ref={section7}>
                    <div className="s7-container">
                        <img className="s7-image__collab" src={s7Collab} alt="Steph Simon, Martha Villiger, Jean Prouve and Charlotte Perriand"/>
                        <div className='s7-texte__container'>
                            <div className='s7-texte'>In the 1930s, Jean Prouve began to collaborate with major figures in architecture and design, including Le Corbusier, Charlotte Perriand and Pierre Jeanneret. These collaborations mark a particularly fruitful period of his career. Le Corbusier, famous for his revolutionary theories on urban planning and architecture, found in Prouve an ideal partner to materialize his avant-garde ideas. Charlotte Perriand, an influential designer, shares with Prouve a common vision of modernity, focused on functionality and refined aesthetics.</div>
                            <div className="s7-caption">
                                <div>LEFT</div>
                                <div>'Steph Simon, Martha Villiger, Jean Prouve and Charlotte Perriand'</div>
                                <div>Paris, c. 1953.</div>
                            </div>
                        </div>
                        <div className='s7-texte__container border-left'>
                            <div className='s7-texte'>Together they work on various projects, exploring new approaches to design and construction. One of their emblematic projects is the interior equipment of the Cite Universitaire de Paris, where Prouve applies his skills in metallurgy to create functional and innovative furniture. These collaborations allow Prouve to immerse himself in a network of like-minded creators, which stimulates his creativity and inspires him to push the boundaries of his art. He draws inspiration from the modernist theories of his colleagues to develop architectural solutions and furniture that reflect the principles of simplicity, functionality and rationality.</div>
                            <div className="s7-caption">
                                <div>RIGHT</div>
                                <div>'Reproduction of a student room from the 1950s<br/> in the Antony university campus'</div>
                                <div>MAD Paris</div>
                            </div>
                        </div>
                        <div className='s7-image__container'>
                            <img className="s7-image__cite" ref={el => zoomOutEffectRefs.current[3] = el} src={s7citeUniversitaire} alt="Reproduction of a student room from the 1950s" />
                        </div>
                        <div className='s7-texte__container'>
                            <div className='s7-texte'>Alongside his collaborations, Jean Prouve focuses on technical innovation, particularly in the field of modular construction. He developed manufacturing techniques using industrial materials such as aluminum and steel, pioneers at the time. One of its major innovations is the development of modular metal panels which make it possible to create light, strong and easily transportable structures. These panels can be assembled quickly on site, reducing construction time and costs.</div>
                            <img className="s7-image__door" src={s7metaldoor} alt="Chamberlain I Prouve” exhibition at the Gagosian Gallery"/>
                        </div>
                        <div className='s7-texte__container'>
                            <div className='s7-texte'>These advances opened the way to prefabrication and the industrialization of construction, concepts which would become pillars of his work. Prouve applies these techniques in various projects, such as the Maison du Peuple in Clichy and schools in Africa, demonstrating the effectiveness and flexibility of his methods. Prefabrication not only makes it possible to respond quickly to housing and infrastructure needs, but also to ensure consistent quality and savings in resources.</div>
                            <div className="s7-caption">
                                <div>LEFT</div>
                                <div>“Chamberlain I Prouve” exhibition at the Gagosian Gallery</div>
                                <div>New York, c. 2015.</div>
                            </div>
                            <div className="s7-caption">
                                <div>RIGHT</div>
                                <div>'Maison du peuple (Jean Prouve, with E. Beaudouin and M. Lods, arch., V. Bodiansky, ing.)'</div>
                                <div>Clichy, 1935-1939.</div>
                            </div>
                        </div>
                        <div className='s7-image__container2'>
                            <img className="s7-image__maison" ref={el => zoomOutEffectRefs.current[4] = el} src={s7maisondupeuple} alt="Maison du peuple (Jean Prouve, with E. Beaudouin and M. Lods, arch., V. Bodiansky, ing."/>
                        </div>
                        <div className='s7-texte__container-b'>
                            <div className='s7-texte-b'>Prouve's innovations have greatly influenced construction, making it more accessible and sustainable, and aligned with current needs for speed, mobility, and functionality. He foresaw future developments in architecture, inspiring many generations of architects and designers. His modular construction techniques are now recognized as essential to the development of modern architecture, demonstrating his creative genius and vision.</div>
                        </div>
                    </div>
                    <h2 className="bottom-title" ref={el => revealTextEffectRefs.current[2] = el}>
                        <span>C</span>
                        <span>O</span>
                        <span>L</span>
                        <span>L</span>
                        <span>A</span>
                        <span>B</span>
                        <span>O</span>
                        <span>R</span>
                        <span>A</span>
                        <span>T</span>
                        <span>I</span>
                        <span>O</span>
                        <span>N</span>
                        <span>S</span>
                        <span>&nbsp;</span>
                        <span>A</span>
                        <span>N</span>
                        <span>D</span>
                        <span>&nbsp;</span>
                        <span>I</span>
                        <span>N</span>
                        <span>N</span>
                        <span>O</span>
                        <span>V</span>
                        <span>A</span>
                        <span>T</span>
                        <span>I</span>
                        <span>O</span>
                        <span>N</span>
                        <span>S</span>
                    </h2>
                </section>

                <section className="s8 parallax">
                    <div className="parallax-image__container" ref={el => containerParallaxRefs.current[3] = el} >
                        <img className="parallax-image" ref={el => imageParallaxRefs.current[3] = el} src={s8habitattropical} alt="Image Parallaxe"/>
                    </div>
                </section>

                <section className="s9" ref={section9}>
                    <div className="s9-container">
                        <div className='s9-texte__container'>
                            <div className='s9-texte'>In 1947, Jean Prouve transferred his workshops to Maxeville, near Nancy. This place is quickly becoming a nerve center for innovation in metallurgy and architectural design. The workshops are distinguished by their ability to produce not only furniture, but also complex metal structures for architecture. Jean Prouve develops metal facades, partitions, doors and windows, while continuing to create furniture that combines aesthetics and functionality.Prouve’s approach is based on industrialization and prefabrication, using materials like steel and aluminum to create modular parts. This method makes it possible to standardize and streamline production, reducing costs and manufacturing times while ensuring high quality. Its innovations in modular construction open up new perspectives in the field of architecture, notably by facilitating the rapid and efficient construction of buildings.</div>
                        </div>
                        <div className='s9-image__container'>
                            <img className="s9-image__maxevilleBureaux" ref={el => zoomOutEffectRefs.current[4] = el} src={s9bureauMaxeville} alt="Design office of Ateliers Jean Prouve"/>
                        </div>
                        <div className='s9-texte__container'>
                            <div className='s9-texte-b'>With the Second World War, the Ateliers Jean Prouve adapted their production to military needs, manufacturing bicycles, components for aircraft and military equipment. This reconversion demonstrates the flexibility and innovation of the workshops. Despite material shortages, Jean Prouve continues to experiment and perfect his construction techniques, maintaining his commitment to functional and accessible architecture. This period reinforces his pragmatic approach and humanist vision of architecture, highlighting his ability to adapt and innovate under pressure.</div>
                            <div className='s9-caption__container-b'>
                                <div className="s9-caption">
                                    <div>RIGHT</div>
                                    <div>'Design office of Ateliers Jean Prouve'</div>
                                    <div>Maxeville, c. 1952.</div>
                                </div>
                                <div className="s9-caption">
                                    <div>RIGHT</div>
                                    <div>'Prototype demountable house 10×12 m, with its 2×12 m awning'</div>
                                </div>
                            </div>
                        </div>
                        <div className='s9-image__container2'>
                            <img className="s9-image__maison" ref={el => zoomOutEffectRefs.current[5] = el} src={s9maison10x12} alt="Prototype demountable house 10×12 m, with its 2×12 m awning"/>
                        </div>
                        <div className='s9-texte__container'>
                            <div className='s9-texte'>One of the most ambitious projects developed during this period was the model of a 10x12 meter demountable house, complete with a 2x12 meter awning, designed in 1948. This model was designed as a demonstration vehicle to demonstrate the merits of construction pre-made to a wider audience. The architecture of the house is based on the use of axial load-bearing porticos, which not only structure the space but also allow remarkable flexibility in the interior layout. The partitions and facade panels, whether glazed or solid, are designed to be interchangeable, allowing occupants to modify the layout according to their evolving needs.</div>
                            <div className="s9-caption">
                                <div>LEFT</div>
                                <div>'Interior view of prototype of a 10×12 m demountable house'</div>
                            </div>
                        </div>
                        <img className="s9-image__maisonindoor" src={s9maison10x12indoor} alt="Interior view of prototype of a 10×12 m demountable house"/>
                    </div>
                    <h2 className="bottom-title" ref={el => revealTextEffectRefs.current[3] = el}>
                        <span>M</span>
                        <span>A</span>
                        <span>X</span>
                        <span>E</span>
                        <span>V</span>
                        <span>I</span>
                        <span>L</span>
                        <span>L</span>
                        <span>E</span>
                        <span>&nbsp;</span>
                        <span>&</span>
                        <span>&nbsp;</span>
                        <span>I</span>
                        <span>M</span>
                        <span>P</span>
                        <span>A</span>
                        <span>C</span>
                        <span>T</span>
                        <span>&nbsp;</span>
                        <span>O</span>
                        <span>F</span>
                        <span>&nbsp;</span>
                        <span>W</span>
                        <span>A</span>
                        <span>R</span>
                    </h2>
                </section>

                <section className="s10 parallax">
                    <div className="parallax-image__container" ref={el => containerParallaxRefs.current[4] = el} >
                        <img className="parallax-image" ref={el => imageParallaxRefs.current[4] = el} src={s10baraquemilitaire} alt="Image Parallaxe"/>
                    </div>
                </section>

                <section className="s11" ref={section11}>
                    <div className="s11-container">
                        <img className="s11-image__maison" src={s11maisondemontable} alt="Interior view of 6x6 demountable house"/>
                        <div className='s11-texte__container'>
                            <div className='s11-texte__collab'>After the Second World War, Jean Prouve played a crucial role in the reconstruction of France. The country, ravaged by bombings and fighting, is in urgent need of housing and infrastructure. Prouve, with its innovative vision of modular construction and prefabrication, finds itself at the forefront of this reconstruction effort. In 1947, he designed Demountable Houses, modular structures designed to be quickly assembled on site. These houses, made of prefabricated metal panels, respond to urgent needs for temporary housing while offering durable and aesthetically pleasing solutions.</div>
                            <div className="s11-caption">
                                <div>LEFT</div>
                                <div>'Interior view of 6x6 demountable house'</div>
                                <div>c. 1944.</div>
                            </div>
                        </div>
                        <div className='s11-texte__container'>
                            <div className='s11-texte__collab'>These projects mark a turning point in his career and allow him to demonstrate the effectiveness of his construction methods in crisis conditions. His pragmatic approach and attention to detail attract the attention of architects and urban planners internationally. He begins to receive orders not only from France, but also from other European countries and North America. Prouve's techniques, which combine speed of execution, low cost and structural quality, are seen as ideal solutions to the problems of rapid urbanization and housing shortages. His fame grew, and he became a central figure in the post-war reconstruction movement, working on international projects and collaborating with other renowned architects to export his technical innovations around the world.</div>
                        </div>
                        <div className='s11-image__container'>
                            <img className="s11-image__maison2" ref={el => zoomOutEffectRefs.current[6] = el} src={s11maisondemontable2} alt="demountable house"/>
                        </div>
                        <div className='s11-texte__container'>
                            <div className='s11-texte__collab'>True architectural performances that can be transported and dismantled, these “barracks” were made exclusively of wood and metal (taking into account the shortage of metal). They were directly transported in spare parts to the villages devastated by the bombings. They could be assembled in one day by 3 people on the very site of the destruction, thus allowing populations deprived of roofs to stay in their villages</div>
                            <img className="s11-image__plan" src={s11maisondemontableplan} alt="Construction methods, types of housing created by the Ateliers Jean Prouve”. Advertising brochure for the Ateliers Jean Prouve Studal"/>
                        </div>
                        <div className='s11-texte__container'>
                            <div className='s11-texte__collab'>The expansion of its international influence does not stop with simple orders. Prouve actively participates in exhibitions and conferences across the globe, sharing his ideas on modularity and prefabrication. He is invited to collaborate on iconic projects, contributing to exhibition pavilions and public buildings that showcase his innovative construction techniques. This period of his career was marked by growing recognition of his creative genius, placing him among the most respected architects and designers of his time. Its innovations are not only technical, they are also philosophical, embodying a vision of architecture where each component is designed to maximize efficiency and beauty.</div>
                            <div className="s11-caption two">
                                <div>LEFT</div>
                                <div>Construction methods, types of housing created by the Ateliers Jean Prouve”. Advertising brochure for the Ateliers Jean Prouve Studal</div>
                                <div>Paris, c. 1950.</div>
                            </div>
                        </div>
                    </div>
                    <h2 className="bottom-title" ref={el => revealTextEffectRefs.current[4] = el}>
                        <span>I</span>
                        <span>N</span>
                        <span>T</span>
                        <span>E</span>
                        <span>R</span>
                        <span>N</span>
                        <span>A</span>
                        <span>T</span>
                        <span>I</span>
                        <span>O</span>
                        <span>N</span>
                        <span>A</span>
                        <span>L</span>
                        <span>&nbsp;</span>
                        <span>E</span>
                        <span>X</span>
                        <span>P</span>
                        <span>E</span>
                        <span>N</span>
                        <span>S</span>
                        <span>I</span>
                        <span>O</span>
                        <span>N</span>
                    </h2>
                </section>

                <section className="s12 parallax">
                    <div className="parallax-image__container" ref={el => containerParallaxRefs.current[5] = el} >
                        <img className="parallax-image" ref={el => imageParallaxRefs.current[5] = el} src={s12maison6x6} alt="Image Parallaxe"/>
                    </div>
                </section>

                <section className="s13" ref={section13}>
                    <div className="s13-container">
                        <div className='s13-texte-b'>In 1957, Jean Prouve became a professor at the National School of Decorative Arts in Paris. There, he passed on his experience and innovative ideas to a new generation of designers and architects. Prouve did not limit himself to teaching construction techniques; he inspired his students to rethink architecture and design in terms of functionality, sustainability, and social responsibility. He promoted a holistic approach where aesthetics and technique are inseparable, and where each project must meet real needs while being accessible and ethical.</div>
                        <div className='s13-image__container'>
                            <img className="s13-image" ref={el => zoomOutEffectRefs.current[7] = el} src={s13academic} alt="Jean Prouve gives a course at the Conservatory of Arts and Crafts"/>
                        </div>
                        <div className='s13-texte__container'>
                            <div className='s13-texte'>His influence as a teacher is considerable. He trained several generations of creators who would carry his avant-garde ideas into their own work. Many of Prouve's students would go on to become influential figures in the world of architecture and design, continuing his legacy. In recognition of his exceptional contributions to architecture and design, Prouve received several prestigious honors. In 1981, he was honored with the Grand Prix National de l'Architecture, recognition of his lasting impact and pioneering role. His works are exhibited in world-renowned museums, and he is regularly invited to give lectures, actively participating in architectural competition juries and sharing his expertise within the international design community.</div>
                            <div className="s13-caption">
                                <div>LEFT</div>
                                <div>Jean Prouve gives a course at the Conservatory of Arts and Crafts,</div>
                                <div>c. 1967.</div>
                            </div>
                        </div>
                    </div>
                    <h2 className="bottom-title" ref={el => revealTextEffectRefs.current[5] = el}>
                        <span>A</span>
                        <span>C</span>
                        <span>A</span>
                        <span>D</span>
                        <span>E</span>
                        <span>M</span>
                        <span>I</span>
                        <span>C</span>
                    </h2>
                </section>
                
                <section className="p p2" id="furniture" ref={section14}>
                    <div className="p-container">
                        <h2 className="p-title">
                            <span ref={el => titleTranformEffectRefs.current[1] = el} >Furnitures</span>
                        </h2>
                        <div className="p-no">
                            <svg viewBox="0 0 1786 1957">
                                <path d="M686,1829.5c0-402.2,68.9-669.4,462.8-774.1l154.3-41.3c316.8-85.4,482.1-146,482.1-402.2c0-341.6-297.5-611.6-826.5-611.6C383,0.3,27.6,333.6,27.6,826.7h11c0-192.8,101.9-209.4,195.6-209.4h1250.7c137.7,0,198.3,44.1,198.3,135c0,132.2-129.5,181.8-374.7,247.9l-165.3,44.1C512.4,1212.4,0,1352.9,0,1956.2h1785.1v-11H790.7C710.8,1945.2,686,1906.6,686,1829.5z"></path>
                            </svg>
                        </div>
                    </div>
                </section>
                <div className="furniture" id="furniture" ref={FurnitureContainer}>
                    <div className='furniture-horizontal' ref={FurnitureHorizontal}>
                        {Object.entries(furnitureList).map(([decade, items], index) => (
                            <section className="furniture-section" ref={el => FurnitureSectionRef.current[index] = el} id={decade} key={decade}>
                                {items.map((item) => (
                                    <FurnitureItem 
                                        key={item.name}
                                        name={item.name}
                                        year={item.year}
                                        description={item.description}
                                        image={item.image}
                                    />
                                ))}
                            </section>
                        ))}
                    </div>
                </div>
            </div>
            <div className="furniture-overlay" ref={FurnitureOverlay}>
                <div className="furniture-nav-container">
                    <div className="furniture-nav">
                        <div>— Decades</div>
                        <ul>
                        {FurnitureNavList.map((decade, index) => (
                            <li className="furniture-nav-item" ref={el => FurnitureNavItems.current[index] = el} key={index} onClick={() => scrollToDecade(decade.text)}>{decade.text}</li>
                        ))}
                        </ul>
                    </div> 
                </div>
                <div className="furniture-overlay-year-container"> 
                    <div className="furniture-overlay-year">{FurnitureYear}</div>
                </div>
            </div>
    </div>  
    );
};

export default MainDesktop;