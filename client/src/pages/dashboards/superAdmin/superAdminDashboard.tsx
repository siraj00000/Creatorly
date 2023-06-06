import { SiProgress } from 'react-icons/si'
import ProgressCard from '../../../components/card/ProgressCard'
import { handleFetchAction } from '../../../utils/api'
import { GetResponse } from '../../../types/response.types'
import { Await, defer, useLoaderData, useRevalidator } from 'react-router-dom'
import { Suspense, Fragment } from 'react'
import PendingUILoader from '../../../components/loader/pendingUILoader'
import {
  AdminStatisticsLoaderResponse,
  AdminStatsData,
} from '../../../types/others.types'
import { BarChart } from '../../../components/charts/BarChart'
import { LineChart } from '../../../components/charts/LineChart'
import DatePicker from '../../../components/other/datePicker'
import Cookies from 'js-cookie'

/***
 * Plan
 *    top @graphs Creators Onboarded, Brands and Agencies Onboarded, Total Campaigns
 *    middle @graphs Multi vs Single (Revenue) and Total revenue
 * / 

/**
 * A component that renders a section for greetings.
 */
const Greetings = () => {
  const currentTime = new Date().getHours()
  let greeting

  if (currentTime >= 12 && currentTime < 18) {
    greeting = 'Good afternoon!'
  } else if (currentTime >= 18 || currentTime < 6) {
    greeting = 'Good evening!'
  } else {
    greeting = 'Good morning!'
  }

  return (
    <section className="flex items-center gap-5 p-4 rounded-md mr-5 bg-opacity-25">
      <SiProgress size={30} />
      <span className="">
        <h1 className="text-2xl font-semibold text-main">{greeting}</h1>
        <p className="text-md font-medium text-gray-400">
          Just a quick update - we're on track
        </p>
      </span>
    </section>
  )
}

/**
 * A component that render a section for charts
 * */
const InfluencerStatistics = ({
  brandAgencyUsersCount,
  creatorUsersCount,
  totalCompletedCampaignCount,
}: AdminStatsData) => {
  return (
    <section className="flex items-center justify-between flex-wrap max-md:flex-col gap-4 my-5">
      <ProgressCard
        title="Creator"
        progressHolder="onboard"
        count={creatorUsersCount}
      />
      <ProgressCard
        title="Brand & Agency"
        progressHolder="onboard"
        count={brandAgencyUsersCount}
      />
      <ProgressCard
        title="Campaigns"
        progressHolder="onboard"
        count={totalCompletedCampaignCount}
      />
    </section>
  )
}

const CampaignStatistics = ({
  multiCreatorCampaignCount,
  singleCreatorCampaignCount,
  totalBudgetByInterval,
}: AdminStatsData) => {
  return (
    <section className="flex items-center justify-between flex-wrap gap-2 mt-10 max-md:mb-20">
      <div className="md:flex-1 w-full border-1 border-gray-300 rounded-md p-5">
        <h1>Multi vs Single . Campaign</h1>
        <BarChart
          mcccData={multiCreatorCampaignCount}
          scccData={singleCreatorCampaignCount}
        />
      </div>
      <div className="md:flex-1 w-full border-1 border-gray-300 rounded-md p-5">
        <h1>Total Campaign Revenue</h1>
        <LineChart totalBudgetByInterval={totalBudgetByInterval} />
      </div>
    </section>
  )
}
/**
 * A component that render a section for charts
 * */

/**
 * A dashboard component for super admins.
 *
 * @param {Props} props - The props for this component.
 * @returns {JSX.Element} - The SuperAdminDashboard component.
 */
const SuperAdminDashboard = () => {
  const { stats } = useLoaderData() as { stats: AdminStatisticsLoaderResponse }
  const revalidator = useRevalidator()
  return (
    <main>
      <Greetings />
      <Suspense fallback={<PendingUILoader />}>
        <Await resolve={stats.data} errorElement={<h1>Error boundary!!</h1>}>
          {(statistics) => (
            <Fragment>
              <DatePicker revalidator={revalidator.revalidate} />
              <InfluencerStatistics {...statistics} />
              <CampaignStatistics {...statistics} />
            </Fragment>
          )}
        </Await>
      </Suspense>
    </main>
  )
}

export default SuperAdminDashboard

export const loader = async () => {
  const month = Cookies.get('__Month')
  console.log(month);
  const response = (await handleFetchAction({
    url: `/api/analytics/${Number(month)}`,
  })) as GetResponse

  return defer({ stats: response.data })
}
