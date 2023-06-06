import React from 'react'
import { useNavigate } from 'react-router-dom'

type TableProps = {
  data: any[]
  columns: { label: string; key: string }[]
}

const getNestedValue = (obj: any, path: string): any => {
  const keys = path.split('.')
  let value = obj
  for (const key of keys) {
    if (value && typeof value === 'object') {
      value = value[key]
    } else {
      return undefined
    }
  }
  // Format date values if the key ends with "date"
  if (typeof value === 'string' && (path.endsWith('date') || path === 'due')) {
    return value.split('T')[0]
  }
  // Round the balance_due value to 2 decimal places
  if (typeof value === 'number' && path.endsWith('balance_due')) {
    return value.toFixed(2)
  }
  return value
}

const DynamicTable: React.FC<TableProps> = ({ data, columns }) => {
  const navigate = useNavigate()

  const handleRowClick = (masterInvoiceId: string) => {
    navigate(`/invoice/show/${masterInvoiceId}`)
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row) => (
            <tr key={row._id} onClick={() => handleRowClick(row._id)} className="cursor-pointer border-b-1 border-dashed">
              {columns.map((column) => (
                <td key={column.key} className="whitespace-nowrap py-2 px-6">
                  {getNestedValue(row, column.key)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DynamicTable
