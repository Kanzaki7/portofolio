import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import shipScene from '/satellite_dish.glb';

const SatelliteDish = ({ isRotating, ...props }) => {
    const ref = useRef();
    const { scene, animations } = useGLTF(shipScene);
    const { actions } = useAnimations(animations, ref)

    useEffect(() => {
      actions['Master|MasterAction'].play();
  }, [actions]);
  

    return (
        <mesh {...props} scale={[0.01, 0.01, 0.01]} position={[-0.1, -1.02, -0]} rotation={[1.05, 1.5, 2.1]}>
            <primitive object={scene} ref={ref} />
        </mesh>
    );
};

export default SatelliteDish;