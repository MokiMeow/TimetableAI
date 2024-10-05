import React from 'react'
import { Input } from "@/components/ui/input"

interface TimePickerProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string; // Add className prop
}

export const TimePicker: React.FC<TimePickerProps> = ({ placeholder, value, onChange, className }) => {
  return (
    <input
      type="time"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`border rounded p-2 ${className}`} // Use className prop
    />
  );
};