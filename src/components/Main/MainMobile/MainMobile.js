import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import gsap from "gsap";
import { MorphSVGPlugin } from '../../../gsap/MorphSVGPlugin.min.js';

//import css
import "./MainMobile.css"

//import assets
import s2image from "../../../assets/images/ProuvePortrait.jpeg";
import s3MarieDuhamel from "../../../assets/images/s3MarieDuhamel.jpg";
import s3VictorProuve from "../../../assets/images/s3VictorProuve.jpg";
import s3VictorProuve2 from "../../../assets/images/s3VictorProuve2.jpg";
import s5Atelier from "../../../assets/images/s5atelier.jpg";
import s6Atelier from "../../../assets/images/s6atelier.jpg";
import s7Collab from "../../../assets/images/s7Collab.jpg";
import s7CiteUniversitaire from "../../../assets/images/s7citeUniversitaire.jpg"
import s7MetalDoor from "../../../assets/images/s7metaldoor.jpg"
import s7maisondupeuple from "../../../assets/images/s7maisondupeuple.jpg";
import s8habitattropical from "../../../assets/images/s8HabitatTropical.jpg";
import s9bureauMaxeville from "../../../assets/images/s9BureauxdetudesMaxeville.jpg";
import s9maison10x12indoor from "../../../assets/images/s9maison10x12indoor.jpg";
import s10baraquemilitaire from "../../../assets/images/s10baraquemilitaire.jpg"
import s11maisondemontable from "../../../assets/images/s11maisondemountable6x6.jpg"
import s11maisondemontable2 from "../../../assets/images/s11maisondemountable6x62.jpg"
import s11maisondemontableplan from "../../../assets/images/s11maisondemountableplan.jpg"
import s12maison6x6 from "../../../assets/images/s12Maison6x6.jpg";
import s13academic from "../../../assets/images/s13academic.jpg";

gsap.registerPlugin(MorphSVGPlugin);



