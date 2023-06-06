import React from 'react'
import { ShowInvoiceProps } from '../../types/loader.types'

const ShowInvoiceTemplate: React.FC<ShowInvoiceProps> = ({ data }) => {
  const { masterInvoice, detailInvoices } = data

  return (
    <div className="p-10 py-20 border-transparent border-gray-300 rounded-lg shadow-lg">
      {/* Section 1 */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div className="flex gap-5">
          <div>
            <img
              src={masterInvoice.invoice_image}
              alt="Invoice"
              className="w-48 h-48 max-md:h-auto border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex-col">
            <h2 className="text-lg font-bold capitalize">
              {masterInvoice.from.Name}
            </h2>
            <p className="text-sm mb-2">{masterInvoice.from.Email}</p>
            <p className="text-sm mb-2">{masterInvoice.from.Address}</p>
            <p className="text-sm mb-2">{masterInvoice.from.Phone}</p>
          </div>
        </div>

        <div className="flex-col text-right max-md:hidden">
          <div className="flex-col">
            <p className="text-md font-semibold">Invoice Number</p>
            <p className="text-right mb-3">{masterInvoice.invoice_number}</p>
          </div>
          <div className="flex-col">
            <p className="text-md font-semibold">Date</p>
            <p className="text-right mb-3">
              {masterInvoice.date.split('T')[0]}
            </p>
          </div>
          <div className="flex-col">
            <p className="text-md font-semibold">Due Date</p>
            <p className="text-right mb-3">{masterInvoice.due.split('T')[0]}</p>
          </div>
          <div className="flex-col">
            <p className="text-md font-semibold">Balance Due</p>
            <p className="text-right mb-3">
              {masterInvoice.total.balance_due.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="flex items-start justify-between">
        <div className="flex-col mb-6">
          <h2 className="text-md font-bold">Bill To</h2>
          <p className="text-sm mb-2">{masterInvoice.to.Name}</p>
          <p className="text-sm mb-2">{masterInvoice.to.Email}</p>
          <p className="text-sm mb-2">{masterInvoice.to.Address}</p>
          <p className="text-sm mb-2">{masterInvoice.to.Phone}</p>
        </div>

        <div className="flex-col text-right md:hidden">
          <div className="flex-col">
            <p className="text-md font-semibold">Invoice Number</p>
            <p className="text-right mb-3">{masterInvoice.invoice_number}</p>
          </div>
          <div className="flex-col">
            <p className="text-md font-semibold">Date</p>
            <p className="text-right mb-3">
              {masterInvoice.date.split('T')[0]}
            </p>
          </div>
          <div className="flex-col">
            <p className="text-md font-semibold">Due Date</p>
            <p className="text-right mb-3">{masterInvoice.due.split('T')[0]}</p>
          </div>
          <div className="flex-col">
            <p className="text-md font-semibold">Balance Due</p>
            <p className="text-right mb-3">
              {masterInvoice.total.balance_due.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div className="my-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item Name
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rate
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {detailInvoices.map((detailInvoice) => (
                <tr
                  key={detailInvoice._id}
                  className={`cursor-pointer border-b-1 border-dashed`}
                >
                  <td className="whitespace-nowrap py-2 px-6">
                    {detailInvoice.itemName}
                  </td>
                  <td className="whitespace-nowrap py-2 px-6 text-right">
                    {detailInvoice.rate}
                  </td>
                  <td className="whitespace-nowrap py-2 px-6 text-right">
                    {detailInvoice.qty}
                  </td>
                  <td className="whitespace-nowrap py-2 px-6 text-right">
                    {detailInvoice.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 4 */}
      <div className="flex justify-end mt-20 uppercase">
        <div className="flex-col max-w-sm w-full">
          <div className="flex justify-between border-b-0 border-gray-200 py-0 items-center">
            <p className="font-bold text-xs">Subtotal</p>
            <p className="text-right">
              ₹ {masterInvoice.total.subTotal.toFixed(2)}
            </p>
          </div>
          <div className="flex justify-between border-b-0 border-gray-200 py-0 items-center">
            <p className="font-bold text-xs">Tax</p>
            <p className="text-right">₹ {masterInvoice.total.tax}</p>
          </div>
          <div className="flex justify-between border-b-0 border-gray-200 py-0 items-center">
            <p className="font-bold text-xs">
              Discount (
              {`${Number(masterInvoice.total.discount.toFixed(2)) * 100} %`})
            </p>
            <p className="text-right">
              {masterInvoice.total.discount.toFixed(2)}
            </p>
          </div>
          <div className="flex justify-between border-t-1 border-gray-200 py-1 mt-2 items-center">
            <p className="font-bold text-xs">Total</p>
            <p className="text-right">
              ₹ {masterInvoice.total.total.toFixed(2)}
            </p>
          </div>
          <div className="flex justify-between border-y-1 border-gray-200 py-1 items-center">
            <p className="font-bold text-xs">Balance Due</p>
            <p className="text-right text-2xl font-bold">
              {' '}
              INR ₹{masterInvoice.total.balance_due.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowInvoiceTemplate
