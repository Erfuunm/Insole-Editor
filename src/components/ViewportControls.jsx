import { FiMaximize, FiZoomIn, FiZoomOut } from 'react-icons/fi'

export default function ViewportControls({ onZoomIn, onZoomOut, onResetView }) {
  return (
    <div className="absolute right-4 bottom-4 flex flex-col gap-2 bg-dark-2 p-2 rounded-lg shadow-lg">
      <button 
        onClick={onZoomIn}
        className="p-2 hover:bg-dark rounded"
      >
        <FiZoomIn className="w-5 h-5" />
      </button>
      <button 
        onClick={onZoomOut}
        className="p-2 hover:bg-dark rounded"
      >
        <FiZoomOut className="w-5 h-5" />
      </button>
      <button 
        onClick={onResetView}
        className="p-2 hover:bg-dark rounded"
      >
        <FiMaximize className="w-5 h-5" />
      </button>
    </div>
  )
}