import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import shipScene from '/chocolate_frog.glb';
import * as THREE from 'three';

const Book = ({ isRotating, ...props }) => {
    const ref = useRef();
    const { scene, animations } = useGLTF(shipScene);
    const { actions } = useAnimations(animations, ref)

    useEffect(() => {
      actions['Intro'].play();
  }, [actions]);
  

    return (
        <mesh {...props} scale={[60, 60, 60]} position={[0.6, 0.84, 0]} rotation={[-1.5, -0.95, -1.5]}>
            <primitive object={scene} ref={ref} />
        </mesh>
    );
};

export default Book;