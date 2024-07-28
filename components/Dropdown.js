"use client";

import { useState } from 'react'

export default function Dropdown({ options, selected, onSelect }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (option) => {
    onSelect(option)
    setIsOpen(false)
  }

  return (
    <div className="relative inline-block w-full">
      <button
        type="button"
        className="bg-white border border-gray-300 rounded px-4 py-2 w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected || 'Select an option'}
      </button>
      {isOpen && (
        <ul className="absolute z-10 bg-white border border-gray-300 rounded mt-1 w-full">
          {options.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
