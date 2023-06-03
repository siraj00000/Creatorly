import { Suspense } from 'react'
import { Await, NavLink, defer, useLoaderData } from 'react-router-dom'
import { handleFetchAction } from '../../../../../utils/api'
import { GetResponse } from '../../../../../types/response.types'
import Loader from '../../../../../components/loader/loader'
import { CampaignTypes } from '../../../../../types/loader.types'
import CampaignCardList from '../../../../../components/card/CampaignCardList'
import { AiOutlinePlus } from 'react-icons/ai'

const SingleCreatorCampaignStatusPage = () => {
  const loaderData = useLoaderData() as CampaignTypes
  return (
    <main className="md:p-10 p-0 max-md:pb-[20%]">
      <div className="flex items-center justify-between p-2">
        <h1 className="text-4xl text-main font-bold uppercase">Campaigns</h1>
        <NavLink
          to={'/discover-creators?search'}
          className="flex items-center text-sm justify-center gap-2 text-center ml-auto ease-in duration-300  border-1 border-main bg-main text-white font-medium rounded-full p-2 px-4"
        >
          <AiOutlinePlus className="text-white" />
          Create Campaign
        </NavLink>
      </div>

      <Suspense fallback={<Loader />}>
        <Await resolve={loaderData} errorElement={<p>error</p>}>
          {(loaderCampaign: CampaignTypes) => (
            <div className="flex flex-col gap-2 mt-10">
              <CampaignCardList
                title="Pending"
                campaignInfo={loaderCampaign.pendingCampaigns}
              />
              <CampaignCardList
                title="On Going"
                campaignInfo={loaderCampaign.ongoingCampaigns}
              />
              <CampaignCardList
                title="Completed"
                campaignInfo={loaderCampaign.completedCampaigns}
              />
              <CampaignCardList
                title="Denied"
                campaignInfo={loaderCampaign.deniedCampaigns}
              />
            </div>
          )}
        </Await>
      </Suspense>
    </main>
  )
}

export default SingleCreatorCampaignStatusPage

export const loader = async () => {
  const response = (await handleFetchAction({
    url: `/api/brand-single-campaigns`,
  })) as GetResponse

  return defer(response.data.data)
}
