import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import shipScene from '../assets/3d/pirate_ship.glb';

const Ship = ({ isRotating, ...props }) => {
    const ref = useRef();
    const { scene, animations } = useGLTF(shipScene);
    const { actions } = useAnimations(animations, ref)

    useEffect(() => {
      actions['Take 001'].play();
  }, [actions]);
  

    return (
        <mesh {...props} scale={[0.0004, 0.0004, 0.0004]} position={[0.1, -0.4, -1.02]} rotation={[-1.9, 3, -0.1]}>
            <primitive object={scene} ref={ref} />
        </mesh>
    );
};

export default Ship;