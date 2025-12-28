import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'ghost'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hoverable?: boolean
  clickable?: boolean
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  action?: React.ReactNode
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  justify?: 'start' | 'center' | 'end' | 'between'
}

const Card: React.FC<CardProps> & {
  Header: React.FC<CardHeaderProps>
  Content: React.FC<CardContentProps>
  Footer: React.FC<CardFooterProps>
} = ({
  children,
  variant = 'default',
  padding = 'md',
  hoverable = false,
  clickable = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-xl transition-all duration-200'
  
  const variants: Record<typeof variant, string> = {
    default: 'bg-white border border-gray-200 shadow-sm',
    outline: 'bg-transparent border border-gray-300',
    ghost: 'bg-transparent',
  }
  
  const paddings: Record<typeof padding, string> = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }
  
  const hoverClass = hoverable ? 'hover:shadow-md hover:border-gray-300' : ''
  const clickableClass = clickable ? 'cursor-pointer active:scale-[0.99]' : ''
  
  return (
    <div
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${paddings[padding]}
        ${hoverClass}
        ${clickableClass}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}

const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  description,
  action,
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`mb-6 ${className}`} {...props}>
      {(title || description || action) && (
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {title && <h3 className="text-lg font-bold text-gray-900">{title}</h3>}
            {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
          </div>
          {action && <div className="ml-4">{action}</div>}
        </div>
      )}
      {children}
    </div>
  )
}

const CardContent: React.FC<CardContentProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

const CardFooter: React.FC<CardFooterProps> = ({
  children,
  justify = 'end',
  className = '',
  ...props
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
      {...props}
    >
      {children}
    </div>
  )
}

// Attach subcomponents
Card.Header = CardHeader
Card.Content = CardContent
Card.Footer = CardFooter

export default Card