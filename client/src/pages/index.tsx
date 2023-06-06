// Auth Pages
export { default as WhoYouArePage } from './auth/WhoYouArePage'
export {
  default as LoginPage,
  action as userLoginAction,
} from './auth/LoginPage'
export {
  default as UserSignUp,
  action as userRegisterAction,
} from './auth/SignupPage'

// Home Page
export { default as HomePage } from './homePage'

// Super Admin's Pages
export { default as SuperAdminOnBoardingPage } from './dashboards/superAdmin/superAdminOnBoardingPage'
export {
  default as SuperAdminDashboard,
  loader as SuperAdminDashboardLoader,
} from './dashboards/superAdmin/superAdminDashboard'
export {
  default as ApprovalPage,
  loader as ApprovalPageLoader,
} from './dashboards/superAdmin/approvalPage'
export {
  default as Blogs,
  loader as BlogsLoader,
} from './dashboards/superAdmin/blogs'
export {
  default as CreateBlogs,
  action as createBlogsAction,
} from './dashboards/superAdmin/blogs/createBlogs'
export {
  default as EditBlogs,
  action as editBlogsAction,
} from './dashboards/superAdmin/blogs/editBlogs'

// Creator's Pages
export { default as CreatorOnBoardingPage } from './dashboards/creators/creatorOnBoardingPage'
export {
  default as CreatorDashboardPage,
  loader as CreatorDashboardPageLoader,
} from './dashboards/creators/creatorDashboardPage'
export {
  default as DiscoverCampaign,
  loader as discoverCampaignLoader,
} from './dashboards/creators/discoverCampaign'
export {
  default as CreatorProfilePage,
  creatorProfileLoader,
} from './dashboards/creators/creatorProfilePage'
export { default as CreatorCustomLink } from './dashboards/creators/creatorCustomLink' // main
export {
  default as RequestsPage,
  loader as RequestsPageLoader,
} from './dashboards/creators/requestsPage'
export {
  default as SearchCreatorLinkTreePage,
  action as SearchCreatorLinkTreePageAction,
} from './dashboards/creators/searchCreatorLinkTreePage'
export { default as ResourcesPage, loader as ResourcesPageLoader } from './dashboards/creators/resourcesPage'
export {
  default as Invoices,
  loader as InvoicesLoader,
} from './dashboards/creators/invoice'
export {
  default as CreateInvoice,
  action as CreatorInvoiceAction,
} from './dashboards/creators/invoice/createInvoice'
export {
  default as ShowInvoice,
  loader as ShowInvoiceLoader,
} from './dashboards/creators/invoice/showInvoice'

// Brand or Agency's Pages
export {
  default as BrandOrAgencyDashboard,
  loader as BrandOrAgencyDashboardLoader,
} from './dashboards/brandOrAgency/brandOrAgencyDashboard'
export { default as BrandOrAgencyOnBoardingPage } from './dashboards/brandOrAgency/brandOrAgencyOnBoardingPage'
export { default as CreateBrandCampaign } from './dashboards/brandOrAgency/campaign/multi/createBrandCampaign'
export { default as CreateSingleBrandCampaign } from './dashboards/brandOrAgency/campaign/single/createSingleCreatorCampaign'
export {
  default as SingleCreatorCampaignStatusPage,
  loader as singleCreatorCampaignLoader,
} from './dashboards/brandOrAgency/campaign/single/singleCreatorCampaignStatusPage'
export {
  default as BrandCampaignStatusPage,
  loader as multiCreatorCampaignsLoader,
} from './dashboards/brandOrAgency/campaign/multi/BrandCampaignStatusPage'
export {
  default as MyBrand,
  loader as myBrandDataLoader,
} from './dashboards/brandOrAgency/myBrand'
export { default as AddBrand } from './dashboards/brandOrAgency/myBrand/addBrand'
export {
  default as SingleCreatorProfile,
  loader as SingleCreatorLoader,
} from './dashboards/brandOrAgency/creatorProfile'
export {
  default as DiscoverCreators,
  loader as DiscoverCreatorsLoader,
} from './dashboards/brandOrAgency/discoverCreators'

// Others
export { default as PageNotFound } from './others/404page'
export { default as ErrorPage } from './others/ErrorPage'

// Link Tree
export { default as CreatorLinkTree, linkTreeLoader } from './linkTree'
export { default as LinkTreeErrorPage } from './linkTree/linkTreeErrorPage'

export { default as SupportPage } from './dashboards/supportPage'
