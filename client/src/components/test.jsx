import React, { useEffect, useState } from 'react';
import Media from "/Multi-Media.png";
import Files from "/File-Retrival.png";
import Scrolling from "/Scrolling.mp4";
import arrow from "/arrow.png";
import cArrow from "/circular-arrow.png";
import crArrow from "/circular-arrow-rev.png";
import { motion } from "framer-motion";

import "../styles/homeStyle.css";

const generateCirclePath = (cx, cy, r) => {
    const coords = [];
    for (let angle = 0; angle <= 360; angle++) {
        const rad = (angle * Math.PI) / 180;
        const x = cx + r * Math.cos(rad);
        const y = cy + r * Math.sin(rad);

        const rotation = angle + 90;

        coords.push({ x, y, rotation });
    }
    return coords;
};

const HomePage = () => {
    const [path, setPath] = useState([]);
    const [revPath, setRevPath] = useState([]);

    useEffect(() => {

        const circlePath = generateCirclePath(-165, 139, 154);
        setPath(circlePath);
        setRevPath(circlePath.slice().reverse());
    }, []);

    const rotateArray = (arr, count) => {
  const n = count % arr.length;
  return [...arr.slice(n), ...arr.slice(0, n)];
};


    

    return (
        <>
            <div className='hero-section'>
                <h1 className='title'>Seamless Access with privacy</h1>
                <p className='subTitle'>Giving you access to every multimedia, anytime, anywhere.</p>
            </div>

            <div className='animation-Container'>
                <div className='first-section'>
                    <img src={Media} alt="Multi-Media" className='media' />
                </div>

                <div className="main-dotted-line"></div>

                {/* <div className='dotted-line-1'></div> */}
                <motion.img
                        className='connect-arrow'
                        src={arrow}
                        alt="arrow"
                        initial={{ x: -590, y: 60}}
                        animate={{
                            x: [-500, -400, -300, -285, -280, -260, -240, -220, -200, -170],
                            y: [60, 90, 130, 145, 146, 146, 146, 146, 146, 146],
                            rotate: [0, 20, 40, 30, 20, 10, 0, 0, 0, 0]
                        }}
                        transition={{
                            duration: 6,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                    />
                <svg className='dotted-line-1' width="800" height="200" viewBox="-300 -300 600 600">
                    <path
                        className='dotted-line-1' 
                        d="M -60 23 Q 500 0, 960 341" 
                        stroke="blue" 
                        fill="transparent" 
                        strokeWidth="5" 
                        stroke-dasharray="5,6" 
                    />
                </svg>
                
                <motion.img
                        className='connect-arrow'
                        src={arrow}
                        alt="arrow"
                        initial={{ x: -500, y: 150}}
                        animate={{
                            x: [-500, -400, -300, -285, -280, -260, -240, -220, -200, -170],
                            y: [146, 146, 146, 146, 146, 146, 146, 146, 146, 146],
                        }}
                        transition={{
                            duration: 7,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                />
                <svg className='dotted-line-2' width="600" height="200" viewBox="-300 -300 600 600">
                    <path
                        className='dotted-line-2' 
                        d="M 0 0 Q 0 0, 710 0" 
                        stroke="blue" 
                        fill="transparent" 
                        strokeWidth="5" 
                        stroke-dasharray="4,6" 
                    />
                </svg>
                
                <motion.img
                        className='connect-arrow'
                        src={arrow}
                        alt="arrow"
                        initial={{ x: -544, y: 225}}
                        animate={{
                            x: [-544, -400, -300, -285, -280, -260, -240, -220, -200, -170],
                            y: [225, 215, 163, 146, 146, 146, 146, 146, 146, 146],
                            rotate: [0, -15, -20, -26, 0, 0, 0, 0, 0]
                        }}
                        transition={{
                            duration: 8,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                />
                <svg className='dotted-line-3' width="800" height="200" viewBox="-300 -300 600 600">
                    <path
                        className='dotted-line-3' 
                        d="M 350 -520 Q 0 0, -670 -70" 
                        stroke="blue" 
                        fill="transparent" 
                        strokeWidth="5" 
                        stroke-dasharray="5,6" 
                    />
                </svg>

                <div className='connect-line'></div>

                <div className='second-section'>
                    <div>
                        <img src={Files} alt="File Retrieval" className='files' />
                        
                        {path.length > 0 && (
                            <motion.img
                                className='circular-arrow'
                                src={cArrow}
                                alt="arrow"
                                initial={{
                                    x: path[0].x,
                                    y: path[0].y,
                                    rotate: path[0].rotation,
                                }}
                                animate={{
                                    x: path.map(p => p.x),
                                    y: path.map(p => p.y),
                                    rotate: path.map(p => p.rotation),
                                }}
                                transition={{
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "easeOut",
                                    repeatDelay: 0.07,
                                    repeatType: "loop"
                                }}
                            />
                        )}

                        {path.length > 0 && (
                            <motion.img
                                className='circular-arrow'
                                src={cArrow}
                                alt="arrow"
                                initial={{
                                    x: path[Math.floor(path.length / 2)].x,
                                    y: path[Math.floor(path.length / 2)].y,
                                    rotate: path[Math.floor(path.length / 2)].rotation,
                                }}
                                animate={{
                                    x: rotateArray(path, Math.floor(path.length / 2)).map(p => p.x),
                                    y: rotateArray(path, Math.floor(path.length / 2)).map(p => p.y),
                                    rotate: rotateArray(path, Math.floor(path.length / 2)).map(p => p.rotation),
                                }}
                                transition={{
                                    duration: 8,
                                    ease: "easeOut",
                                    repeatDelay: 0.07,
                                    repeat: Infinity,
                                }}
                            />
                        )}
                    
                    </div>
                </div>

                <div className="line"></div>

                <div className='third-section'>
                    <video className='animation' autoPlay loop muted playsInline>
                        <source src={Scrolling} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    <motion.img
                        className='second-to-third'
                        src={arrow}
                        alt="arrow"
                        initial={{ x: -540, y: -193 }}
                        animate={{ x: -220 }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            repeatType: "loop"
                        }}
                    />
                </div>
            </div>

            <div className='desc-Container'>
                <div className='box-1'>
                    <h2>Multi-Source Intergration</h2>
                    <p>Connect and integrate data from various applications and sources seamlessly.</p>
                </div>
                <div className='box-2'>
                    <h2>Smart Processing</h2>
                    <p>Advanced processing and analysis of your multimedia and data files.</p>
                </div>
                <div className='box-3'>
                    <h2>Information Access</h2>
                    <p>Access your processed information anytime, anywhere on your mobile device.</p>
                </div>
            </div>
        </>
    );
};

export default HomePage;