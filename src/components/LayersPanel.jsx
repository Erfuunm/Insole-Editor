import React, { useState } from 'react'
import { FaEye, FaEyeSlash, FaRegObjectGroup } from 'react-icons/fa'
import { HexColorPicker } from 'react-colorful'

export default function LayersPanel({ layers, onToggleLayer, onChangeRoofColor, onChangeBottomColor }) {
  const [showPicker, setShowPicker] = useState(null)

  const handleClosePicker = () => {
    setShowPicker(null); // Close the picker by setting the state to null
  }

  return (
    <div className="space-y-2">
      {layers.map(layer => (
        <div key={layer.id} className="flex items-center justify-between p-2 hover:bg-dark-2 rounded">
          <div className="flex items-center gap-2">
            <FaRegObjectGroup />
            {layer.name}
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onToggleLayer(layer.id)}
              className="text-gray-400 hover:text-white"
            >
              {layer.iseye ? (layer.visible ? <FaEye /> : <FaEyeSlash />) : null}
            </button>

            {/* Color Picker Trigger */}
            {layer.iscolor && (
              <>
                <button 
                  onClick={() => setShowPicker(showPicker === layer.id ? null : layer.id)} 
                  className="w-6 h-6 p-0 border-none bg-transparent cursor-pointer"
                  style={{ backgroundColor: layer.color || "#ffffff" }}
                />
                {/* Show the HexColorPicker when button is clicked */}
                {showPicker === layer.id && (
                  <div className="absolute z-10">
                    <div className="relative">
                      <HexColorPicker
                        color={layer.color || "#787878"}
                        onChange={(color) => layer.id=='roofpointscolor' ? onChangeRoofColor(color) : onChangeBottomColor(color)}
                      />
                      {/* Close button to hide the color picker */}
                      <button 
                        onClick={handleClosePicker} 
                        className="absolute -top-6 -right-4 text-white rounded-full p-1"
                      >
                        X
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
