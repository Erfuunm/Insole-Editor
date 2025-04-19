import { useRef, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import { updateRoofPoints, updateProfilePoints } from '../utils/api'

export default function CustomDragControls({ boxes, setBoxes, setModelUrl, orbitControlsRef }) {
  const { camera, gl } = useThree()
  const controlsRef = useRef()

  useEffect(() => {
    if (boxes.length > 0 && !controlsRef.current) {
      const dragObjects = boxes.map(box => box.ref.current)
      
      const controls = new DragControls(dragObjects, camera, gl.domElement)
      controlsRef.current = controls
      
      controls.addEventListener('dragstart', () => {
        orbitControlsRef.current.enabled = false
      })

      controls.addEventListener('dragend', async (event) => {
        orbitControlsRef.current.enabled = true
        
        const movedBox = event.object
        const boxType = movedBox.userData.boxType

        // Get the most current boxes state
        const updatedBoxes = boxes.map(box => {
          if (box.ref.current === movedBox) {
            return {
              ...box,
              position: movedBox.position.toArray()
            }
          }
          return box
        })

        // Update state immediately
        setBoxes(updatedBoxes)

        try {
          const url = boxType === 'roof'
            ? await updateRoofPoints(updatedBoxes)
            : await updateProfilePoints(updatedBoxes)
          setModelUrl(url)
        } catch (error) {
          console.error('Error updating model:', error)
        }
      })

      return () => {
        controlsRef.current?.dispose()
        controlsRef.current = null
      }
    }
  }, [boxes, camera, gl, orbitControlsRef, setBoxes, setModelUrl])

  return null
}