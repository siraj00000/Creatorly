import { SiProgress } from 'react-icons/si'
import ProgressCard from '../../../components/card/ProgressCard'
import { handleFetchAction } from '../../../utils/api'
import { GetResponse } from '../../../types/response.types'
import { Await, defer, useLoaderData, useRevalidator } from 'react-router-dom'
import { Suspense, Fragment } from 'react'
import PendingUILoader from '../../../components/loader/pendingUILoader'
import {
  BrandStatisticsLoaderResponse,
  BrandStatsData,
} from '../../../types/others.types'
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
  totalCampaignsExecuted,
  totalCampaignsPending,
  totalProposals,
}: BrandStatsData) => {
  return (
    <section className="flex items-center justify-between flex-wrap max-md:flex-col gap-4 my-5">
      <ProgressCard
        title="Total Campaigns Executed"
        progressHolder="onboard"
        count={totalCampaignsExecuted}
      />
      <ProgressCard
        title="Total Proposals"
        progressHolder="onboard"
        count={totalProposals}
      />
      <ProgressCard
        title="Total Pending Campaign"
        progressHolder="onboard"
        count={totalCampaignsPending}
      />
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
const BrandAgencyDashboard = () => {
  const { stats } = useLoaderData() as {
    stats: BrandStatisticsLoaderResponse
  }
  const revalidator = useRevalidator()
  return (
    <main className='max-md:pb-[20%]'>
      <Greetings />
      <Suspense fallback={<PendingUILoader />}>
        <Await resolve={stats.data} errorElement={<h1>Error boundary!!</h1>}>
          {(statistics) => (
            <Fragment>
              <DatePicker revalidator={revalidator.revalidate} />
              <InfluencerStatistics {...statistics} />
            </Fragment>
          )}
        </Await>
      </Suspense>
    </main>
  )
}

export default BrandAgencyDashboard

export const loader = async () => {
  const month = Cookies.get('__Month')
  const response = (await handleFetchAction({
    url: `/api/brand-analytics/${Number(month)}`,
  })) as GetResponse

  return defer({ stats: response.data })
}
