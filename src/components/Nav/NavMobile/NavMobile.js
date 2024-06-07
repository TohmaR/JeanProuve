import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import "./NavMobile.css";

gsap.registerPlugin(ScrollToPlugin);

const menuList = [
  { no: "1", text: "BIOGRAPHY", target: "biography" },
  { no: "2", text: "WORKSHOPS", target: "workshops" },
  { no: "3", text: "FURNITURE", target: "furniture" },
  { no: "4", text: "ARCHITECTURE", target: "architecture" },
];

function MenuLink({ no, text, target, onClick }) {
  return (
    <li className="m-nav__menu-item" onClick={() => onClick(target)}>
      <div className="m-nav__menu-name">
        {text}
      </div>
      <div className="m-nav__menu-no">
        <div className="m-nav__menu-noc">{no}</div>
      </div>
    </li>
  );
}

function NavMobile() {
  const [toggleMenu, setToggleMenu] = useState(null);
  const menuTimeline = useRef();
  const [scrollTop, setScrollTop] = useState(0);

  const transformNavTimeline = useRef(gsap.timeline({ paused: true }));

  const onResize = () => {
    onScroll();
  };

  const onScroll = () => {
    const winScroll = document.documentElement.scrollTop;
    const height = 
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    setScrollTop(scrolled);
  };

  useEffect(() => {
    const handleScroll = () => {
      console.log("scrollY : ", window.scrollY);

      if (window.scrollY >= window.innerHeight) {
        transformNavTimeline.current.play();
      } else {
        transformNavTimeline.current.reverse();
      }
    };

    // Initialiser l'animation
    transformNavTimeline.current.to('.m-nav', {
      transform: "translate3d(0px, 0%, 0px)",
    });

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useLayoutEffect(() => {
    if (!menuTimeline.current) {
      menuTimeline.current = gsap.timeline({ paused: true, reversed: true });

      menuTimeline.current
        .to(".m-nav", { duration: 0.25, borderBottomColor: "black" }, "start")
        .to(".m-nav__container", { duration: 0.25, backgroundColor: "#678846"}, "start")
        .to(".burger__toggleBtn span", { duration: 0.25, backgroundColor: "black" }, "start")
        .to(".m-nav__vertical-title", { duration: 0.25, color: "black" }, "start")

      menuTimeline.current
        .to(".m-nav__bg", { duration: 0.8, height: "100dvh", ease: "expo.inOut" }, "menu")
        .to(".m-nav__menu-name", { duration: 0.8, stagger: 0.04, transform: "translate3d(0px, 0%, 0px)" }, "menu+=0.4")
        .to(".m-nav__menu", { pointerEvents: "all" }, "menu+=0.4")
        .to(".m-nav__menu-noc", { duration: 0.8, stagger: 0.04, transform: "translate3d(0px, 0%, 0px)" }, "menu+=0.4")
        .to(".m-nav-menu__line", { duration: 0.5, width: "100%" }, "menu+=0.6")
        .to(".m-nav-menu__credits", { duration: 0.5, transform: "translate3d(0px, 0%, 0px"}, "menu+=0.6")
        .to(".m-nav-menu__compas", { duration: 0.5, transform: "translate3d(0px, 0%, 0px", opacity: 1}, "menu+=0.6");
    
    }

    const toggleAnimation = () => {
      if (toggleMenu) {
        document.body.classList.add("no-scroll");
      } else {
        document.body.classList.remove("no-scroll");
      }
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
  }, []);

  return (
    <nav className='m-nav'>
        <div className="m-nav__container">
            <div className="m-nav__vertical-title">
                PROUVE
            </div>
            <div className="m-nav__burger">
                <div className="burger">
                    <div className={toggleMenu ? "burger__toggleBtn open" : "burger__toggleBtn"} onClick={() => setToggleMenu(!toggleMenu)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
      </div>
      <div className="m-nav__menu">
        <div className="m-nav__bg"></div>
          <ul className="m-nav__menu-list">
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
          <div className="m-nav-menu__texte">
            <div className="m-nav-menu__line"></div>
            <div className="m-nav-menu__credits-w">
              <div className="m-nav-menu__credits">CREATED BY THOMAS ROUX</div>
            </div>
            <svg
              className="m-nav-menu__compas"
              version="1.1"
              width={100}
              height={100}
              viewBox="0 0 100 100"
              xmlSpace="preserve"
            >
              <g transform="matrix(1 0 0 1 50 49.5982277521)" id="S7yeTbLhdG6OASSq7MgZO">
                <path
                  style={{
                      stroke: "black",
                      strokeWidth: 1,
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeDashoffset: 0,
                      strokeLinejoin: "miter",
                      strokeMiterlimit: 4,
                      fill: "black",
                      opacity: 1
                  }}
                  transform=" translate(0.000005, 0.00001)"
                  d="M -35.28354 39.69287 L 2.413269999999997 -41.15178 L 35.28353 41.151759999999996 L 32.126689999999996 41.151759999999996 L 1.5082899999999952 -22.90141 L -31.523380000000003 39.69286 z"
                  strokeLinecap="round"
                />
              </g>
            </svg>
          </div>
      </div>
    </nav>
  )
}

export default NavMobile;