import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';
import shipScene from '/ufo.glb';


const Ufo = ({ isRotating, setCurrentStage, currentStage, setZoomedIn, zoomedIn, setZoomedSatellite, zoomedSatellite, ...props }) => {
    const ref = useRef();
    const { scene, animations } = useGLTF(shipScene);
    const { actions } = useAnimations(animations, ref)


    // Orbit parameters
    const orbitRadius = 97; // Distance from the planet
    const orbitSpeed = 0.05; // Speed of the orbit
    const orbitInclination = Math.PI / -4; // Inclination of the orbit (30 degrees)



    useEffect(() => {
        actions['Hovering'].play();
    }, [actions]);


    useFrame((state) => {

        // Get the elapsed time
        const elapsedTime = state.clock.getElapsedTime();
    
        // Calculate the new position
        const angle = elapsedTime * orbitSpeed;
        const x = orbitRadius * Math.cos(angle);
        const z = orbitRadius * Math.sin(angle);
        const y = orbitRadius * Math.sin(angle) * Math.sin(orbitInclination);

        ref.current.position.set(x, y, z);

        // Make the satellite always face the center of the orbit
        ref.current.lookAt(0, 0, 0);

    });
    

    return (
        <mesh {...props} scale={[0.2, 0.2, 0.2]} position={[0, 0, 3]}>
            <primitive object={scene} ref={ref} />
        </mesh>
    );
};

export default Ufo;