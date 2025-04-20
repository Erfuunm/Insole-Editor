import { useEffect } from 'react'
import ReactModal from 'react-modal'

ReactModal.setAppElement('#root')

export default function Modal({ isOpen, onClose, children }) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-dark border border-dark-2 rounded-lg p-6 max-w-md mx-auto mt-20"
      overlayClassName="fixed inset-0 bg-black/50 backdrop-blur-sm"
    >
      <div className="space-y-4">
        {children}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>
    </ReactModal>
  )
}