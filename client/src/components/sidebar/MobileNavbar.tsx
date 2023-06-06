import React from 'react'
import { NavLink } from 'react-router-dom'
import { menuListType } from '../../constants/menuList'

type Props = {
  sidebarMenu: menuListType[] | undefined
}

const MobileNavbar: React.FC<Props> = ({ sidebarMenu }) => {
  return (
    <nav className="lg:hidden absolute bottom-0 bg-main w-full h-20 text-white z-50">
      <nav className="flex justify-between items-start p-2 gap-3 flex-1 ">
        {sidebarMenu?.map(({ Icon, ...rest }, index) => (
          <NavLink
            to={rest.link}
            key={index}
            className={({ isActive }) =>
              `${
                isActive
                  ? `bg-main rounded-md text-white`
                  : `text-white hover:text-black`
              } items-center flex-col gap-2 p-1 capitalize flex-1
              ${['profile', 'support'].includes(rest.link) ? 'hidden' : 'flex'}
              `
            }
          >
            <span className="bg-white shadow rounded-md text-black p-1 text-2xl">
              <Icon />
            </span>
            <span className="break-words">{rest.title.split(' ')[0]}</span>
          </NavLink>
        ))}
      </nav>
    </nav>
  )
}

export default MobileNavbar
