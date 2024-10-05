import React from 'react'
import { Input } from "@/components/ui/input"

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const TimePicker: React.FC<TimePickerProps> = ({ value, onChange, placeholder }) => {
  return (
    <Input
      type="time"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  )
}