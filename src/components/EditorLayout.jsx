import { FaCube, FaTools, FaLayerGroup, FaSave, FaUndo, FaRedo } from 'react-icons/fa'
import { FiDownload, FiUpload, FiSettings } from 'react-icons/fi'
import { TbGridDots } from 'react-icons/tb'

export default function EditorLayout({ children, tools, layers, onSave, onUndo, onRedo }) {
  return (
    <div className="h-screen w-screen flex bg-dark text-gray-100">
      {/* Left Sidebar */}
      <div className="w-64 flex flex-col border-r border-dark-2">
        <div className="p-4 border-b border-dark-2">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <FaCube className="text-primary" /> STL Editor
          </h1>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <Section title="Tools" icon={<FaTools />}>
            {tools}
          </Section>
          
          <Section title="Layers" icon={<FaLayerGroup />}>
            {layers}
          </Section>
        </div>
        
        <div className="p-4 border-t border-dark-2">
          <button 
            onClick={onSave}
            className="w-full bg-primary hover:bg-primary/80 text-white rounded-lg p-2 flex items-center gap-2 justify-center"
          >
            <FaSave /> Save Project
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="h-12 border-b border-dark-2 flex items-center px-4 gap-4">
          <FileMenu />
          <button className="hover:bg-dark-2 p-2 rounded">
            <FiDownload className="w-5 h-5" />
          </button>
          <button className="hover:bg-dark-2 p-2 rounded">
            <FiUpload className="w-5 h-5" />
          </button>
          
          <div className="flex-1" />
          
          <button onClick={onUndo} className="hover:bg-dark-2 p-2 rounded">
            <FaUndo className="w-5 h-5" />
          </button>
          <button onClick={onRedo} className="hover:bg-dark-2 p-2 rounded">
            <FaRedo className="w-5 h-5" />
          </button>
          
          <button className="hover:bg-dark-2 p-2 rounded">
            <TbGridDots className="w-5 h-5" />
          </button>
          <button className="hover:bg-dark-2 p-2 rounded">
            <FiSettings className="w-5 h-5" />
          </button>
        </div>

        {/* 3D Viewport */}
        <div className="flex-1 relative">
          {children}
        </div>

        {/* Bottom Status Bar */}
        <div className="h-8 border-t border-dark-2 px-4 flex items-center text-sm text-gray-400">
          <span>Ready</span>
          <div className="flex-1" />
          <span>X: 0.00 | Y: 0.00 | Z: 0.00</span>
        </div>
      </div>
    </div>
  )
}

function Section({ title, icon, children }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-gray-400 text-sm">
        {icon} {title}
      </div>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  )
}

function FileMenu() {
  return (
    <div className="relative group">
      <button className="hover:bg-dark-2 p-2 rounded flex items-center gap-2">
        File
      </button>
      <div className="hidden group-hover:block absolute top-full left-0 w-48 bg-dark border border-dark-2 rounded-lg p-2 shadow-lg">
        <button className="w-full text-left p-2 hover:bg-dark-2 rounded">
          New
        </button>
        <button className="w-full text-left p-2 hover:bg-dark-2 rounded">
          Open
        </button>
        <button className="w-full text-left p-2 hover:bg-dark-2 rounded">
          Export
        </button>
      </div>
    </div>
  )
}