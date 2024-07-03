import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import shipScene from '/the_house_of_the_dead_arcade_cabinet.glb';

const Pacman = ({ isRotating, ...props }) => {
    const ref = useRef();
    const { scene, animations } = useGLTF(shipScene);
    const { actions } = useAnimations(animations, ref)

    useEffect(() => {
      actions['Take 001'].play();
  }, [actions]);
  

    return (
        <mesh {...props} scale={[0.035, 0.035, 0.035]} position={[-0.15, 0.4, 0.89]} rotation={[1.1, 0, 0.1]}>
            <primitive object={scene} ref={ref} />
        </mesh>
    );
};

export default Pacman;