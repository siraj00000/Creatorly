import React, { useState } from 'react'
import { TbHeartHandshake } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

type TableProps = {
  data: any[]
  columns: { label: string; key: string }[]
}

const DiscoveryTable: React.FC<TableProps> = ({ data, columns }) => {
  const navigate = useNavigate()
  const [checkedIds, setCheckedIds] = useState<string[]>([])

  const handleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCheckedIds(data.map((row) => row._id))
    } else {
      setCheckedIds([])
    }
  }

  const handleCheckRow = (
    event: React.ChangeEvent<HTMLInputElement>,
    row: any,
  ) => {
    if (event.target.checked) {
      setCheckedIds([...checkedIds, row._id])
    } else {
      setCheckedIds(checkedIds.filter((id) => id !== row._id))
    }
  }

  const collabWithCreators = () => {
    /**
     * if user select only one creator then create single creator campaign
     * and if user select more than one creator then create multi creator campaign
     * */

    if (checkedIds.length === 1) {
      navigate('/single-creator-campaign/create', { state: checkedIds })
    } else if (checkedIds.length > 1) {
      navigate('/multi-creator-campaign/create', { state: checkedIds })
    }
  }

  return (
    <div className="flex flex-col">
      <button
        onClick={collabWithCreators}
        disabled={checkedIds.length === 0}
        className={`${
          checkedIds.length === 0 ? 'bg-gray-500' : 'bg-main'
        } text-white p-2 w-full font-bold text-lg rounded-md flex items-center justify-center gap-4 my-2`}
      >
        Collab
        <TbHeartHandshake size={25} />
      </button>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <input
                      type="checkbox"
                      onChange={handleCheckAll}
                      checked={checkedIds.length === data.length}
                      className="h-5 w-5"
                    />
                  </th>
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
                      <input
                        type="checkbox"
                        onChange={(event) => handleCheckRow(event, row)}
                        checked={checkedIds.includes(row._id)}
                        className="h-5 w-5"
                      />
                    </td>
                    <td className="whitespace-nowrap py-2 px-6">
                      {row.profile_image_url[0] ? (
                        <img
                          className="w-10 h-10 rounded-full"
                          src={row.profile_image_url[0]}
                          alt={row.userName}
                        ></img>
                      ) : (
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-main text-light font-bold">
                          <h6>{row.userName[0]}</h6>
                        </div>
                      )}
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
