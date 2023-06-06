// InvoiceNameSection.tsx

import React, { useRef } from 'react'
import { FiUpload, FiX } from 'react-icons/fi'

interface InvoiceNameSectionProps {
  handleInvoiceImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleRemoveInvoiceImage: () => void
  invoiceImage: string | null
}

const InvoiceNameSection: React.FC<InvoiceNameSectionProps> = ({
  handleInvoiceImageChange,
  handleRemoveInvoiceImage,
  invoiceImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className="flex justify-between gap-2 max-md:flex-col mb-8">
      <div className="w-2/3 max-md:w-full md:pr-4">
        <label
          htmlFor="invoice_name"
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
        >
          Invoice Name
        </label>
        <input
          id="invoice_name"
          name="invoice_name"
          type="text"
          placeholder="Enter invoice name"
          className="w-full md:max-w-md appearance-none block text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          style={{ lineHeight: '1.5' }}
        />
      </div>

      <div className="w-1/3 max-md:w-full">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
          Invoice Image
        </label>
        <div className="relative w-full h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer">
          <input
            ref={fileInputRef}
            type="file"
            name='inv_image'
            accept="image/*"
            onChange={handleInvoiceImageChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          {invoiceImage ? (
            <>
              <img
                src={invoiceImage}
                alt="Invoice"
                className="w-full h-full object-cover object-center rounded-lg"
              />
              <div
                className="absolute top-2 right-2 cursor-pointer bg-white rounded-full shadow"
                onClick={handleRemoveInvoiceImage}
              >
                <FiX className="w-4 h-4 text-gray-600" />
              </div>
            </>
          ) : (
            <div
              className="flex flex-col items-center justify-center h-full"
              onClick={handleUploadClick}
            >
              <FiUpload className="w-8 h-8 text-gray-400" />
              <span className="mt-2 text-sm text-gray-400">Upload Image</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default InvoiceNameSection
