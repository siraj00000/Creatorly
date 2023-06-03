import React from 'react'
import Avatar from '../other/avatar'
import { TbHeartHandshake } from 'react-icons/tb'
import { NavLink } from 'react-router-dom'

type TableProps = {
  data: any[]
  columns: { label: string; key: string }[]
}

const DiscoveryTable: React.FC<TableProps> = ({ data, columns }) => {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((column, index) => (
                    <th
                      key={column.key + index}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="w-12 h-12 py-2 px-6">
                      <Avatar
                        imageURL={row.profile_image_url[0]}
                        title={row.userName}
                        sizeX="12"
                        sizeY="12"
                      />
                    </td>
                    <td className="whitespace-nowrap py-2 px-6">
                      {row.userName || '--'}
                    </td>
                    <td className="whitespace-nowrap py-2 px-6">
                      {row.region || '--'}
                    </td>
                    <td className="whitespace-nowrap py-2 px-6">
                      {row.category.join(', ') || '--'}
                    </td>
                    <td className="py-2 px-6">
                      <NavLink
                        to={`/profile/${row._id}`}
                        title="collab with this creator"
                        className="bg-main text-white p-2 w-full rounded-md text-sm flex items-center justify-center"
                      >
                        <TbHeartHandshake size={25} />
                      </NavLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiscoveryTable
