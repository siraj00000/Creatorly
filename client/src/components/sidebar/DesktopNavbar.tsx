import React from 'react'
import { FiLogOut } from 'react-icons/fi'
import { IoLogoElectron } from 'react-icons/io5'
import { NavLink } from 'react-router-dom'
import { menuListType } from '../../constants/menuList'
import userLogOut from '../../utils/authUtils';

type Props = {
  sidebarMenu: menuListType[] | undefined
}

const DesktopNavbar: React.FC<Props> = ({ sidebarMenu }) => {
  return (
    <main className="h-screen relative bg-white shadow-xl max-lg:hidden">
      <aside className="flex flex-col justify-between h-screen w-full p-3">
        <div className="flex items-center justify-center gap-2 w-full py-5 bg-main border-2 border-light rounded-md">
          <IoLogoElectron size={35} className="text-white" />
          <h1 className="text-white font-bold text-2xl">Creatorly.</h1>
        </div>
        <nav className="flex flex-col gap-3 flex-1 py-10">
          {sidebarMenu?.map(({ Icon, ...rest }, index) => (
            <NavLink
              to={rest.link}
              key={index}
              className={({ isActive }) =>
                `${
                  isActive
                    ? `bg-main rounded-md text-white`
                    : `text-main hover:text-black`
                } flex items-center gap-5 p-1 capitalize`
              }
            >
              <span className="bg-white shadow rounded-md text-black p-1 text-2xl">
                <Icon />
              </span>
              {rest.title}
            </NavLink>
          ))}
        </nav>
        <footer>
          <button
            onClick={userLogOut}
            className="flex items-center gap-5 text-main"
          >
            <span className="bg-white shadow rounded-md text-black p-1 text-2xl">
              <FiLogOut />
            </span>
            Log Out
          </button>
        </footer>
      </aside>
    </main>
  )
}

export default DesktopNavbar
