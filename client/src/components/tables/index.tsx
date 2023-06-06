import React, { useState } from 'react'
import { UserProfileWithUser } from '../../types/campaignForm.types'
import TableSearchbar from './TableSearchbar'

type Props = {
  data: UserProfileWithUser[]
  handleSearch: React.Dispatch<React.SetStateAction<string>>
  onCreatorSelect: (creatoruser_ids: Array<string>) => void
  alreadyChoosedCreator?: any
}

const TableComponent = ({
  data,
  handleSearch,
  onCreatorSelect,
  alreadyChoosedCreator,
}: Props) => {
  const headerGroup = ['profile', 'name', 'category', 'region']
  const [selectedRows, setSelectedRows] = useState<any>([])

  const handleSelectRow = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) => {
    let _selectedRow = selectedRows
    if (e.target.checked) {
      if (selectedRows)
        if (alreadyChoosedCreator) {
          // Check if alreadyChoosedCreator is not empty
          _selectedRow = [...alreadyChoosedCreator, id] // Add id to the existing array
        } else {
          _selectedRow = [id] // Create a new array with only id
        }
    } else {
      _selectedRow = selectedRows.filter((rowId: any) => rowId !== id)
    }
    setSelectedRows(_selectedRow)
    onCreatorSelect(_selectedRow)
  }

  const handleSelectAllRows = (e: React.ChangeEvent<HTMLInputElement>) => {
    let _selectedRow = selectedRows
    if (e.target.checked) {
      _selectedRow = data?.map(({ userProfile }) => userProfile?.user_id)
    } else {
      _selectedRow = []
    }

    setSelectedRows(_selectedRow)
    onCreatorSelect(_selectedRow)
  }
  return (
    <aside className="my-10 w-full">
      {/* TODO: Search Creator by username */}
      <TableSearchbar searchCreator={handleSearch} />

      <table className="table-auto w-full text-left">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-2">
              <input
                type="checkbox"
                onChange={handleSelectAllRows}
                checked={selectedRows?.length === data?.length}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
            </th>
            {headerGroup.map((headerItem, index) => (
              <th key={index} className="px-4 py-2">
                {headerItem}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map(({ userProfile }) => (
            <tr key={userProfile?._id}>
              <td className="px-4 py-2">
                <input
                  type="checkbox"
                  onChange={(e) => handleSelectRow(e, userProfile?.user_id)}
                  checked={selectedRows?.includes(userProfile?.user_id)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
              </td>
              <td className="px-4 py-2">
                {userProfile?.profile_image_url ? (
                  <img
                    className="w-10 h-10 rounded-full"
                    src={userProfile?.profile_image_url}
                    alt={userProfile?.user[0].userName}
                  ></img>
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-main text-light font-bold">
                    <h6>{userProfile?.user[0].userName[0]}</h6>
                  </div>
                )}
              </td>
              <td className="px-4 py-2">{userProfile?.user[0]?.userName}</td>
              <td className="px-4 py-2">{userProfile?.category?.join(', ')}</td>
              <td className="px-4 py-2">{userProfile?.region}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </aside>
  )
}

export default TableComponent
