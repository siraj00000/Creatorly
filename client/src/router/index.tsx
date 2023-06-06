import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from 'react-router-dom'
import { PrivateRouteProps } from '../types/routes.types'
import { getToken } from '../service/auth-service'

import {
  LoginPage,
  userLoginAction,
  UserSignUp,
  userRegisterAction,
  HomePage,
  WhoYouArePage,
  PageNotFound,
  CreatorLinkTree,
  linkTreeLoader,
  LinkTreeErrorPage,
  SearchCreatorLinkTreePage,
  SearchCreatorLinkTreePageAction,
} from '../pages'

import { AppRootLayout, DashboardLayout } from '../layouts'
import Cookies from 'js-cookie'
import { SuperAdminRoutes } from './superAdminRoutes'
import { CreatorRoutes } from './creatorRoutes'
import { BrandOrAgencyRoutes } from './brandOrAgencyRoutes'

let authToken = getToken()

const PrivateRoute = ({ token, component, path }: PrivateRouteProps) => {
  return token ? component : <Navigate to={path} />
}

const role = Cookies.get('__cretorly')
const UserRoutes =
  role === '1'
    ? SuperAdminRoutes
    : role === '2'
    ? CreatorRoutes
    : role === '3' && BrandOrAgencyRoutes

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppRootLayout />}>
      <Route index element={<HomePage />} />
      <Route
        path=":username"
        element={<CreatorLinkTree />}
        loader={linkTreeLoader}
        errorElement={<LinkTreeErrorPage />}
      />
      <Route
        path="/Who-you-are"
        element={PrivateRoute({
          token: !authToken,
          component: <WhoYouArePage />,
          path: '/onboarding',
        })}
      />
      <Route
        path="login"
        element={PrivateRoute({
          token: !authToken,
          component: <LoginPage />,
          path: '/onboarding',
        })}
        action={userLoginAction}
      />
      <Route
        path="signup/:userType"
        element={PrivateRoute({
          token: !authToken,
          component: <UserSignUp />,
          path: '/onboarding',
        })}
        action={userRegisterAction}
      />

      <Route
        element={PrivateRoute({
          token: Boolean(authToken),
          component: <DashboardLayout />,
          path: '/login',
        })}
      >
        {UserRoutes}
      </Route>

      {/* Creator Search */}
      <Route
        path="creator-search"
        element={<SearchCreatorLinkTreePage />}
        action={SearchCreatorLinkTreePageAction}
      />

      {/* Other Routes */}
      <Route path="*" element={<PageNotFound />} />
    </Route>,
  ),
)

export default router
