import React from 'react'
import Dropdown from '../other/dropdown'
import { MdNotificationsNone } from 'react-icons/md'
import { HiOutlineInformationCircle } from 'react-icons/hi'
import { useLocation } from 'react-router-dom'

type Props = {}

const TopbarTemplate = (props: Props) => {
  const { pathname } = useLocation()
  return (
    <header className="p-4 py-2 max-md:pt-4 flex items-center justify-between gap-2 shadow-sm text-gray-500">
      <h5 className='capitalize text-lg font-medium text-black md:ml-10'>{pathname.split('/')[1].split('-').join(' ')}</h5>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <MdNotificationsNone size={25} />
          <HiOutlineInformationCircle size={25} />
        </div>
        <div className="">
          <Dropdown />
        </div>
      </div>
    </header>
  )
}

export default TopbarTemplate
