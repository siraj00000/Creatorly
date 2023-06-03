import React from 'react'

type SubmitSectionProps = {}

const SubmitSection: React.FC<SubmitSectionProps> = () => {
  return (
    <div className="flex justify-end mt-8">
      <button
        type="submit"
        className="px-8 py-2 bg-blue-500 text-white font-semibold rounded-lg"
      >
        Submit
      </button>
    </div>
  )
}

export default SubmitSection
