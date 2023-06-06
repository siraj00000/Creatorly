import { SiProgress } from 'react-icons/si'
import ProgressCard from '../../../components/card/ProgressCard'
import { handleFetchAction } from '../../../utils/api'
import { GetResponse } from '../../../types/response.types'
import {
  Await,
  NavLink,
  defer,
  useLoaderData,
  useRevalidator,
} from 'react-router-dom'
import { Suspense, Fragment } from 'react'
import PendingUILoader from '../../../components/loader/pendingUILoader'
import {
  CreatorStatisticsLoaderResponse,
  CreatorStatsData,
} from '../../../types/others.types'
import DatePicker from '../../../components/other/datePicker'
import Cookies from 'js-cookie'
import { decryptData } from '../../../utils/encryption'
import { BsArrowUpRightCircleFill } from 'react-icons/bs'
import { useMemo } from 'react'
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
 * A component that render a section for Statistics
 * */
const InfluencerStatistics = ({
  revenueEarned,
  pendingPayments,
  totalCampaigns,
}: CreatorStatsData) => {
  return (
    <section className="flex items-center justify-between flex-wrap max-md:flex-col gap-4 my-5">
      <ProgressCard
        title="Revenue Earned"
        progressHolder="onboard"
        count={revenueEarned}
      />
      <ProgressCard
        title="Total Campaigns"
        progressHolder="onboard"
        count={totalCampaigns}
      />
      <ProgressCard
        title="Pending Payments"
        progressHolder="onboard"
        count={pendingPayments}
      />
    </section>
  )
}

/**
 * A component that render a section for Feature buttons
 * */
const CreatorFeature = () => {
  const generateLink = () => {
    let _link
    const CATCH_CRET = Cookies.get('CATCH_CRET')
    if (CATCH_CRET) {
      _link = decryptData(CATCH_CRET!)
    } else {
      _link = ''
    }

    return _link
  }
  let userLink = useMemo(() => generateLink(), [])
  return (
    <section className="flex items-center max-md:w-full w-1/2 gap-5 my-10">
      <NavLink
        title="claim custom link"
        to="creator-custom-link"
        className="flex items-center justify-center gap-4 max-md:flex-1 px-5 py-2 rounded-md border-ligth hover:shadow-xl border-main border-2 border-l-8 font-light"
      >
        <span>
          creatorly.in/@
          <strong className="font-semibold">{userLink}</strong>
        </span>

        <BsArrowUpRightCircleFill />
      </NavLink>
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
const CreatorDashboard = () => {
  const { stats } = useLoaderData() as {
    stats: CreatorStatisticsLoaderResponse
  }
  const revalidator = useRevalidator()
  return (
    <main className="max-md:pb-[20%]">
      <Greetings />
      <Suspense fallback={<PendingUILoader />}>
        <Await resolve={stats.data} errorElement={<h1>Error boundary!!</h1>}>
          {(statistics) => (
            <Fragment>
              <div className="flex items-center md:justify-between max-md:flex-col w-full">
                <CreatorFeature />
                <DatePicker revalidator={revalidator.revalidate} />
              </div>
              <InfluencerStatistics {...statistics} />
            </Fragment>
          )}
        </Await>
      </Suspense>
    </main>
  )
}

export default CreatorDashboard

export const loader = async () => {
  const month = Cookies.get('__Month')
  const response = (await handleFetchAction({
    url: `/api/creator-analytics/${Number(month)}`,
  })) as GetResponse

  return defer({ stats: response.data })
}
