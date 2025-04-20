import { FaMousePointer, FaArrowsAlt, FaExpandArrowsAlt, FaSync } from 'react-icons/fa'

export default function ToolsPanel({ selectedTool, onSelectTool }) {
  const tools = [
    { id: 'select', icon: <FaMousePointer />, label: 'Select' },
    { id: 'move', icon: <FaArrowsAlt />, label: 'Move' },
    { id: 'scale', icon: <FaExpandArrowsAlt />, label: 'Scale' },
    { id: 'rotate', icon: <FaSync />, label: 'Rotate' },
  ]

  return (
    <div className="grid grid-cols-2 gap-2">
      {tools.map(tool => (
        <button
          key={tool.id}
          onClick={() => onSelectTool(tool.id)}
          className={`p-2 rounded flex flex-col items-center justify-center gap-1
            ${selectedTool === tool.id ? 'bg-primary text-white' : 'hover:bg-dark-2'}`}
        >
          <span className="text-lg">{tool.icon}</span>
          <span className="text-xs">{tool.label}</span>
        </button>
      ))}
    </div>
  )
}