// FromToSection.tsx

import React from 'react'

interface FromToSectionProps {
  fields: {
    label: string
    name: string
    placeholder: string
    value: string
  }[]
}

const FromToSection: React.FC<FromToSectionProps> = ({ fields }) => (
  <div className="flex justify-between max-md:flex-col gap-5">
    <div className="flex-1 max-md:w-full md:pr-4">
      <h2 className="text-xl font-semibold mb-4">From</h2>
      {fields.map((field) => (
        <div key={field.name} className="mb-4">
          <label
            htmlFor={field.name}
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
          >
            {field.label}
          </label>
          <input
            id={field.name}
            name={field.name}
            type="text"
            placeholder={field.placeholder}
            className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
      ))}
    </div>
    <div className="flex-1 max-md:w-full">
      <h2 className="text-xl font-semibold mb-4">To</h2>
      {fields.map((field) => (
        <div key={field.name} className="mb-4">
          <label
            htmlFor={field.name}
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
          >
            {field.label}
          </label>
          <input
            id={field.name}
            name={field.name.replace('from', 'to')}
            type="text"
            placeholder={field.placeholder
              .replace(/Business/g, 'Client')
              .replace(/Company/g, 'Client')}
            className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
      ))}
    </div>
  </div>
)

export default FromToSection
