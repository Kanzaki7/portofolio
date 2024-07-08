import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import shipScene from '/stylised_rocket.glb';

const Rocket = ({ isRotating, ...props }) => {
    const ref = useRef();
    const { scene, animations } = useLoader(GLTFLoader, shipScene);
    const { actions } = useAnimations(animations, ref)


    useEffect(() => {
      if (isRotating) {
        actions['Take 001'].play();
      } else {
        actions['Take 001'].stop();
      }
  }, [actions, isRotating]);

  useFrame((state) => {
    // const x = (state.mouse.x * window.innerWidth) / 2;
    // const y = (state.mouse.y * window.innerHeight) / 2;

    // ref.current.position.x = x / 50;
    // ref.current.position.y = -y / 50;

    // ref.current.rotation.z = Math.atan2(y, x) - Math.PI / 2;


  });


    return (
        <mesh {...props} scale={[0.01, 0.01, 0.01]} position={[0, 0, 3.5]} rotation={[0, 0, 6]}>
            <primitive object={scene} ref={ref} />
        </mesh>
    );
};

export default Rocket;