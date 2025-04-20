import { useState } from 'react'

export default function SettingsPanel({ settings, onSettingsChange }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label>Grid Visibility</label>
        <input
          type="checkbox"
          checked={settings.showGrid}
          onChange={(e) => onSettingsChange({ ...settings, showGrid: e.target.checked })}
          className="toggle bg-dark-2 checked:bg-primary"
        />
      </div>
      <div className="flex items-center justify-between">
        <label>Snap to Grid</label>
        <input
          type="checkbox"
          checked={settings.snapToGrid}
          onChange={(e) => onSettingsChange({ ...settings, snapToGrid: e.target.checked })}
          className="toggle bg-dark-2 checked:bg-primary"
        />
      </div>
      <div className="flex items-center justify-between">
        <label>Grid Size</label>
        <input
          type="number"
          value={settings.gridSize}
          onChange={(e) => onSettingsChange({ ...settings, gridSize: e.target.value })}
          className="w-20 bg-dark-2 rounded px-2 py-1 text-right"
        />
      </div>
    </div>
  )
}