function MainMobile() {
    const section1 = useRef(null);
    const section3 = useRef(null);
    const section5 = useRef(null);
    const section7 = useRef(null);
    const section9 = useRef(null);
    const section11 = useRef(null);
    const section13 = useRef(null);

    const zoomOutEffectRefs = useRef([]);

    const CircleArrowTimeline = useRef();
    const [isShownArrow, setIsShownArrow] = useState(null);
    const svgWave = useRef(null);
    const svgArrow = useRef(null);

    const navTimelineWhite = useRef(gsap.timeline({ paused: true }));
    const navTimelineGreen = useRef(gsap.timeline({ paused: true }));
    const navTimelineBlack = useRef(gsap.timeline({ paused: true }));

    const onClickArrow = () => {
        gsap.to(window, {duration: 1, scrollTo: {y: window.innerHeight, autoKill: false}});
    };


    useLayoutEffect(() => {
        const offsetSection1 = section1.current.offsetTop;
        const offsetSection3 = section3.current.offsetTop;
        const offsetSection5 = section5.current.offsetTop;
        const offsetSection7 = section7.current.offsetTop;
        const offsetSection9 = section9.current.offsetTop;
        const offsetSection11 = section11.current.offsetTop;
        const offsetSection13 = section13.current.offsetTop ;

        const handleScroll = () => {
            const scrollY = window.pageYOffset + (window.innerWidth * 0.1813333);
      
            if (((scrollY >= offsetSection1 && scrollY <= offsetSection3) || (scrollY > offsetSection7 && scrollY < offsetSection9) || (scrollY > offsetSection11 && scrollY < offsetSection13)) && !navTimelineWhite.current.isActive()) {
                navTimelineWhite.current.invalidate().seek(0).play();
            }

            //timeline background green
            else if (((scrollY > offsetSection3 && scrollY < offsetSection5) || (scrollY > offsetSection13)) && !navTimelineGreen.current.isActive()) {
                navTimelineGreen.current.invalidate().seek(0).play();
            }

             //timeline background black
            else if (((scrollY > offsetSection5 && scrollY < offsetSection7 ) || (scrollY > offsetSection9 && scrollY < offsetSection11)) && !navTimelineBlack.current.isActive()){
                navTimelineBlack.current.invalidate().seek(0).play();
            }
          };

        let ctx = gsap.context(() => {
            navTimelineWhite.current
            .to(".m-nav", { duration: 0.25, backgroundColor: "white", borderColor: "black" }, "start")
            .to(".m-nav .burger__toggleBtn span", { duration: 0.25, backgroundColor: "black" }, "start")
            .to(".m-nav__burger", { duration: 0.25, borderBottomColor: "black" }, "start")
            .to(".m-nav__vertical-title", { duration: 0.25, color: "black" }, "start")
           

            navTimelineBlack.current
                .to(".m-nav", { duration: 0.25, backgroundColor: "black", borderColor: "white" }, "start")
                .to(".m-nav .burger__toggleBtn span", { duration: 0.25, backgroundColor: "white" }, "start")
                .to(".m-nav__burger", { duration: 0.25, borderBottomColor: "white" }, "start")
                .to(".m-nav__vertical-title", { duration: 0.25, color: "white" }, "start")
                
            
            navTimelineGreen.current
                .to(".m-nav", { duration: 0.25, backgroundColor: "#678846", borderColor: "black" }, "start")
                .to(".m-nav .burger__toggleBtn span", { duration: 0.25, backgroundColor: "black" }, "start")
                .to(".m-nav__burger", { duration: 0.25, borderBottomColor: "black" }, "start")
                .to(".m-nav__vertical-title", { duration: 0.25, color: "black" }, "start")

            zoomOutEffectRefs.current.forEach((container, index) => {

                const animation = gsap.fromTo(container, 
                    { 
                        scale: 1.1, 
                    },
                    {
                        scale: 1,
                        scrollTrigger: {
                            trigger: container,
                            start: "top bottom", // Ajustez ces valeurs pour vous assurer qu'elles correspondent à la position correcte
                            end: "50% 20%",
                            scrub: 1,
                        },
                        immediateRender: false, 
                    }
                );
            });
           
        });

       

        window.addEventListener('scroll', handleScroll);

        return () => {
            ctx.kill();
            window.removeEventListener('scroll', handleScroll);
        };
    })

    useEffect(() => {
        if (!CircleArrowTimeline.current) {
            const wavePath = MorphSVGPlugin.convertToPath(svgWave.current);
            const arrowPath = MorphSVGPlugin.convertToPath(svgArrow.current);

            CircleArrowTimeline.current = gsap.timeline({ paused: true, reversed: true });
            CircleArrowTimeline.current.to(wavePath, { duration: 0.3, morphSVG: arrowPath });
        }

        if (isShownArrow !== null) {
            if (isShownArrow) {
                CircleArrowTimeline.current.play();
            } else {
                CircleArrowTimeline.current.reverse();
            }
        }
    }, [isShownArrow]);

  return (
    <main className="m">
        <section className="m-hero">
            <div className="m-hero-title">PROUVE</div>
            <div className="m-hero-text">
            <div className='m-hero-text__container'>
                    <p className="m-hero-text__item">A glimpse into the life and</p>
                </div>
                <div className='m-hero-text__container'>
                    <p className="m-hero-text__item">creations of Jean Prouve,</p>
                </div>
                <div className='m-hero-text__container'>
                    <p className="m-hero-text__item">pioneers of the 20th century</p>
                </div>
                <span>BY THOMAS ROUX</span>
            </div>
            <div 
                className="m-hero-circleArrow" 
                onMouseEnter={() => setIsShownArrow(true)}
                onMouseLeave={() => setIsShownArrow(false)}
                onClick={onClickArrow}
            >
                <div className="m-hero-circleArrow__container">
                    <svg viewBox="0 0 130 60" fill="white">
                        <polygon ref={svgWave} points="4.6 6.8 3.4 8.3 3 9.5 3.2 10.7 3.9 11.8 5 12.5 6.3 12.7 7.2 12.5 8.2 11.9 9.6 10.4 11.4 9.3 13.5 8.5 15.7 8.2 18.2 8.4 20.8 9.1 23.6 10.6 26.6 13.1 30.2 17.5 33.2 22.4 36.7 29.1 39.2 34 41 37.6 43.4 41.9 46.5 46.7 49.1 50.1 52.1 53 54.7 54.9 57.3 56.2 59.9 57.1 63.2 57.7 66.3 57.8 68.8 57.5 71.7 56.7 74 55.7 78 53.1 81.3 49.8 83.9 46.4 86.3 42.7 88.9 38.2 91.3 33.5 93.2 29.8 94.8 26.6 95.6 25 97.2 22.1 99.2 18.8 101.6 15.4 104.6 12.2 108.2 9.7 112.2 8.4 116.3 7.9 122 8.7 119.9 6.1 117.8 4.4 115.7 3.2 113.3 2.9 110.9 3.3 108.5 3.9 105.4 5.4 103 6.8 101.1 8.6 99.3 10.5 97.8 12.3 95.6 14.9 99.2 18.8 100.9 16.4 102.6 14.3 104.1 12.7 106.7 10.7 108.8 9.5 111.7 8.5 113.5 8.2 115.5 8.3 117 8.6 118.4 9.2 120.2 10.3 121.7 11.7 122.8 12.5 124.1 12.7 125.2 12.4 126.2 11.7 126.8 10.7 127 9.5 126.5 8.2 124.9 6.4 122.7 4.7 120.7 3.6 119 2.9 117.5 2.5 116.2 2.3 114.9 2.2 113.7 2.2 112.2 2.3 110.2 2.6 108.6 3 107.3 3.4 106 4 104.3 5 102.5 6.3 100.4 7.9 98.2 10.2 95.6 13.6 99 16.7 100.4 14.7 101.5 13.4 103.4 11.7 104.5 10.7 105.5 9.8 106.8 9.2 108 8.4 109.8 7.6 111.4 7.3 113 7 114.7 6.8 117.1 6.7 119.4 6.9 122.7 6.4 118.6 3.8 114.7 2.2 111.3 2.4 107.5 3.4 103.9 5.2 100.7 7.5 97.7 10.7 94.6 14.8 91.8 19.6 89.3 24.3 87.3 28.4 84.8 33.4 82.4 37.8 80.2 41.5 77.6 45 74.9 47.9 72.6 49.6 70.4 50.8 68.2 51.5 66.1 51.8 63.7 51.7 61.6 51.3 59.6 50.6 57 49.1 54.8 47.2 52.6 44.8 50.7 42.1 48.1 37.9 45.4 32.9 43.3 28.7 41.3 24.8 37.3 17.3 33 11.1 28.5 6.6 26 4.9 23 3.5 20.5 2.7 17.9 2.3 16.5 2.2 14.8 2.2 13 2.5 11.2 2.9 9.3 3.7 7.6 4.5 5.9 5.7"></polygon>
                    </svg>
                    <svg viewBox="0 0 130 60" fill="white">
                        <polygon ref={svgArrow} points="0 24.8 0 26 0 26.8 0 27.7 0 28.6 0 29.6 0 30.8 2.1 30.8 4.2 30.8 8.1 30.8 12.3 30.8 14.6 30.8 16.9 30.8 19.3 30.8 21.8 30.8 25.4 30.8 28.8 30.8 32.6 30.8 36.5 30.8 38.6 30.8 41.6 30.8 45.7 30.8 49.4 30.8 51.6 30.8 53.5 30.8 55.3 30.8 56.9 30.8 58.8 30.8 61.3 30.8 63.7 30.8 66.7 30.8 68.5 30.8 71.2 30.8 73.2 30.8 76 30.8 79.2 30.8 82.6 30.8 84.7 30.8 87.1 30.8 90.2 30.8 93.4 30.8 95.8 30.8 98.5 30.8 101.8 30.8 103.4 30.8 106.2 30.8 109.8 30.8 111.8 30.8 114.2 30.8 116.7 30.8 118.5 30.8 116.7 32.6 114.9 34.4 113 36.3 111.3 38 109.4 39.9 107.6 41.7 106.1 43.2 104.5 44.8 102.9 46.4 101 48.3 99.6 49.6 98 51.3 102.2 55.5 104.2 53.6 106 51.8 107.4 50.4 108.6 49.2 110.1 47.7 111.7 46 113.5 44.3 115.6 42.2 117.3 40.5 118.9 38.9 120.3 37.5 121.7 36.1 123.1 34.7 124.5 33.3 126 31.8 127.2 30.5 128.6 29.2 130 27.8 128.3 26.1 126.9 24.7 125.2 22.9 123.8 21.6 122.5 20.3 121.2 19 119.9 17.7 118.5 16.3 116.9 14.7 115.4 13.1 113.7 11.5 112.3 10.1 110.9 8.7 109.4 7.2 108.1 5.9 106.7 4.4 105.3 3.1 103.9 1.7 102.2 0 98 4.2 99.4 5.7 100.6 6.9 102.1 8.4 103.7 10 105 11.2 106.2 12.5 107.9 14.1 108.9 15.1 110.3 16.5 111.9 18.2 113.8 20.1 115.6 21.9 117.1 23.4 118.5 24.8 116.7 24.8 114.5 24.8 112 24.8 109.3 24.8 106 24.8 103 24.8 99.6 24.8 96.8 24.8 94.4 24.8 91.9 24.8 89.4 24.8 87.5 24.8 85.2 24.8 83.2 24.8 79.6 24.8 75.9 24.8 72.3 24.8 70.6 24.8 68 24.8 65.9 24.8 63.7 24.8 62 24.8 59.9 24.8 57.5 24.8 55.9 24.8 54.1 24.8 52.4 24.8 50.6 24.8 48.3 24.8 44.1 24.8 41.3 24.8 37.9 24.8 33.1 24.8 30.1 24.8 26.6 24.8 23 24.8 19.7 24.8 17.1 24.8 14.7 24.8 13 24.8 11.3 24.8 8.7 24.8 6.4 24.8 4.2 24.8 1.8 24.8"></polygon></svg>
                </div>
            </div>
        </section>

        <section className="m-s1" ref={section1}>
            <div className="m-s1__no">1</div>
            <div className="m-s1-line"> </div>
            <div className="m-s1-title">Biography</div>
            <div className="texte-b"> Jean Prouve marked his era with his innovations and avant-garde vision of architecture and design. His functional, modular and aesthetically sober approach continues to inspire contemporary architects and designers, confirming his place among the great names of the 20th century.</div>
            <div className="cap">
                <div>BELOW</div>
                <div>'Jean Prouve in front of the front door of his house'</div>
                <div>Nancy, c. 1955.</div>
            </div>
        </section>

        <img className="m-s-image" src={s2image} />

        <section className="m-s3" ref={section3}>
            <p className='texte-b'>Jean Prouve was born on April 8, 1901 in Paris into a family deeply rooted in art and intellect. His father, Victor Prouve, was an emblematic figure of the Art Nouveau movement, both a painter, sculptor and president of the School of Nancy. This group of artists and architects, to which Victor was closely linked, advocated a harmonious integration of art and industry, strongly influencing young Jean. The family home, often frequented by renowned artists and intellectuals, constitutes a true hotbed of creativity.</p>
            <div className="cap">
                <div>BELOW</div>
                <div>'Jean Prouve in the arms of his mother Marie Duhamel'</div>
                <div>c. 1901.</div>
            </div>
            <div className="image-container">
                <img className="image" src={s3MarieDuhamel} ref={el => zoomOutEffectRefs.current[0] = el} />
            </div>
            <p className='texte'>In 1902, the Prouve family moved to Nancy, a dynamic center of Art Nouveau. Jean Prouve grew up in this environment rich in works of art and artisanal creations, nourished by the artistic influences of his parents. His mother, Marie Duhamel, a talented pianist, added a musical dimension to this setting already steeped in visual arts and intellectual discussions.From an early age, Jean observed the work of his father, Victor Prouve, an eminent artist and educator of the Art Nouveau movement, who transmitted to him a holistic vision of art. These experiences shape his aesthetic sense and practical approach, marrying engineering and design with a philosophy where aesthetics and functionality are inseparable. This intense artistic and intellectual education prepares Jean for a career marked by innovation and humanism.</p>
            <div className="cap">
                <div>BELOW</div>
                <div>'Jean Prouve on the shoulders of his father Victor Prouve'</div>
            </div>
            <div className="image-container">
                <img className="image" src={s3VictorProuve} ref={el => zoomOutEffectRefs.current[1] = el}/>
            </div>
            <p className="texte">The foundations of Jean Prouve's career were laid very early, in an atmosphere where art and innovation were omnipresent. Growing up in an artistic and intellectual family environment, he was immersed in a world where visual arts, music and architecture constantly coexisted. This immersion allowed him to develop a unique sensitivity which will mark all his future work.</p>
        </section>

        <img className="m-s-image" src={s3VictorProuve2} />

        <section className="m-s5" ref={section5}>
            <p className='texte-b'>Jean Prouve began his apprenticeship in ironwork in 1916 with Emile Robert in Enghien, where he acquired the basics of the trade. He continued his training with Adalbert Szabo in Paris, perfecting his skills in the traditional techniques of artistic metalwork. In 1921, he returned to Nancy and worked for the artistic ironworker Emile Brandt, where he refined his know-how and developed a personal style. These experiences allow him to master artisanal techniques while promoting innovation and quality in his work.</p>
            <div className="cap">
                <div>BELOW</div>
                <div>'Jean Prouvé at the workshop of Émile Robert'</div>
                <div>c. 1917.</div>
            </div>
            <div className='image-container'>
                <img className="image" src={s5Atelier} ref={el => zoomOutEffectRefs.current[2] = el}/>
            </div>
            <p className='texte'>In 1924, Jean Prouve opened his own ironwork workshop in Nancy. He began by creating wrought iron banisters, gates and doors, demonstrating his skill at transforming metal into functional works of art. He quickly became interested in the design of furniture and architectural elements in metal. His first creations, influenced by Art Nouveau, evolved towards a more modern aesthetic, characterized by simplicity, functionality and the use of new materials such as steel and aluminum. His works combine beauty and practicality, establishing his workshop as a place of innovation in metal design.</p>
        </section>

        <img className="m-s-image" src={s6Atelier} />
        <section className="m-s7" ref={section7}>
            <div className='image-container'>
                <img className="image" src={s7Collab} ref={el => zoomOutEffectRefs.current[3] = el}/>
            </div>
            <div className="cap">
                <div>ABOVE</div>
                <div>'Steph Simon, Martha Villiger, Jean Prouve and Charlotte Perriand'</div>
                <div>Paris, c. 1953.</div>
            </div>
            <p className='texte'>In the 1930s, Jean Prouve began to collaborate with major figures in architecture and design, including Le Corbusier, Charlotte Perriand and Pierre Jeanneret. These collaborations mark a particularly fruitful period of his career. Le Corbusier, famous for his revolutionary theories on urban planning and architecture, found in Prouve an ideal partner to materialize his avant-garde ideas. Charlotte Perriand, an influential designer, shares with Prouve a common vision of modernity, focused on functionality and refined aesthetics.</p>
            <p className='texte'>Together they work on various projects, exploring new approaches to design and construction. One of their emblematic projects is the interior equipment of the Cite Universitaire de Paris, where Prouve applies his skills in metallurgy to create functional and innovative furniture. These collaborations allow Prouve to immerse himself in a network of like-minded creators, which stimulates his creativity and inspires him to push the boundaries of his art. He draws inspiration from the modernist theories of his colleagues to develop architectural solutions and furniture that reflect the principles of simplicity, functionality and rationality.</p>
            <div className="cap">
                <div>BELOW</div>
                <div>'Reproduction of a student room from the 1950s in the Antony university campus'</div>
                <div>MAD Paris</div>
            </div>
            <div className='image-container'>
                <img className="image" src={s7CiteUniversitaire} ref={el => zoomOutEffectRefs.current[4] = el}/>
            </div>
            <p className='texte'>Alongside his collaborations, Jean Prouvé focuses on technical innovation, particularly in the field of modular construction. He developed manufacturing techniques using industrial materials such as aluminum and steel, pioneers at the time. One of its major innovations is the development of modular metal panels which make it possible to create light, strong and easily transportable structures. These panels can be assembled quickly on site, reducing construction time and costs.</p>
            <div className='image-container'>
                <img className="image" src={s7MetalDoor} ref={el => zoomOutEffectRefs.current[5] = el}/>
            </div>
            <div className="cap">
                <div>ABOVE</div>
                <div>“Chamberlain I Prouvé” exhibition at the Gagosian Gallery</div>
                <div>New York, c. 2015.</div>
            </div>
            <p className='texte'>These advances opened the way to prefabrication and the industrialization of construction, concepts which would become pillars of his work. Prouvé applies these techniques in various projects, such as the Maison du Peuple in Clichy and schools in Africa, demonstrating the effectiveness and flexibility of his methods. Prefabrication not only makes it possible to respond quickly to housing and infrastructure needs, but also to ensure consistent quality and savings in resources.</p>
            <div className='image-container'>
                <img className="image" src={s7maisondupeuple} ref={el => zoomOutEffectRefs.current[6] = el}/>
            </div>
            <div className="cap">
                <div>ABOVE</div>
                <div>'Maison du peuple (Jean Prouvé, with E. Beaudouin and M. Lods, arch., V. Bodiansky, ing.)'</div>
                <div>Clichy, 1935-1939.</div>
            </div>
            <p className='texte-b'>Prouve's innovations have greatly influenced construction, making it more accessible and sustainable, and aligned with current needs for speed, mobility, and functionality. He foresaw future developments in architecture, inspiring many generations of architects and designers. His modular construction techniques are now recognized as essential to the development of modern architecture, demonstrating his creative genius and vision.</p>
        </section>

        <img className="m-s-image" src={s8habitattropical} />

        <section className="m-s9" ref={section9}>
            <p className='texte'>In 1947, Jean Prouvé transferred his workshops to Maxéville, near Nancy. This place is quickly becoming a nerve center for innovation in metallurgy and architectural design. The workshops are distinguished by their ability to produce not only furniture, but also complex metal structures for architecture. Jean Prouvé develops metal facades, partitions, doors and windows, while continuing to create furniture that combines aesthetics and functionality.Prouvé’s approach is based on industrialization and prefabrication, using materials like steel and aluminum to create modular parts. This method makes it possible to standardize and streamline production, reducing costs and manufacturing times while ensuring high quality. Its innovations in modular construction open up new perspectives in the field of architecture, notably by facilitating the rapid and efficient construction of buildings.</p>
            <div className='image-container'>
                <img className="image" src={s9bureauMaxeville} ref={el => zoomOutEffectRefs.current[7] = el}/>
            </div>
            <div className="cap">
                <div>ABOVE</div>
                <div>'Design office of Ateliers Jean Prouvé'</div>
                <div>Maxéville, c. 1952.</div>
            </div>
            <p className='texte-b'>With the Second World War, the Ateliers Jean Prouvé adapted their production to military needs, manufacturing bicycles, components for aircraft and military equipment. This reconversion demonstrates the flexibility and innovation of the workshops. Despite material shortages, Jean Prouvé continues to experiment and perfect his construction techniques, maintaining his commitment to functional and accessible architecture. This period reinforces his pragmatic approach and humanist vision of architecture, highlighting his ability to adapt and innovate under pressure.</p>

            <div className="cap">
                <div>BELOW</div>
                <div>Prototype demountable house 10×12m, with its 2×12 m awning'</div>
                <div>c. 1948.</div>
            </div>
            <div className='image-container'>
                <img className="image" src={s9maison10x12indoor} ref={el => zoomOutEffectRefs.current[8] = el}/>
            </div>
            <p className='texte'>One of the most ambitious projects developed during this period was the model of a 10x12 meter demountable house, complete with a 2x12 meter awning, designed in 1948. This model was designed as a demonstration vehicle to demonstrate the merits of construction pre-made to a wider audience. The architecture of the house is based on the use of axial load-bearing porticos, which not only structure the space but also allow remarkable flexibility in the interior layout. The partitions and facade panels, whether glazed or solid, are designed to be interchangeable, allowing occupants to modify the layout according to their evolving needs.</p>
        </section>
        <img className="m-s-image" src={s10baraquemilitaire} />
        <section className="m-s11" ref={section11}>
            <div className='image-container'>
                <img className="image" src={s11maisondemontable} ref={el => zoomOutEffectRefs.current[9] = el}/>
            </div>
            <div className="cap">
                <div>ABOVE</div>
                <div>'Interior view of 6x6 demountable house'</div>
                <div>c. 1944.</div>
            </div>
            <p className='texte'>After the Second World War, Jean Prouve played a crucial role in the reconstruction of France. The country, ravaged by bombings and fighting, is in urgent need of housing and infrastructure. Prouve, with its innovative vision of modular construction and prefabrication, finds itself at the forefront of this reconstruction effort. In 1947, he designed Demountable Houses, modular structures designed to be quickly assembled on site. These houses, made of prefabricated metal panels, respond to urgent needs for temporary housing while offering durable and aesthetically pleasing solutions.</p>
            <p className='texte'>These projects mark a turning point in his career and allow him to demonstrate the effectiveness of his construction methods in crisis conditions. His pragmatic approach and attention to detail attract the attention of architects and urban planners internationally. He begins to receive orders not only from France, but also from other European countries and North America. Prouve's techniques, which combine speed of execution, low cost and structural quality, are seen as ideal solutions to the problems of rapid urbanization and housing shortages. His fame grew, and he became a central figure in the post-war reconstruction movement, working on international projects and collaborating with other renowned architects to export his technical innovations around the world.</p>
            <div className='image-container'>
                <img className="image" src={s11maisondemontable2} ref={el => zoomOutEffectRefs.current[10] = el}/>
            </div>
            <p className='texte'>True architectural performances that can be transported and dismantled, these “barracks” were made exclusively of wood and metal (taking into account the shortage of metal). They were directly transported in spare parts to the villages devastated by the bombings. They could be assembled in one day by 3 people on the very site of the destruction, thus allowing populations deprived of roofs to stay in their villages</p>
            <div className="cap">
                <div>BELOW</div>
                <div>'Construction methods, types of housing created by the Ateliers Jean Prouvé”. Advertising brochure for the Ateliers Jean Prouvé Studal'</div>
                <div>Paris, c. 1950.</div>
            </div>
            <div className='image-container'>   
                <img className="image" src={s11maisondemontableplan} ref={el => zoomOutEffectRefs.current[11] = el}/>
            </div>
            <p className='texte'>The expansion of its international influence does not stop with simple orders. Prouve actively participates in exhibitions and conferences across the globe, sharing his ideas on modularity and prefabrication. He is invited to collaborate on iconic projects, contributing to exhibition pavilions and public buildings that showcase his innovative construction techniques. This period of his career was marked by growing recognition of his creative genius, placing him among the most respected architects and designers of his time. Its innovations are not only technical, they are also philosophical, embodying a vision of architecture where each component is designed to maximize efficiency and beauty.</p>
        </section>
        <img className="m-s-image" src={s12maison6x6} />
        <section className="m-s13" ref={section13}>
            <p className='texte'>In 1957, Jean Prouvé was appointed professor at the National School of Decorative Arts (ENSAD) in Paris. This position allows him to pass on his vast experience and innovative ideas to a new generation of designers and architects. At ENSAD, Prouvé does not just teach construction techniques; he inspires his students to rethink architecture and design in terms of functionality, sustainability and social responsibility. It encourages a holistic approach, where aesthetics and technique are inseparable, and where each project must respond to real needs while being accessible and ethical.</p>
            <div className='image-container'>
                <img className="image" src={s13academic} ref={el => zoomOutEffectRefs.current[12] = el}/>
            </div>
            <div className="cap">
                <div>BELOW</div>
                <div>'Construction methods, types of housing created by the Ateliers Jean Prouvé”. Advertising brochure for the Ateliers Jean Prouvé Studal'</div>
                <div>Paris, c. 1950.</div>
            </div>
            <p className='texte'>His influence as a teacher is considerable. He trained several generations of creators who would carry his avant-garde ideas into their own work. Many of Prouvé's students would go on to become influential figures in the world of architecture and design, continuing his legacy. In recognition of his exceptional contributions to architecture and design, Prouvé received several prestigious honors. In 1981, he was honored with the Grand Prix National de l'Architecture, recognition of his lasting impact and pioneering role. His works are exhibited in world-renowned museums, and he is regularly invited to give lectures, actively participating in architectural competition juries and sharing his expertise within the international design community.</p>
        </section>
    </main>
  )
}

export default MainMobile