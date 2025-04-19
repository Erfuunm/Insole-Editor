import { useState } from 'react'
import { updateRoofPoints, updateProfilePoints } from '../utils/api'

export function useModelLoader() {
  const [currentModel, setCurrentModel] = useState(null)
  
  const updateModel = async (boxes, boxType) => {
    try {
      const url = boxType === 'roof' 
        ? await updateRoofPoints(boxes)
        : await updateProfilePoints(boxes)
      
      if (!url) return

      const loader = new GLTFLoader()
      loader.load(url, (gltf) => {
        setCurrentModel(gltf.scene)
      })
    } catch (error) {
      console.error('Error updating model:', error)
    }
  }

  return { currentModel, updateModel }
}