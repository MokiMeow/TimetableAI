import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface AccordionItemProps {
  title: string
  children: React.ReactNode
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-200">
      <button
        className="flex items-center justify-between w-full px-4 py-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm font-medium">{title}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      {isOpen && <div className="px-4 py-2">{children}</div>}
    </div>
  )
}

export const Accordion: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <div className="divide-y divide-gray-200 border-t border-b border-gray-200">{children}</div>
}

export const AccordionTrigger: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <div className="accordion-trigger">{children}</div>
}

export const AccordionContent: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <div className="accordion-content">{children}</div>
}