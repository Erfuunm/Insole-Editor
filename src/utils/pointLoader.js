export async function loadBottomBoxesFromXML(xmlUrl, boxesArray) {
    const res = await fetch(xmlUrl)
    const xmlStr = await res.text()
  
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xmlStr, "application/xml")
    const points = xmlDoc.getElementsByTagName("Point3D")
  
    for (let i = 0; i < points.length; i++) {
      const x = parseFloat(points[i].getElementsByTagName("X")[0].textContent) / 100
      const y = parseFloat(points[i].getElementsByTagName("Y")[0].textContent) / 100
      const z = parseFloat(points[i].getElementsByTagName("Z")[0].textContent) / 100
  
      boxesArray.push({
        position: [x, y, z],
        userData: { boxType: "bottom" }
      })
    }
  }
  
  export async function loadRoofBoxesFromJSON(jsonUrl, boxesArray) {
    const res = await fetch(jsonUrl)
    const jsonStr = await res.json()
    
    jsonStr.points.forEach((point) => {
      boxesArray.push({
        position: [point.X / 100, point.Y / 100, point.Z / 100],
        userData: { boxType: "roof" }
      })
    })
  }
  
  export function generateJSONFromRoofBoxes(boxes) {
    const data = { side: "right", points: [] }
    boxes.forEach(box => {
      if (box.userData.boxType === "roof") {
        const [x, y, z] = box.position
        data.points.push({ 
          X: x * 100, 
          Y: y * 100, 
          Z: z * 100 
        })
      }
    })
    return JSON.stringify(data)
  }
  
  export function generateXMLFromBoxes(boxes) {
    const xmlHeader = `<?xml version="1.0"?>\n`
    const rootStart = `<XMLListPoint xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\n  <points>\n`
    const rootEnd = `  </points>\n</XMLListPoint>`
  
    let pointsXML = ""
    boxes.forEach((box) => {
      if (box.userData.boxType === "bottom") {
        const [x, y, z] = box.position.map(v => v * 100)
        pointsXML += `    <Point3D>\n      <X>${x}</X>\n      <Y>${y}</Y>\n      <Z>${z}</Z>\n    </Point3D>\n`
      }
    })
    return xmlHeader + rootStart + pointsXML + rootEnd
  }