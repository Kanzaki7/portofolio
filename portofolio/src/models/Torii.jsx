import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import shipScene from '/japanese_diorama.glb';
import * as THREE from 'three';

const Torii = ({ isRotating, ...props }) => {
    const ref = useRef();
    const { scene, animations } = useGLTF(shipScene);
    const { actions } = useAnimations(animations, ref)

    useEffect(() => {
      actions['trunk.001| BLACK OUTLINE AND LANTERNSAction'].play();
  }, [actions]);
  

    return (
        <mesh {...props} scale={[0.08, 0.08, 0.08]} position={[-0.65, 0.71, -0.4]} rotation={[-0.5, 3, -0.5]}>
            <primitive object={scene} ref={ref} />
        </mesh>
    );
};

export default Torii;