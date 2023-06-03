import React from 'react'

type Props = {}

const SerialAndDateSection = (props: Props) => {
  return (
    <div className="flex items-center flex-wrap gap-2">
      <div className="flex-1 max-md:flex-2">
        <label
          htmlFor=""
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
        >
          Number
        </label>
        <input
          type="text"
          placeholder="INV0001"
          name='invoice_number'
          className="appearance-none block w-full md:max-w-xs text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        />
      </div>
      <div className='w-full gap-5 flex items-center justify-between flex-wrap'>
        <div className="flex-1">
          <label
            htmlFor=""
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
          >
            Date
          </label>
          <input
            type="date"
            placeholder="0.00%"
            name='date'
            className="appearance-none block w-full md:max-w-xs text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
        <div className="flex-1">
          <label
            htmlFor=""
            className="block uppercase tracking-wide  text-gray-700 text-xs font-bold mb-1"
          >
            Due Date
          </label>
          <input
            type="date"
            name="due"
            className="appearance-none block w-full md:max-w-xs text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
      </div>
    </div>
  )
}

export default SerialAndDateSection
