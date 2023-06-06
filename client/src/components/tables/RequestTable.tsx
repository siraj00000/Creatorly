import React from 'react'
import Avatar from '../other/avatar'
import { TbHeartHandshake } from 'react-icons/tb'
import { VscCloseAll } from 'react-icons/vsc'
import { requestTableColumns } from '../../constants/campaign'
import { handleUpdateAction } from '../../utils/api'
import { ApiResponse } from '../../types/response.types'
import swal from 'sweetalert'

type TableProps = {
  data: any[]
  revalidator: () => void
}

const RequestTable: React.FC<TableProps> = ({ data, revalidator }) => {
  const handleApplyToCampaign = async (id: string) => {
    ;(await handleUpdateAction({
      url: `/api/campaign/${id}`,
      data: { status: 'ongoing' },
    })) as ApiResponse

    swal('Approved!', 'You approved campaign', 'success')
    revalidator()
  }

  const rejectCampaignCollaboration = async (id: string) => {
    ;(await handleUpdateAction({
      url: `/api/campaign/${id}`,
      data: { status: 'denied' },
    })) as ApiResponse

    swal('Denied!', 'You denied this campaign', 'success')
    revalidator()
  }
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {requestTableColumns.map((column, index) => (
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
                {data?.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="w-12 h-12 py-2 px-6">
                      <Avatar
                        imageURL={row.campaign_image?.url}
                        title={row.campaign_name}
                        sizeX="12"
                        sizeY="12"
                      />
                    </td>
                    <td className="whitespace-nowrap py-2 px-6">
                      {row.campaign_name || '--'}
                    </td>
                    <td className="whitespace-nowrap py-2 px-6">
                      {row.budget || '--'}
                    </td>
                    <td className="whitespace-nowrap py-2 px-6">
                      {row.start_date.split('T')[0] || '--'}
                    </td>
                    <td className="whitespace-nowrap py-2 px-6">
                      {(row.end_date && row.end_date.split('T')[0]) || '--'}
                    </td>
                    <td className="py-2 px-6">
                      <div
                        className="bg-main p-1 flex items-center justify-center gap-2 text-white"
                        onClick={() => handleApplyToCampaign(row._id)}
                      >
                        <TbHeartHandshake size={25} />
                        apply
                      </div>
                    </td>
                    <td className="py-2 px-6">
                      <div
                        className="bg-red-900 p-1 flex items-center justify-center gap-2 text-white"
                        onClick={() => rejectCampaignCollaboration(row._id)}
                      >
                        <VscCloseAll size={25} />
                        reject
                      </div>
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

export default RequestTable
