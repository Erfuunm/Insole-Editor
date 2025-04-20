import ColorPicker from './ColorPicker'

export default function ColorSettings({ colors = {}, onColorChange = () => {} }) {
  // Provide default colors if not specified
  const safeColors = {
    model: colors.model || '#888888',
    roofPoints: colors.roofPoints || '#3B82F6',
    bottomPoints: colors.bottomPoints || '#10B981'
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <ColorPicker
          label="Model Color"
          color={safeColors.model}
          onChange={(color) => onColorChange('model', color)}
        />
        <ColorPicker
          label="Roof Points"
          color={safeColors.roofPoints}
          onChange={(color) => onColorChange('roofPoints', color)}
        />
        <ColorPicker
          label="Bottom Points"
          color={safeColors.bottomPoints}
          onChange={(color) => onColorChange('bottomPoints', color)}
        />
      </div>
    </div>
  )
}