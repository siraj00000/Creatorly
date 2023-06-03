import React from 'react'

type Props = {
  updatePercentages: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const TaxAndDiscount: React.FC<Props> = ({ updatePercentages }) => {
  return (
    <div className="flex items-end flex-col max-md:items-start max-md:w-full max-md:flex-row flex-wrap gap-5">
      <div className="flex-1">
        <label
          htmlFor=""
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
        >
          Tax
        </label>
        <input
          type="number"
          placeholder="0.00%"
          name="tax"
          onChange={updatePercentages}
          className="resize-none appearance-none block w-full text-gray-700 border border-dashed border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        />
      </div>
      <div className="flex-1">
        <label
          htmlFor=""
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
        >
          Discount
        </label>
        <input
          type="number"
          name="discount"
          onChange={updatePercentages}
          placeholder="0.00%"
          className="resize-none appearance-none block w-full text-gray-700 border border-dashed border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        />
      </div>
    </div>
  )
}

export default TaxAndDiscount
