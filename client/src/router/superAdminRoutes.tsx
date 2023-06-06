import { Outlet, Route } from 'react-router-dom'

import {
  ApprovalPage,
  ApprovalPageLoader,
  Blogs,
  BlogsLoader,
  CreateBlogs,
  EditBlogs,
  SuperAdminDashboard,
  SuperAdminDashboardLoader,
  SuperAdminOnBoardingPage,
  createBlogsAction,
  editBlogsAction,
} from '../pages'

export let SuperAdminRoutes = (
  <>
    <Route path="onboarding" element={<SuperAdminOnBoardingPage />} />
    <Route
      path="dashboard"
      element={<SuperAdminDashboard />}
      loader={SuperAdminDashboardLoader}
    />
    <Route
      path="approvals"
      element={<ApprovalPage />}
      loader={ApprovalPageLoader}
    />
    <Route path="blog" element={<Outlet />}>
      <Route index element={<Blogs />} loader={BlogsLoader} />
      <Route
        path="create"
        element={<CreateBlogs />}
        action={createBlogsAction}
      />
      <Route
        path=":id/edit"
        element={<EditBlogs />}
        action={editBlogsAction}
      />
    </Route>
  </>
)
