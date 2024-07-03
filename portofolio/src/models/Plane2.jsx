import { React, useRef, useEffect, useState } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import planeScene from '../assets/3d/plane.glb';

const Plane2 = ({ isRotating, ...props }) => {
  const ref = useRef();
  const { camera } = useThree();
  const { scene, animations } = useGLTF(planeScene);
  const { actions } = useAnimations(animations, ref);

  // Track initial rotation
  const initialRotation = useRef([0, 0, 0]);

  useEffect(() => {
    if (ref.current) {
      // Store initial rotation
      initialRotation.current = [ref.current.rotation.x, ref.current.rotation.y, ref.current.rotation.z];
    }
  }, []);

  useEffect(() => {
    if (isRotating) {
      actions['Take 001'].play();
    } else {
      actions['Take 001'].stop();
    }
  }, [actions, isRotating]);

  const [keyStates, setKeyStates] = useState({});
  const [movingForward, setMovingForward] = useState(false);
  const [movingBackward, setMovingBackward] = useState(false);

  const speed = 0.3; // Increased speed
  const turnSpeed = 0.02;

  const handleKeyDown = (event) => {
    setKeyStates((prevState) => ({ ...prevState, [event.key]: true }));
  };

  const handleKeyUp = (event) => {
    setKeyStates((prevState) => ({ ...prevState, [event.key]: false }));
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame(() => {
    if (ref.current) {
      // Update rotation only when moving forward or backward
      if (movingForward || movingBackward) {
        if (keyStates['ArrowLeft']) {
          ref.current.rotation.y += turnSpeed;
        }
        if (keyStates['ArrowRight']) {
          ref.current.rotation.y -= turnSpeed;
        }
      }

      // Calculate new position based on the initial rotation
      const moveDirection = keyStates['ArrowDown'] ? -1 : keyStates['ArrowUp'] ? 1 : 0;

      if (moveDirection !== 0) {
        const direction = new THREE.Vector3(0, 0, moveDirection); // Plane's local forward or backward direction
        direction.applyQuaternion(ref.current.quaternion); // Apply current orientation
        direction.multiplyScalar(speed);
        ref.current.position.add(direction);
        if (moveDirection === -1) {
          setMovingForward(true);
          setMovingBackward(false);
        } else {
          setMovingForward(false);
          setMovingBackward(true);
        }
      } else {
        setMovingForward(false);
        setMovingBackward(false);
      }

      // Update camera position and look at the plane
      const planePosition = ref.current.position;
      const cameraOffset = { x: 0, y: 2, z: -5 }; // Closer and higher view
      camera.position.set(
        planePosition.x + cameraOffset.x,
        planePosition.y + cameraOffset.y,
        planePosition.z + cameraOffset.z
      );
      camera.lookAt(planePosition);
    }
  });

  return (
    <mesh {...props}>
      <primitive ref={ref} object={scene} />
    </mesh>
  );
};

export default Plane2;