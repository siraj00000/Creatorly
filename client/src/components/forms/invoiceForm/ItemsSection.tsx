// ItemsSection.tsx

import React from 'react'
import { AiFillCloseSquare, AiFillPlusSquare } from 'react-icons/ai'
import { InvoiceItem } from '.'

interface ItemsSectionProps {
  handleRemoveItem: (index: number) => void
  handleAddItem: () => void
  handleItemChange: (
    index: number,
    field: keyof InvoiceItem,
    value: string,
  ) => void
  items: InvoiceItem[]
}

const ItemsSection: React.FC<ItemsSectionProps> = ({
  handleAddItem,
  handleRemoveItem,
  handleItemChange,
  items,
}) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Items</h2>
    {items.map((item, index) => (
      <div key={index} className="rounded-lg border-b-1 border-dashed py-3">
        {/* Additional Fields */}
        <div className="flex md:justify-between justify-end items-start max-md:flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleRemoveItem(index)}
            className="text-red-500 mr-auto" 
          >
            <AiFillCloseSquare size={30} />
          </button>
          <div className="w-1/3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
              Description
            </label>
            <input
              type="text"
              value={item.itemName}
              name='itemName'
              placeholder="Item description"
              onChange={(e) =>
                handleItemChange(index, 'itemName', e.target.value)
              }
              className="max-w-xs appearance-none block w-full text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
          <div className="w-1/4">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
              Rate
            </label>
            <input
              type="number"
              value={item.rate}
              placeholder="0.00"
              onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
              className="max-w-xs appearance-none block w-full text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
          <div className="w-1/4">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
              Quantity
            </label>
            <input
              type="number"
              value={item.qty}
              placeholder="qty"
              onChange={(e) => handleItemChange(index, 'qty', e.target.value)}
              className="max-w-xs appearance-none block w-full text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
          <div className="w-1/4">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
              Additional
            </label>
            <textarea
              value={item.additional_details}
              placeholder="Details"
              onChange={(e) =>
                handleItemChange(index, 'additional_details', e.target.value)
              }
              className="max-w-xs resize-none appearance-none block w-full text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            ></textarea>
          </div>
          <div className="w-1/4">
            <label className="block text-right uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
              Amount
            </label>
            <h6 className="max-w-xs text-right appearance-none block w-full text-gray-700 border-b-0 border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              {item.amount}
            </h6>
          </div>
        </div>
      </div>
    ))}
    <button
      type="button"
      onClick={handleAddItem}
      className="text-black flex items-center gap-2"
    >
      <AiFillPlusSquare size={50} />
      Add Items
    </button>
  </div>
)

export default ItemsSection
