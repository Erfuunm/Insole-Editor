import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'

export default function SceneSetup({ children }) {
  const { scene } = useThree()
  
  useEffect(() => {
    scene.rotation.x = -Math.PI / 2
  }, [scene])

  return <>{children}</>
}