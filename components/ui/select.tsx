import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface SelectProps {
  id?: string
  value: string
  onValueChange: (value: string) => void
  options: string[]
  placeholder?: string
}

export const Select: React.FC<SelectProps> = ({ id, value, onValueChange, options, placeholder = 'Select an option' }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (option: string) => {
    onValueChange(option)
    setIsOpen(false)
  }

  return (
    <div className="relative inline-block w-full">
      <div
        id={id}
        className="flex items-center justify-between w-full px-4 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value || placeholder}</span>
        <ChevronDown className="w-4 h-4 ml-2" />
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {options.map((option) => (
            <div
              key={option}
              className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}