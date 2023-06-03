// TotalSection.tsx

import React, { useMemo, useEffect } from 'react'
import { InvoiceItem, PercentagesTypes, TotalValues } from '.'

interface TotalSectionProps {
  items: InvoiceItem[]
  percentages: PercentagesTypes
  updateTotal: React.Dispatch<React.SetStateAction<TotalValues>>
}

const TotalSection: React.FC<TotalSectionProps> = ({
  items,
  percentages,
  updateTotal,
}) => {
  // Calculate and memoize subTotal, tax, discount, total and balance Duevalues
  const _TotalCalc = useMemo(() => {
    let subTotal = 0 // Variable to store the subtotal
    let tax = percentages.tax / 100 // Calculate the tax percentage
    let discount = percentages.discount / 100 // Calculate the discount percentage
    let total = 0 // Variable to store the total
    let balance_due = 0 // Variable to store the balance due

    // Calculate subTotal
    subTotal = items.reduce((accumulator, item) => {
      const amount = item.rate * item.qty // Calculate the amount for each item
      return accumulator + amount // Accumulate the amounts
    }, 0)

    let subTotalWithTax = subTotal + subTotal * tax // Calculate subTotal with tax

    let reduceDiscount = subTotalWithTax * discount // Calculate the discount amount

    // Calculate total
    total = subTotalWithTax - reduceDiscount // Calculate the final total
    // Calculate balance due
    balance_due = subTotalWithTax - reduceDiscount // Calculate the final total

    // invoice total and insert all values
    const invoiceTotal = { subTotal, tax, discount, total, balance_due }
    return invoiceTotal // Return the calculated values
  }, [items, percentages.discount, percentages.tax]) // Memoize the values based on item, discount, and tax changes

  // Update total outside of useMemo
  useEffect(() => {
    updateTotal(_TotalCalc)
  }, [_TotalCalc, updateTotal])

  return (
    <div className="flex flex-col justify-between text-right max-w-xs w-full ml-auto">
      <div className="flex gap-x-2">
        <div className="flex-1">Subtotal</div>
        <div className="flex-1">₹ {_TotalCalc.subTotal.toFixed(2)}</div>
      </div>
      <div className="flex gap-x-2">
        <div className="flex-1">Tax</div>
        <div className="flex-1">{_TotalCalc.tax}</div>
      </div>
      <div className="flex gap-x-2">
        <div className="flex-1">Discount</div>
        <div className="flex-1">₹ {_TotalCalc.discount}</div>
      </div>
      <div className="flex gap-x-2">
        <div className="flex-1">Total</div>
        <div className="flex-1">₹ {_TotalCalc.total.toFixed(2)}</div>
      </div>
      <div className="flex gap-x-2">
        <div className="flex-1">Balance Due</div>
        <div className="flex-1">₹ {_TotalCalc.balance_due.toFixed(2)}</div>
      </div>
    </div>
  )
}

export default TotalSection
