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
        <mesh {...props} scale={[0.01, 0.01, 0.01]} position={[-0.6, -0.4, -0.7]} rotation={[1.05, 0, 2.5]}>
            <primitive object={scene} ref={ref} />
        </mesh>
    );
};

export default SatelliteDish;