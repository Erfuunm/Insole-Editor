import { FaEye, FaEyeSlash, FaRegObjectGroup } from 'react-icons/fa'

export default function LayersPanel({ layers, onToggleLayer }) {
  return (
    <div className="space-y-2">
      {layers.map(layer => (
        <div key={layer.id} className="flex items-center justify-between p-2 hover:bg-dark-2 rounded">
          <div className="flex items-center gap-2">
            <FaRegObjectGroup />
            {layer.name}
          </div>
          <button 
            onClick={() => onToggleLayer(layer.id)}
            className="text-gray-400 hover:text-white"
          >
            {layer.visible ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
      ))}
    </div>
  )
}