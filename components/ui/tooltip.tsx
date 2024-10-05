import React, { useState } from 'react'

interface TooltipProps {
  content: string
  children: React.ReactNode
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute z-10 px-2 py-1 text-sm text-white bg-gray-800 rounded-md shadow-lg -top-8 left-1/2 transform -translate-x-1/2">
          {content}
        </div>
      )}
    </div>
  )
}

export const TooltipProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <>{children}</>
}

export const TooltipTrigger: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <>{children}</>
}

export const TooltipContent: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <div className="tooltip-content">{children}</div>
}