import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';
import shipScene from '/astronaut3.glb';


const Astronaut = ({ isRotating, setCurrentStage, currentStage, setZoomedIn, zoomedIn, setZoomedAstro, zoomedAstro, ...props }) => {
    const ref = useRef();
    const { scene, animations } = useGLTF(shipScene);
    const { actions } = useAnimations(animations, ref)


    // Orbit parameters
    const orbitRadius = 4; // Distance from the planet
    const orbitSpeed = 0.15; // Speed of the orbit
    const orbitInclination = Math.PI / 3; // Inclination of the orbit (30 degrees)

    useEffect(() => {
        actions['mixamo.com'].play();
    }, [actions]);


    useFrame((state) => {

        // console.log(ref.current.position.x);
        // console.log(ref.current.position.y);
        // console.log(ref.current.position.z);

        if (window.innerWidth <= 375) {
            if (ref.current.position.z >= -1 && ref.current.position.z <= 0) {
                if (zoomedIn == false || currentStage === 0) {
                    // console.log('Pointer over satellite');
                    setCurrentStage(5);
                }
            } else {
                console.log('Pointer out of satellite');
            }
        } else if (window.innerWidth <= 480) {
            if (ref.current.position.z >= -2.5 && ref.current.position.z <= 1.3) {
                if (zoomedIn == false || currentStage === 0) {
                    // console.log('Pointer over satellite');
                    setCurrentStage(5);
                }
            } else {
                // console.log('Pointer out of satellite');
            }
        } else if (window.innerWidth <= 768) {
            if (ref.current.position.z >= -1.7 && ref.current.position.z <= 1.6) {
                if (zoomedIn == false || currentStage === 0) {
                    // console.log('Pointer over satellite');
                    setCurrentStage(5);
                }
            } else {
                // console.log('Pointer out of satellite');
            }
        } else if (window.innerWidth <= 1024) {
            if (ref.current.position.z >= -3 && ref.current.position.z <= 0) {
                if (zoomedIn == false || currentStage === 0) {
                    // console.log('Pointer over satellite');
                    setCurrentStage(5);
                }
            } else {
                // console.log('Pointer out of satellite');
            }
        } else {
            if (ref.current.position.x >= -1 && ref.current.position.x <= 2 && ref.current.position.z >= -4 && ref.current.position.z <= -1) {
                if (zoomedIn == false || currentStage === 0) {
                    // console.log('Pointer over satellite');
                    setCurrentStage(5);
                }
            } else {
                // console.log('Pointer out of satellite');
            }
        }


        // Get the elapsed time
        const elapsedTime = state.clock.getElapsedTime();
    
         // Calculate the new position
        const angle = elapsedTime * orbitSpeed;
        const x = orbitRadius * Math.cos(angle);
        const z = orbitRadius * Math.sin(angle);
        const y = orbitRadius * Math.sin(angle) * Math.sin(orbitInclination);
    
        // Update the satellite's position
        if ((currentStage === 5) && (zoomedIn) && (zoomedAstro)) {
            ref.current.position.set(0, 0, 3);

            gsap.to(ref.current.rotation, {
                duration: 0.5,
                x: 0, // Adjust this to the desired rotation for stage 4
                y: -1,     // Adjust this to the desired rotation for stage 4
                z: 3,           // Adjust this to the desired rotation for stage 4
                ease: "sine.inOut",
            });
        } else {
            ref.current.position.set(x, y, z);

            gsap.to(ref.current.rotation, {
                duration: 0.5,
                x: x, // Adjust this to the desired rotation for stage 4
                y: y,     // Adjust this to the desired rotation for stage 4
                z: z,           // Adjust this to the desired rotation for stage 4
                ease: "sine.inOut",
            });
        }

        // Always face towards the camera (screen)
        ref.current.lookAt(state.camera.position);

        // Smooth rotation using GSAP
        gsap.to(ref.current.rotation, {
            duration: 0.5,
            y: state.camera.rotation.y, // Rotate towards the camera
            ease: "sine.inOut",
        });

    });
    

    return (
        <mesh {...props} scale={[0.27, 0.27, 0.27]} position={[-1, 0, 4]} rotation={[0, 1, 0]}>
            <primitive object={scene} ref={ref} />
        </mesh>
    );
};

export default Astronaut;