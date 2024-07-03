import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';
import shipScene from '/satellite.glb';


const Satellite = ({ isRotating, setCurrentStage, currentStage, setZoomedIn, zoomedIn, setZoomedSatellite, zoomedSatellite, ...props }) => {
    const ref = useRef();
    const { scene, animations } = useGLTF(shipScene);
    const { actions } = useAnimations(animations, ref)


    // Orbit parameters
    const orbitRadius = 80; // Distance from the planet
    const orbitSpeed = 0.1; // Speed of the orbit
    const orbitInclination = Math.PI / 6; // Inclination of the orbit (30 degrees)



    useEffect(() => {
        actions['Animation'].play();
    }, [actions]);


    useFrame((state) => {

        // document.addEventListener('click', zoomSatellite);
        // document.addEventListener('blur', dezoomSatellite);

        // console.log(ref.current.position.x);
        // if (ref.current.position.z >= 45 && ref.current.position.z <= 50) {
        //     console.log('Pointer over satellite');
        //     setCurrentStage(4);
        //     // setZoomedIn(true);
        //     setZoomedSatellite(true);
        // } else {
        //     console.log('Pointer out of satellite');
        //     setCurrentStage(0);
        //     // setZoomedIn(false);
        //     setZoomedSatellite(false);
        // }

        // Get the elapsed time
        const elapsedTime = state.clock.getElapsedTime();
    
        // Calculate the new position
        const angle = elapsedTime * orbitSpeed;
        const x = orbitRadius * Math.cos(angle);
        const z = orbitRadius * Math.sin(angle);
        const y = orbitRadius * Math.sin(angle) * Math.sin(orbitInclination);
    
        // Update the satellite's position
        // if ((currentStage === 4) && (zoomedIn) && (zoomedSatellite)) {
        //     ref.current.position.set(0, 5, 50);

        //     gsap.to(ref.current.rotation, {
        //         duration: 0.5,
        //         x: 0, // Adjust this to the desired rotation for stage 4
        //         y: -1,     // Adjust this to the desired rotation for stage 4
        //         z: 50,           // Adjust this to the desired rotation for stage 4
        //         ease: "power2.inOut",
        //     });
        // } else {
        //     ref.current.position.set(x, y, z);

        //     gsap.to(ref.current.rotation, {
        //         duration: 0.5,
        //         x: x, // Adjust this to the desired rotation for stage 4
        //         y: y,     // Adjust this to the desired rotation for stage 4
        //         z: z,           // Adjust this to the desired rotation for stage 4
        //         ease: "power2.inOut",
        //     });
        // }

        ref.current.position.set(x, y, z);

        // Make the satellite always face the center of the orbit
        ref.current.lookAt(0, 0, 0);


        // return () => {
        //     document.removeEventListener('click', zoomSatellite);
        //     document.removeEventListener('blur', dezoomSatellite);
        // };
    });
    

    return (
        <mesh {...props} scale={[0.08, 0.08, 0.08]}>
            <primitive object={scene} ref={ref} />
        </mesh>
    );
};

export default Satellite;