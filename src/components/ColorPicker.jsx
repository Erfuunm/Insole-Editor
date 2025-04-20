// components/ColorPicker.jsx
import { useState, useEffect } from 'react'
import { HexColorPicker } from 'react-colorful'

export default function ColorPicker({ label, color, onChange }) {
  const [showPicker, setShowPicker] = useState(false)
  const [currentColor, setCurrentColor] = useState(color)

  useEffect(() => {
    setCurrentColor(color)
  }, [color])

  const handleChange = (newColor) => {
    setCurrentColor(newColor)
    onChange(newColor)
  }

  return (
    <div className="relative">
      <div 
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setShowPicker(!showPicker)}
      >
        <div 
          className="w-5 h-5 rounded border border-gray-600"
          style={{ backgroundColor: currentColor }}
        />
        <span className="text-sm">{label}</span>
      </div>
      
      {showPicker && (
        <div className="absolute z-10 mt-2 left-0">
          <HexColorPicker color={currentColor} onChange={handleChange} />
          <div className="flex justify-between mt-2">
            <input
              type="text"
              value={currentColor}
              onChange={(e) => handleChange(e.target.value)}
              className="w-24 bg-dark-2 text-white text-sm px-2 py-1 rounded"
            />
            <button 
              onClick={() => setShowPicker(false)}
              className="text-white bg-primary px-2 py-1 rounded text-sm"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  )
}