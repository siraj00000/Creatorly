import { Navigate, Outlet, Route } from 'react-router-dom'

import {
  BrandOrAgencyDashboard,
  BrandOrAgencyOnBoardingPage,
  BrandCampaignStatusPage,
  CreateBrandCampaign,
  AddBrand,
  MyBrand,
  myBrandDataLoader,
  ErrorPage,
  SingleCreatorProfile,
  SingleCreatorLoader,
  CreateSingleBrandCampaign,
  DiscoverCreators,
  DiscoverCreatorsLoader,
  SingleCreatorCampaignStatusPage,
  multiCreatorCampaignsLoader,
  singleCreatorCampaignLoader,
  BrandOrAgencyDashboardLoader,
  SupportPage,
} from '../pages'
import { decryptData } from '../utils/encryption'
import { SingalCreatorRouteProps } from '../types/routes.types'

const SingleCreatorPage = ({ component, path }: SingalCreatorRouteProps) => {
  let isSingleCreator = sessionStorage.getItem('_#@ena')
  let decryptCreatorId
  if (isSingleCreator) {
    decryptCreatorId = decryptData(isSingleCreator!)
  }
  return !decryptCreatorId ? (
    component
  ) : (
    <Navigate to={`${path}/${decryptCreatorId}`} />
  )
}

export const BrandOrAgencyRoutes = (
  <>
    <Route
      path="dashboard"
      element={<BrandOrAgencyDashboard />}
      loader={BrandOrAgencyDashboardLoader}
    />
    <Route
      path="onboarding"
      element={SingleCreatorPage({
        component: <BrandOrAgencyOnBoardingPage />,
        path: '/profile',
      })}
    />
    <Route
      path="discover-creators"
      element={<DiscoverCreators />}
      loader={DiscoverCreatorsLoader}
    />
    <Route path="multi-creator-campaign" element={<Outlet />}>
      <Route
        index
        element={<BrandCampaignStatusPage />}
        loader={multiCreatorCampaignsLoader}
      />
      <Route path="create" element={<CreateBrandCampaign />} />
    </Route>
    <Route path="single-creator-campaign" element={<Outlet />}>
      <Route
        index
        element={<SingleCreatorCampaignStatusPage />}
        loader={singleCreatorCampaignLoader}
      />
      <Route path="create" element={<CreateSingleBrandCampaign />} />
    </Route>
    <Route path="my-brands" element={<Outlet />} errorElement={<ErrorPage />}>
      <Route index element={<MyBrand />} loader={myBrandDataLoader} />
      <Route path="add-brand" element={<AddBrand />} />
    </Route>
    <Route
      path="profile/:id"
      element={<SingleCreatorProfile />}
      loader={SingleCreatorLoader}
    />
    <Route path="support" element={<SupportPage />} />
  </>
)
