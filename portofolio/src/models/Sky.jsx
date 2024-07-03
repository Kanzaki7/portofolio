import React, { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber'

// import skyScene from '../assets/3d/nightSky2.glb'
import skyScene from '../assets/3d/sky.glb'

// export function Sky(props) {
//   const group = useRef();
//   const { nodes, materials, animations } = useGLTF(skyScene);
//   const { actions } = useAnimations(animations, group);

//   return (
//     <group ref={group} {...props} dispose={null}>
//       <group name="Sketchfab_Scene">
//         <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
//           <group name="root">
//             <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>

//               <group name="Sphere_2" scale={-90.65}>
//                 <mesh
//                   name="Object_17"
//                   castShadow
//                   receiveShadow
//                   geometry={nodes.Object_17.geometry}
//                   material={materials['Material.001']}
//                 />
//                 <mesh
//                   name="Object_18"
//                   castShadow
//                   receiveShadow
//                   geometry={nodes.Object_18.geometry}
//                   material={materials['Material.001']}
//                 />
//               </group>
//               <group name="Sphere001_5" scale={39.458}>
//                 <mesh
//                   name="Object_20"
//                   castShadow
//                   receiveShadow
//                   geometry={nodes.Object_20.geometry}
//                   material={materials['Material.006']}
//                 />
//               </group>
//               <group name="Cube_6" position={[0, -1.037, 0]} scale={0.011}>
//                 <mesh
//                   name="Object_22"
//                   castShadow
//                   receiveShadow
//                   geometry={nodes.Object_22.geometry}
//                   material={materials['Material.007']}
//                 />
//               </group>
//               <group name="Cylinder_7" position={[0, 48.966, -6.491]} scale={0}>
//                 <mesh
//                   name="Object_24"
//                   castShadow
//                   receiveShadow
//                   geometry={nodes.Object_24.geometry}
//                   material={materials['Material.008']}
//                 />
//               </group>
//               <group name="Cylinder001_9" position={[22.32, 48.966, -6.545]} scale={0}>
//                 <mesh
//                   name="Object_26"
//                   castShadow
//                   receiveShadow
//                   geometry={nodes.Object_26.geometry}
//                   material={materials['Material.008']}
//                 />
//               </group>
//             </group>
//           </group>
//         </group>
//       </group>
//     </group>
//   );
// }

// useGLTF.preload(skyScene);

const Sky = ({ isRotating }) => {
  const sky = useGLTF(skyScene)
  const skyRef = useRef()

  useFrame((_, delta) => {
    if (isRotating) {
      skyRef.current.rotation.y += 0.15 * delta;
    } 
  });
  return (
    <mesh ref={skyRef}>
        <primitive object={sky.scene} />
    </mesh>
  )
} 

export default Sky;
