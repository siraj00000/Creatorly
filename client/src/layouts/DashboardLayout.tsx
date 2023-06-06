import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar'
import TopbarTemplate from '../components/_templates/TopbarTemplate'

type Props = {}

const DashboardLayout = (props: Props) => {
  return (
    <main>
      <div className="grid grid-cols-5 h-screen w-full">
        <Sidebar />
        <div className="h-screen col-span-5 lg:col-span-4 overflow-scroll overflow-x-hidden">
          <TopbarTemplate />
          <div className="w-full p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  )
}

export default DashboardLayout
