import React from 'react'

type Props = {
  label: string
  value: string | any
}

const TagComp: React.FC<Props> = ({ label, value }) => {
  return (
    <div className="flex flex-col gap-1">
      <h6 className="text-sm font-medium text-gray-500">{label}</h6>
      <h6 className="text-md font-medium text-black">{value || 'N/A'}</h6>
    </div>
  )
}

export default TagComp
