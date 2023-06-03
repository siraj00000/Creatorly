import { Route } from 'react-router-dom'

import { ApprovalPage, ApprovalPageLoader, SuperAdminDashboard, SuperAdminDashboardLoader, SuperAdminOnBoardingPage } from '../pages'

export let SuperAdminRoutes = (
  <>
    <Route path="onboarding" element={<SuperAdminOnBoardingPage />} />
    <Route path="dashboard" element={<SuperAdminDashboard />} loader={SuperAdminDashboardLoader} />
    <Route path="approvals" element={<ApprovalPage />} loader={ApprovalPageLoader} />
  </>
)
