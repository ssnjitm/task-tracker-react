import React, { useEffect } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnOverlayClick?: boolean
  showCloseButton?: boolean
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  size = 'md',
  closeOnOverlayClick = true,
  showCloseButton = true,
  children,
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4',
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity backdrop-blur-sm"
        onClick={handleOverlayClick}
        aria-hidden="true"
      />
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className={`
            relative w-full
            ${sizeClasses[size]}
            transform rounded-2xl bg-white shadow-2xl
            transition-all duration-300 ease-out
            ${isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'}
          `}
        >
          {(title || showCloseButton) && (
            <div className="px-6 pt-6 pb-4 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {title && (
                    <h3 className="text-lg font-bold text-gray-900">
                      {title}
                    </h3>
                  )}
                  {description && (
                    <p className="mt-1 text-sm text-gray-600">
                      {description}
                    </p>
                  )}
                </div>
                
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="ml-4 flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-500 transition-colors"
                    aria-label="Close modal"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          )}
          
          <div className="px-6 py-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

// Modal Body Component
interface ModalBodyProps {
  children: React.ReactNode
  className?: string
}

const ModalBody: React.FC<ModalBodyProps> = ({ children, className = '' }) => {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

interface ModalFooterProps {
  children: React.ReactNode
  justify?: 'start' | 'center' | 'end' | 'between'
  className?: string
}

const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  justify = 'end',
  className = '',
}) => {
  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
  }
  
  return (
    <div
      className={`
        mt-6 pt-6 border-t border-gray-200
        flex items-center gap-3
        ${justifyClasses[justify]}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

// Attach subcomponents
Modal.Body = ModalBody
Modal.Footer = ModalFooter

export default Modal