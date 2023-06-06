import { Outlet, Route } from 'react-router-dom'

import {
  CreatorOnBoardingPage,
  CreatorDashboardPage,
  CreatorCustomLink,
  CreatorProfilePage,
  creatorProfileLoader,
  DiscoverCampaign,
  discoverCampaignLoader,
  RequestsPage,
  RequestsPageLoader,
  ResourcesPage,
  Invoices,
  CreateInvoice,
  ShowInvoice,
  ShowInvoiceLoader,
  SearchCreatorLinkTreePageAction,
  CreatorInvoiceAction,
  InvoicesLoader,
  CreatorDashboardPageLoader,
  SupportPage,
  ResourcesPageLoader,
} from '../pages'

export const CreatorRoutes = (
  <>
    <Route path="dashboard" element={<Outlet />}>
      <Route
        index
        element={<CreatorDashboardPage />}
        loader={CreatorDashboardPageLoader}
      />
      <Route path="creator-custom-link" element={<CreatorCustomLink />} />
    </Route>
    <Route path="onboarding" element={<CreatorOnBoardingPage />} />
    <Route
      path="discover"
      element={<DiscoverCampaign />}
      loader={discoverCampaignLoader}
    />
    <Route
      path="profile"
      element={<CreatorProfilePage />}
      loader={creatorProfileLoader}
    />
    <Route
      path="requests"
      element={<RequestsPage />}
      loader={RequestsPageLoader}
    />
    <Route
      path="resources"
      element={<ResourcesPage />}
      action={SearchCreatorLinkTreePageAction}
      loader={ResourcesPageLoader}
    />
    <Route path="invoice" element={<Outlet />}>
      <Route index element={<Invoices />} loader={InvoicesLoader} />
      <Route
        path="create"
        element={<CreateInvoice />}
        action={CreatorInvoiceAction}
      />
      <Route
        path="show/:id"
        element={<ShowInvoice />}
        loader={ShowInvoiceLoader}
      />
    </Route>

    <Route path="support" element={<SupportPage />} />
  </>
)
