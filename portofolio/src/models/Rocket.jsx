import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import shipScene from '../assets/3d/rocket.glb';

const Rocket = ({ isRotating, ...props }) => {
    const ref = useRef();
    const { scene } = useGLTF(shipScene);

    useEffect(() => {
      // Optional: Adjust rocket orientation or initial setup here
  }, []);

  useFrame(({ mouse }) => {
    const x = (mouse.x * window.innerWidth) / 2;
    const y = (mouse.y * window.innerHeight) / 2;

    ref.current.position.x = x / 50;
    ref.current.position.y = -y / 50;

    ref.current.rotation.z = Math.atan2(y, x) - Math.PI / 2;
  });

    return (
        <mesh {...props} scale={[0.02, 0.02, 0.02]} position={[0, 0, 3.5]} rotation={[0, 0, 0]}>
            <primitive object={scene} ref={ref} />
        </mesh>
    );
};

export default Rocket;