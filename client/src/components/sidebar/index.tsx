import { useMemo } from 'react'
import Cookies from 'js-cookie'
import { sidebarMenuList } from '../../constants/menuList'
import DesktopNavbar from './DesktopNavbar'
import MobileNavbar from './MobileNavbar'

type Props = {}

const Sidebar = (props: Props) => {
  const userRole = useMemo(() => Cookies.get('__cretorly'), [])
  const sidebarMenu = useMemo(() => {
    if (userRole) {
      return sidebarMenuList({ role: userRole })
    }
  }, [userRole])

  return (
    <>
      <DesktopNavbar sidebarMenu={sidebarMenu} />
      <MobileNavbar sidebarMenu={sidebarMenu} />
    </>
  )
}

export default Sidebar
