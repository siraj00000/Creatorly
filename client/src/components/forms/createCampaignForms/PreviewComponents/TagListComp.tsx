import React from 'react'

type Props = {
  label: string
  tagList: Array<string>
}

const TagListComp: React.FC<Props> = ({ label, tagList }) => {
  return (
    <div className="flex flex-col gap-1">
      <h6 className="text-sm font-medium text-gray-500">{label}</h6>
      <div className="flex items-center flex-wrap gap-3">
        {tagList?.length !== 0 ? (
          tagList?.map((item, index) => (
            <p
              key={index}
              className="py-1 px-3 bg-gray-300 text-sm font-medium rounded-full"
            >
              {item}
            </p>
          ))
        ) : (
          <p className="text-md font-medium rounded-full">
            N/A
          </p>
        )}
      </div>
    </div>
  )
}

export default TagListComp
