import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import shipScene from '/fantastic_castle.glb';
import * as THREE from 'three';

const Book = ({ isRotating, ...props }) => {
    const ref = useRef();
    const { scene, animations } = useGLTF(shipScene);
    const { actions } = useAnimations(animations, ref)

//     useEffect(() => {
//       actions['Take 001'].play();
//   }, [actions]);
  

    return (
        <mesh {...props} scale={[0.3, 0.3, 0.3]} position={[0.6, 0.83, 0]} rotation={[0, -1, -0.6]}>
            <primitive object={scene} ref={ref} />
        </mesh>
    );
};

export default Book;