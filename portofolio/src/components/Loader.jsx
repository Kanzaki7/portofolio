import { Html } from '@react-three/drei'
import React from 'react'

const Loader = () => {
  return (
    <Html>
      <div className='flex justify-center items-center'>
        <div className='animate-spin rounded-full h-20 w-20 border-2 border-opacity-20 border-blue-500 border-t-blue-500'>
            
        </div>
      </div>
    </Html>
  )
}

export default Loader
