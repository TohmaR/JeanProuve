import React, { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { MorphSVGPlugin } from '../../../gsap/MorphSVGPlugin.min.js';
import "./NavDesktop.css";



gsap.registerPlugin(ScrollToPlugin, MorphSVGPlugin);

const menuList = [
    { no: "1", text: "BIOGRAPHY", target: "biography" },
    { no: "2", text: "FURNITURE", target: "furniture" },
    // { no: "3", text: "FURNITURE", target: "furniture" },
    // { no: "4", text: "ARCHITECTURE", target: "architecture" },
];

function MenuLink({ no, text, target, onClick }) {
    return (
        <li className="nav__menu-item" onClick={() => onClick(target)}>
            <div className="nav__menu-name">
                {text}
            </div>
            <div className="nav__menu-no">
                <div className="nav__menu-noc">{no}</div>
            </div>
        </li>
    );
}

function NavDesktop () {
    const [toggleMenu, setToggleMenu] = useState(null);
    const menuTimeline = useRef();
    const [scrollTop, setScrollTop] = useState(12.24);
    const crossTop = useRef(null);
    const crossBottom = useRef(null);
    const crossTopOut = useRef(null);    
    const crossBottomOut = useRef(null);


    const onResize = () => {
        onScroll();
    };

    const onScroll = () => {
        const winScroll = document.documentElement.scrollTop;
        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const minHeight = 12.24;
        const maxHeight = 100;
        const heightRange = maxHeight - minHeight;
    
        const scrollTop = minHeight + (scrolled * heightRange / 100);
    
        setScrollTop(scrollTop);
    };

    useEffect(() => {
        if (!menuTimeline.current) {
            
            const crossTopPath = MorphSVGPlugin.convertToPath(crossTop.current);
            const crossBottomPath = MorphSVGPlugin.convertToPath(crossBottom.current);
            const crossTopOutPath = MorphSVGPlugin.convertToPath(crossTopOut.current);
            const crossBottomOutPath = MorphSVGPlugin.convertToPath(crossBottomOut.current);
            menuTimeline.current = gsap.timeline({ paused: true, reversed: true });

            menuTimeline.current
                .to(".nav__container", { duration: 0.25, backgroundColor: "#678846", borderColor: "black" }, "start")
                .to(".burger__toggleBtn span", { duration: 0.25, backgroundColor: "black" }, "start")
                .to(".nav__burger", { duration: 0.25, borderBottomColor: "black" }, "start")
                .to(".nav__vertical-credits", { duration: 0.25, color: "black" }, "start")
                .to(".nav__vertical-credits a", { duration: 0.25, color: "black" }, "start")
                .to(".nav__vertical-title", { duration: 0.25, color: "black" }, "start")
                .to(".nav__vertical-separator", { duration: 0.25, backgroundColor: "black" }, "start")
                .to(".nav__vertical-compas path", { duration: 0.25, fill: "black", stroke: "black" }, "start")
                .to(".progress__thumb", { duration: 0.25, backgroundColor: "white" }, "start");

            menuTimeline.current
                .to(".nav__bg", { duration: 0.8, width: "100vw", ease: "expo.inOut" }, "menu")
                .to(".nav__menu-name", { duration: 0.8, stagger: 0.04, transform: "translate3d(0px, 0%, 0px)" }, "menu+=0.4")
                .to(".nav__menu", { pointerEvents: "all" }, "menu+=0.4")
                .to(".nav__menu-noc", { duration: 0.8, stagger: 0.04, transform: "translate3d(0px, 0%, 0px)" }, "menu+=0.4")
                .to(".close-circle-w", { duration: .6, rotation: -180}, "menu+=0.6")
                .fromTo(".close-circle", {strokeDashoffset : "1281.77"}, { duration: 0.5, strokeDashoffset : "0"}, "menu+=0.6")
                .to(crossTopOutPath, { duration: 0.3, morphSVG: crossTopPath}, "menu+=0.6")
                .to(crossBottomOutPath, { duration: 0.3, morphSVG: crossBottomPath},"menu+=0.6");
        }

        const toggleAnimation = () => {

            document.body.style.overflowY = toggleMenu ? "hidden" : "scroll";
            if (menuTimeline.current.reversed()) {
                menuTimeline.current.invalidate().play();
            } else {
                menuTimeline.current.reverse();
            }
        };

        if (toggleMenu !== null) {
            toggleAnimation();
        }
        return () => menuTimeline.current.kill();
    }, [toggleMenu]);


    useEffect(() => {
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    const scrollToLink = useCallback((target) => {
        setToggleMenu(false);

        const element = document.getElementById(target);
        const elementOffsetLeft = element.offsetLeft;


        gsap.to(window, {duration: 1, scrollTo: {y: elementOffsetLeft, autoKill: false}});
    }, []);

    return (
        <nav>
            <div className="nav__container">
                <div className="nav__burger">
                    <div className="burger">
                        <div className={toggleMenu ? "burger__toggleBtn open" : "burger__toggleBtn"} onClick={() => setToggleMenu(!toggleMenu)}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
                <div className="nav__vertical">
                    <div className="nav__vertical-credits">

                        <div>
                            BY&nbsp;
                        </div>
                        <a href="">THOMAS ROUX</a>
                    </div>
                    <div className="nav__vertical-title">
                        PROUVE
                    </div>
                    <div className="nav__vertical-separator"></div>
                </div>
                <div className="progress__container">
                    <div
                        className="progress__thumb"
                        style={{ height: `${scrollTop}vh` }}
                    ></div>
                </div>
                <svg
                    className="nav__vertical-compas"
                    version="1.1"
                    width={100}
                    height={100}
                    viewBox="0 0 100 100"
                    xmlSpace="preserve"
                >

                    <g transform="matrix(1 0 0 1 50 49.5982277521)" id="S7yeTbLhdG6OASSq7MgZO">
                        <path
                            style={{
                                stroke: "#678846",
                                strokeWidth: 1,
                                strokeDasharray: "none",
                                strokeLinecap: "butt",
                                strokeDashoffset: 0,
                                strokeLinejoin: "miter",
                                strokeMiterlimit: 4,
                                fill: "#678846",
                                opacity: 1
                            }}
                            transform=" translate(0.000005, 0.00001)"
                            d="M -35.28354 39.69287 L 2.413269999999997 -41.15178 L 35.28353 41.151759999999996 L 32.126689999999996 41.151759999999996 L 1.5082899999999952 -22.90141 L -31.523380000000003 39.69286 z"
                            strokeLinecap="round"
                        />
                    </g>
                </svg>
            </div>
            <div className="nav__menu">
                <div className="nav__bg"></div>
                <ul className="nav__menu-list">
                    {menuList.map((linkData, index) => (
                        <MenuLink
                            key={index}
                            no={linkData.no}
                            text={linkData.text}
                            target={linkData.target}
                            onClick={scrollToLink}
                        />
                    ))}
                </ul>
                <div className="close" onClick={() => setToggleMenu(false)}>
                    <div className="close-circle-w">
                        <svg viewBox="0 0 420 420">
                            <circle className="close-circle" cx="210" cy="210" r="204"></circle>
                        </svg>
                    </div>
                    <div className="close-cross">
                        <svg viewBox="0 0 420 420">
                            <polygon className="close-cross-top" ref={crossTop} points="157.7 149.2 149.2 157.7 262.3 270.8 270.8 262.3"></polygon>
                            <polygon className="close-cross-bottom" ref={crossBottom} points="262.3 149.2 149.2 262.3 157.7 270.8 270.8 157.7"></polygon>
                            <polygon className="close-cross-top__out" ref={crossTopOut} points="157.7 149.2 149.2 157.7 149.2 157.7 157.7 149.2"></polygon>
                            <polygon className="close-cross-bottom__out" ref={crossBottomOut} points="149.2 262.3 149.2 262.3 157.7 270.8 157.7 270.8"></polygon>
                        </svg>
                    </div>
                    {/* <div className="close-arrow">
                        <svg viewBox="0 0 420 420">
                            <polygon className="close-arrow-line-0" points="295.5,204 295.5,216 295.5,216 295.5,204"></polygon>
                            <polygon className="close-arrow-line-1" points="176.5,164 176.5,164 185,172.5 185,172.5"></polygon>
                            <polygon className="close-arrow-line-2" points="176.5,256 176.5,256 185,247.5 185,247.5"></polygon>
                        </svg>
                    </div> */}
                </div>
            </div>
        </nav>
    )
}

export default NavDesktop;