import { React, Suspense, useState, useEffect } from 'react'
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


const Home = () => {
  const [isRotating, setIsRotating] = useState(false)
  const [currentStage, setCurrentStage] = useState(-1);
  const [zoomedIn, setZoomedIn] = useState(false); // State to track zoom effect
  const [zoomedSatellite, setZoomedSatellite] = useState(false); // State to track zoom effect
  const [zoomedAstro, setZoomedAstro] = useState(false); // State to track zoom effect
  const [mailSent, setMailSent] = useState("");
  

  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let screenRotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }

    return [screenScale, screenPosition, screenRotation]
  }

  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition]
  }

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
      } else {
        setZoomedIn(false); // Reset zoom effect when Enter key is released
        setMailSent("");
      }
    // }
  };


  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize()
  const [planeScale, planePosition] = adjustPlaneForScreenSize()
  return (
    <section className='w-full h-screen relative'>
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
          <Rocket isRotating={isRotating} planeScale={planeScale} planePosition={planePosition} rotation={[0, 9.5, 0]} />
          <Satellite isRotating={isRotating} planeScale={planeScale} planePosition={planePosition}  setCurrentStage={setCurrentStage} currentStage={currentStage} setZoomedIn={setZoomedIn} zoomedIn={zoomedIn} setZoomedSatellite={setZoomedSatellite} zoomedSatellite={zoomedSatellite} />
          <Astronaut isRotating={isRotating} planeScale={planeScale} planePosition={planePosition}  setCurrentStage={setCurrentStage} currentStage={currentStage} setZoomedIn={setZoomedIn} zoomedIn={zoomedIn} setZoomedAstro={setZoomedAstro} zoomedAstro={zoomedAstro} />
          <Ufo isRotating={isRotating} planeScale={planeScale} planePosition={planePosition}  setCurrentStage={setCurrentStage} currentStage={currentStage} setZoomedIn={setZoomedIn} zoomedIn={zoomedIn}  />
        </Suspense>
      </Canvas>
    </section>
  )
}

export default Home
