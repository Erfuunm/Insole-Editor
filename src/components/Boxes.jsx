import { useEffect } from 'react'
import { loadBottomBoxesFromXML, loadRoofBoxesFromJSON } from '../utils/pointLoader'

export default function Boxes({ boxes, setBoxes }) {
  useEffect(() => {
    const loadBoxes = async () => {
      const boxesArray = []
      await loadRoofBoxesFromJSON("./Resources/points0.json", boxesArray)
      await loadBottomBoxesFromXML("./Resources/Right_Insole_ManualProfilePoints.pnts", boxesArray)
      setBoxes(boxesArray.map(box => ({
        ...box,
        ref: { current: null } // Add ref for each box
      })))
    }
    
    loadBoxes()
  }, [setBoxes])

  return (
    <>
      {boxes.map((boxProps, index) => (
        <mesh
          key={index}
          position={boxProps.position}
          userData={{ boxType: boxProps.userData.boxType }}
          ref={el => boxProps.ref.current = el} // Attach ref
        >
          <boxGeometry args={[0.05, 0.05, 0.05]} />
          <meshBasicMaterial color={boxProps.userData.boxType === 'roof' ? 'blue' : 'limeGreen'} />
        </mesh>
      ))}
    </>
  )
}