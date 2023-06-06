import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { NavLink } from 'react-router-dom'
import userLogOut from '../../utils/authUtils'
import { BsPersonGear } from 'react-icons/bs'
import Cookies from 'js-cookie'

type DropdownListType = { title: string; to: string; show: boolean }
const __cretorly = Cookies.get('__cretorly')

const dropdownList: DropdownListType[] = [
  {
    title: 'Account settings',
    to: '/profile',
    show: __cretorly === '2',
  },
  {
    title: 'Requests',
    to: '/requests',
    show: __cretorly === '2',
  },
  {
    title: 'Support',
    to: '/support',
    show: __cretorly ? ['2', '3'].includes(__cretorly) : false,
  },
  {
    title: 'Profile',
    to: '/profile',
    show: __cretorly ? ['2', '3'].includes(__cretorly) : false,
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Dropdown() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center justify-center gap-2 bg-white text-main p-1 text-2xl">
          <BsPersonGear size={25} />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {dropdownList.map(({ title, to, show }, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <NavLink
                    to={to}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      `block px-4 py-2 text-sm ${show ? '' : 'hidden'}`,
                    )}
                  >
                    {title}
                  </NavLink>
                )}
              </Menu.Item>
            ))}
            <Menu.Item>
              {({ active }) => (
                <button
                  type="submit"
                  onClick={userLogOut}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block w-full px-4 py-2 text-left text-sm',
                  )}
                >
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
