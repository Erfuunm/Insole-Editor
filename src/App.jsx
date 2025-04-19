import { useEffect, useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import SceneSetup from './components/SceneSetup'
import Boxes from './components/Boxes'
import Model from './components/Model'
import CustomDragControls from './components/DragControls'
import { updateRoofPoints } from './utils/api'

export default function App() {
  const [boxes, setBoxes] = useState([])
  const [modelUrl, setModelUrl] = useState(null)
  const orbitControlsRef = useRef()

  // Load initial model
  useEffect(() => {
    if (boxes.length > 0) {
      const loadInitialModel = async () => {
        try {
          const url = await updateRoofPoints(boxes)
          setModelUrl(url)
        } catch (error) {
          console.error('Error loading initial model:', error)
        }
      }
      loadInitialModel()
    }
  }, [boxes])

  return (
    <div className="w-screen h-screen">
      <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <SceneSetup>
          <Boxes boxes={boxes} setBoxes={setBoxes} />
          <Model modelUrl={modelUrl} />
          <CustomDragControls 
            boxes={boxes} 
            setBoxes={setBoxes}
            setModelUrl={setModelUrl}
            orbitControlsRef={orbitControlsRef}
          />
        </SceneSetup>
        <OrbitControls 
          ref={orbitControlsRef}
          enableDamping 
        />
      </Canvas>
    </div>
  )
}