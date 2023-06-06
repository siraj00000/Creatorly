import { Outlet, useNavigation } from 'react-router-dom'
import PendingUILoader from '../components/loader/pendingUILoader'

type Props = {}

const RootLayout = (props: Props) => {
  const { state } = useNavigation()

  let isLoadingState = state === 'loading'

  return isLoadingState ? <PendingUILoader /> : <Outlet />
}

export default RootLayout
