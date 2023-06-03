import React, { useState } from 'react'
import { Form, useSubmit } from 'react-router-dom'
import FromToSection from './FromToSection'
import ItemsSection from './ItemsSection'
import TotalSection from './TotalSection'
import SubmitSection from './SubmitSection'
import InvoiceNameSection from './InvoiceNameSection'
import NotesComponent from './NotesAndSignatureSection'
import TaxAndDiscount from './TaxAndDiscountSection'
import SerialAndDateSection from './SerialAndDateSection'
import Divider from '../../other/divider'

const fields = [
  {
    label: 'Name',
    name: 'from.Name',
    placeholder: 'Your Business Name',
    value: 'Your Company',
  },
  {
    label: 'Address',
    name: 'from.Address',
    placeholder: 'Your Company Address',
    value: 'Your Company Address',
  },
  {
    label: 'City',
    name: 'from.City',
    placeholder: 'Your Company City',
    value: 'Your Company City',
  },
  {
    label: 'Phone',
    name: 'from.Phone',
    placeholder: 'Your Business Phone',
    value: 'Your Company Phone',
  },
  {
    label: 'Email',
    name: 'from.Email',
    placeholder: 'Your Business Email',
    value: 'Your Company Email',
  },
]

export interface InvoiceItem {
  itemName: string
  rate: number
  qty: number
  amount: number
  additional_details: string
}

export type PercentagesTypes = {
  tax: number | 0
  discount: number | 0
}

export type TotalValues = {
  subTotal: number
  tax: number
  discount: number
  total: number
  balance_due: number
}

const InvoiceForm: React.FC = () => {
  const submit = useSubmit()
  const [invoiceImage, setInvoiceImage] = useState<string | null>(null)
  const [total, setTotal] = useState<TotalValues>({
    subTotal: 0,
    tax: 0,
    discount: 0,
    total: 0,
    balance_due: 0,
  })
  const [percentages, setPercentages] = useState<PercentagesTypes>({
    tax: 0,
    discount: 0,
  })
  const [items, setItems] = useState<InvoiceItem[]>([
    { itemName: '', rate: 0.0, qty: 1, amount: 0, additional_details: '' },
  ])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Create a new FormData instance
    const formData = new FormData(event.currentTarget)
    // Append values to FormData
    formData.append('detailInvoices', JSON.stringify(items))
    formData.append('total', JSON.stringify(total))

    // Handle form submission with formData
    submit(formData, {
      action: '/invoice/create',
      method: 'post',
      encType: 'multipart/form-data',
    })
  }

  const handleInvoiceImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files
    if (files) {
      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload = () => {
        setInvoiceImage(reader.result as string)
      }
    }
  }

  const handleRemoveInvoiceImage = () => {
    setInvoiceImage(null)
  }

  const handleItemChange = (
    index: number,
    field: keyof InvoiceItem,
    value: string,
  ) => {
    const updatedItems = [...items] as InvoiceItem[]
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    }

    if (['rate', 'qty'].includes(field)) {
      updatedItems[index] = {
        ...updatedItems[index],
        amount: updatedItems[index].rate * updatedItems[index].qty,
      }
    }

    setItems(updatedItems)
  }

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        itemName: '',
        rate: 0,
        qty: 1,
        amount: 0,
        additional_details: '',
      },
    ])
  }

  const handleRemoveItem = (index: number) => {
    const updatedItems = [...items]
    updatedItems.splice(index, 1)
    setItems(updatedItems)
  }

  const handleUpatePercentages = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target
    setPercentages((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <Form
      onSubmit={handleSubmit}
      className="flex max-md:flex-col items-center gap-2 md:px-10"
    >
      <aside className="w-full md:w-4/5 shadow px-5 py-10 border-t-4 border-t-main">
        {/* Section 1: Invoice name and image */}
        <InvoiceNameSection
          invoiceImage={invoiceImage}
          handleInvoiceImageChange={handleInvoiceImageChange}
          handleRemoveInvoiceImage={handleRemoveInvoiceImage}
        />

        {/* Section 2: From and To */}
        <FromToSection fields={fields} />

        <Divider />

        {/*  */}
        <SerialAndDateSection />

        <div className="md:hidden">
          <TaxAndDiscount updatePercentages={handleUpatePercentages} />
        </div>

        <Divider />

        {/* Section 3: Items */}
        <ItemsSection
          handleAddItem={handleAddItem}
          handleItemChange={handleItemChange}
          handleRemoveItem={handleRemoveItem}
          items={items}
        />

        <Divider />

        {/* Section 4: Total */}
        <TotalSection
          items={items}
          percentages={percentages}
          updateTotal={setTotal}
        />

        {/* Section 5: Submit */}
        <NotesComponent />

        {/* Section 6 Submit */}
        <SubmitSection />
      </aside>
      <aside className="md:w-1/5 w-full max-md:hidden">
        {/*  */}
        <TaxAndDiscount updatePercentages={handleUpatePercentages} />
      </aside>
    </Form>
  )
}

export default InvoiceForm
