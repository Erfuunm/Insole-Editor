import { useState, useRef, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import EditorLayout from './components/EditorLayout'
import ToolsPanel from './components/ToolsPanel'
import LayersPanel from './components/LayersPanel'
import ViewportControls from './components/ViewportControls'
import Model from './components/Model'
import Boxes from './components/Boxes'
import CustomDragControls from './components/DragControls'

export default function App() {
  const [boxes, setBoxes] = useState([])
  const [roofColors, setRoofColors] = useState()
  const [bottomColors, setBottomColors] = useState()
  const [modelUrl, setModelUrl] = useState(null)
  const [selectedTool, setSelectedTool] = useState('select')
  const [layers] = useState([
    { id: 'model', name: '3D Model',iseye:true, visible: true },
    { id: 'points', name: 'Control Points',iseye:true, visible: true },
    { id: 'roofpointscolor', name: 'Roof Points Color', iscolor:true, visible: true },
    { id: 'bottompointscolor', name: 'Bottom Points Color', iscolor:true, visible: true },
  ])
  const orbitControlsRef = useRef()

  const handleSave = useCallback(() => {
    console.log('Project saved')
    // Implement actual save logic here
  }, [])

  const handleUndo = useCallback(() => {
    console.log('Undo action')
    // Implement undo logic here
  }, [])

  const handleRedo = useCallback(() => {
    console.log('Redo action')
    // Implement redo logic here
  }, [])

  const handleToggleLayer = useCallback((layerId) => {
    console.log(`Toggled layer ${layerId}`)
    // Implement layer visibility toggle here
  }, [])

  const handleZoomIn = useCallback(() => {
    if (orbitControlsRef.current) {
      orbitControlsRef.current.dollyOut(0.5)
    }
  }, [])

  const handleZoomOut = useCallback(() => {
    if (orbitControlsRef.current) {
      orbitControlsRef.current.dollyIn(0.5)
    }
  }, [])

  const handleResetView = useCallback(() => {
    if (orbitControlsRef.current) {
      orbitControlsRef.current.reset()
    }
  }, [])

  return (
    <EditorLayout
      tools={<ToolsPanel selectedTool={selectedTool} onSelectTool={setSelectedTool} />}
      layers={<LayersPanel layers={layers} onToggleLayer={handleToggleLayer} onChangeRoofColor={setRoofColors} onChangeBottomColor={setBottomColors} />}
      onSave={handleSave}
      onUndo={handleUndo}
      onRedo={handleRedo}
    >
      <Canvas 
        camera={{ position: [0, 0, 3], fov: 75 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <scene rotation-x={-Math.PI / 2}>
          <Boxes boxes={boxes} setBoxes={setBoxes} roofColors={roofColors} bottomColors={bottomColors} />
          <Model modelUrl={modelUrl} />
          <CustomDragControls 
            boxes={boxes} 
            setBoxes={setBoxes}
            setModelUrl={setModelUrl}
            orbitControlsRef={orbitControlsRef}
          />
        </scene>
        <OrbitControls 
          ref={orbitControlsRef}
          enableDamping
          dampingFactor={0.05}
          screenSpacePanning={false}
          minDistance={0.5}
          maxDistance={10}
        />
      </Canvas>
      
      <ViewportControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetView={handleResetView}
      />
    </EditorLayout>
  )
}