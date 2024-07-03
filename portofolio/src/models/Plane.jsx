import { React, useRef, useEffect, useState } from 'react'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

import planeScene from '../assets/3d/plane.glb'

const Plane = ({ isRotating, ...props }) => {

  const ref = useRef()
    const { scene, animations } = useGLTF(planeScene)
    const { actions } = useAnimations(animations, ref)

    useEffect(() => {
      if (isRotating) {
        actions['Take 001'].play()
      } else {
        actions['Take 001'].stop()
      }
    }, [actions, isRotating])

    
  return (
    <mesh {...props}>
        <primitive object={scene} ref={ref} />
    </mesh>
  )
}

export default Plane

