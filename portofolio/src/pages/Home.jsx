import { React, Suspense, useState, useEffect, useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import './home.css'
import Loader from '../components/Loader'
import HomeInfo from '../components/HomeInfo'
import Message from '../components/Message'
import AlertMail from '../components/AlertMail'


import Planet from '../models/Planet'
import Rocket from '../models/Rocket'
import Satellite from '../models/Satellite'
import Astronaut from '../models/Astronaut'
import Ufo from '../models/Ufo'

import space from "../assets/space.mp3";

const Home = () => {
  const [isRotating, setIsRotating] = useState(false)
  const [currentStage, setCurrentStage] = useState(-1);
  const [zoomedIn, setZoomedIn] = useState(false); // State to track zoom effect
  const [zoomedSatellite, setZoomedSatellite] = useState(false); // State to track zoom effect
  const [zoomedAstro, setZoomedAstro] = useState(false); // State to track zoom effect
  const [mailSent, setMailSent] = useState("");
  // const [rocketShouldMove, setRocketShouldMove] = useState(true);
  const [isPlayingMusic, setIsPlayingMusic] = useState(true);

  const audioRef = useRef(new Audio(space));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;

  useEffect(() => {
    if (isPlayingMusic) {
      audioRef.current.play();
    }
    return () => {
      audioRef.current.pause();
    };
  }, [isPlayingMusic]);

  const adjustIslandForScreenSize = () => {
    let screenScale, screenPosition, screenRotation;
  
    if (window.innerWidth <= 375) {
      console.log("375");
      screenScale = [0.5, 0.5, 0.5];
      screenPosition = [0, -4, -43];
      screenRotation = [0.1, 4.7, 0];
    } else if (window.innerWidth <= 480) {
      screenScale = [0.55, 0.55, 0.55];
      screenPosition = [0, -4.2, -43];
      screenRotation = [0.1, 4.7, 0];
    } else if (window.innerWidth <= 768) {
      screenScale = [0.75, 0.75, 0.75];
      screenPosition = [0, -5.5, -43];
      screenRotation = [0.1, 4.7, 0];
    } else if (window.innerWidth <= 1024) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [0, -6, -43];
      screenRotation = [0.1, 4.7, 0];
    } else {
      screenScale = [1, 1, 1];
      screenPosition = [0, -6.5, -43];
      screenRotation = [0.1, 4.7, 0];
    }
  
    return [screenScale, screenPosition, screenRotation];
  };
  
  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPosition;
  
    if (window.innerWidth <= 375) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [0, -0.4, 0];
    } else if (window.innerWidth <= 480) {
      screenScale = [1, 1, 1];
      screenPosition = [0, -0.5, 0];
    } else if (window.innerWidth <= 768) {
      screenScale = [1.3, 1.3, 1.3];
      screenPosition = [0, -1, 0];
    } else if (window.innerWidth <= 1024) {
      screenScale = [1.8, 1.8, 1.8];
      screenPosition = [0, -2, -2];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }
  
    return [screenScale, screenPosition];
  };


  useEffect(() => {
    let timer = setTimeout(() => {
      setCurrentStage(0);
    }, 4000);
    clearTimeout(timer);
  }, [currentStage])

  const handleKeyUp = () => {
    // if (event.code === 'Enter') {
      if (currentStage === 5) {
        setZoomedIn(false); // Reset zoom effect when Enter key is released
        setZoomedAstro(false);
        setMailSent("");
        // setRocketShouldMove(true);
      } else {
        setZoomedIn(false); // Reset zoom effect when Enter key is released
        setMailSent("");
        // setRocketShouldMove(true);
      }
    // }
  };

  const clickEnter = (event) => {
      setZoomedIn(true);
      if (currentStage === 5) {
        setZoomedAstro(true);
      }
  };


  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize()
  const [planeScale, planePosition] = adjustPlaneForScreenSize()
  return (
    <section className='w-full h-screen relative overflow-y-hidden overflow-x-hidden'>
      {zoomedIn &&
        <div className='futureCard'>
          <HomeInfo handleKeyUp={handleKeyUp} currentStage={currentStage} setMailSent={setMailSent} mailSent={mailSent} />
        </div>
      }
      {zoomedIn == false &&
        <div className='windowVideo'>
          <Message currentStage={currentStage} />
        </div>
      }
      {(zoomedIn == true && mailSent !== "" ) ?
        <div className='windowVideo'>
          <AlertMail setMailSent={setMailSent} mailSent={mailSent} />
        </div>
        : null
      }
      <Canvas className={`w-full h-full bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`} camera={{ near: 0.1, far: 1000 }}>
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1}/>

          
          <Planet scale={islandScale} position={islandPosition} rotation={islandRotation} isRotating={isRotating} setIsRotating={setIsRotating} setCurrentStage={setCurrentStage} currentStage={currentStage} setZoomedIn={setZoomedIn} zoomedIn={zoomedIn} setZoomedSatellite={setZoomedSatellite} zoomedSatellite={zoomedSatellite} setZoomedAstro={setZoomedAstro} zoomedAstro={zoomedAstro} />
          <Rocket isRotating={isRotating} planeScale={planeScale} planePosition={planePosition} rotation={[0, 9.5, 0]} setZoomedIn={setZoomedIn} zoomedIn={zoomedIn} currentStage={currentStage} setZoomedAstro={setZoomedAstro} />
          <Satellite isRotating={isRotating} planeScale={planeScale} planePosition={planePosition}  setCurrentStage={setCurrentStage} currentStage={currentStage} setZoomedIn={setZoomedIn} zoomedIn={zoomedIn} setZoomedSatellite={setZoomedSatellite} zoomedSatellite={zoomedSatellite} />
          <Astronaut isRotating={isRotating} planeScale={planeScale} planePosition={planePosition}  setCurrentStage={setCurrentStage} currentStage={currentStage} setZoomedIn={setZoomedIn} zoomedIn={zoomedIn} setZoomedAstro={setZoomedAstro} zoomedAstro={zoomedAstro} />
          <Ufo isRotating={isRotating} planeScale={planeScale} planePosition={planePosition}  setCurrentStage={setCurrentStage} currentStage={currentStage} setZoomedIn={setZoomedIn} zoomedIn={zoomedIn}  />
        </Suspense>
      </Canvas>
      <div className='absolute bottom-2 left-2'>
        <div className="boxContainer" onClick={() => setIsPlayingMusic(!isPlayingMusic)}>
          <div className={isPlayingMusic ? "boxOn box1" : "boxOff box1"}></div>
          <div className={isPlayingMusic ? "boxOn box2" : "boxOff box2"}></div>
          <div className={isPlayingMusic ? "boxOn box3" : "boxOff box3"}></div>
          <div className={isPlayingMusic ? "boxOn box4" : "boxOff box4"}></div>
          <div className={isPlayingMusic ? "boxOn box5" : "boxOff box5"}></div>
          <div className={isPlayingMusic ? "boxOn box6" : "boxOff box6"}></div>
          <div className={isPlayingMusic ? "boxOn box7" : "boxOff box7"}></div>
        </div>
      </div>
      {(((currentStage !== 0  && currentStage !== -1) && zoomedIn == false) && window.innerWidth <= 1024) &&
        <div className='absolute bottom-14 right-2'>
        <div className="text-bottomClick">
          <button className="clickEnter" onClick={clickEnter}>
              ENTER<span className="click-borderEnter"></span>
          </button>
        </div>
      </div>
      }
    </section>
  )
}

export default Home
