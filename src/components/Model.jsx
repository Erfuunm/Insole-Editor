import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useEffect, useState } from 'react'

export default function Model({ modelUrl }) {
  const [model, setModel] = useState(null)
  const [prevUrl, setPrevUrl] = useState(null)

  useEffect(() => {
    if (modelUrl && modelUrl !== prevUrl) {
      const loader = new GLTFLoader()
      loader.load(
        modelUrl,
        (gltf) => {
          setModel(gltf.scene)
          setPrevUrl(modelUrl)
        },
        undefined,
        (error) => console.error('Error loading model:', error)
      )
    }
  }, [modelUrl, prevUrl])

  return model ? <primitive object={model} /> : null
}