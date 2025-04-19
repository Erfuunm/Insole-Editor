import { generateJSONFromRoofBoxes, generateXMLFromBoxes } from './pointLoader'

const apiURI = "http://localhost:7261"

export async function updateRoofPoints(boxes) {
  try {
    
    const response = await fetch(`${apiURI}/STL/return_glb_download_link`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: generateJSONFromRoofBoxes(boxes)
    })

    if (!response.ok) throw new Error(await response.text())
    return URL.createObjectURL(await response.blob())
  } catch (error) {
    console.error("Error updating roof points:", error)
    return null
  }
}

export async function updateProfilePoints(boxes) {
  try {
    const formdata = new FormData()
    formdata.append("file", new Blob([generateXMLFromBoxes(boxes)], { type: 'application/xml' }), "points.xml")

    const response = await fetch(`${apiURI}/STL/update_mpp`, {
      method: "POST",
      body: formdata
    })

    if (!response.ok) throw new Error(await response.text())
    return URL.createObjectURL(await response.blob())
  } catch (error) {
    console.error("Error updating profile points:", error)
    return null
  }
}