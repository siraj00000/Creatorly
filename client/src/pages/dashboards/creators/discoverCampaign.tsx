import React, { Suspense } from 'react'
import { handleFetchAction } from '../../../utils/api'
import { GetResponse } from '../../../types/response.types'
import { Await, defer, useLoaderData } from 'react-router-dom'
import { CampaignTypes } from '../../../types/loader.types'
import CampaignCardList from '../../../components/card/CampaignCardList'
import Loader from '../../../components/loader/loader'

const DiscoverCampaign = () => {
  const loaderData = useLoaderData() as CampaignTypes

  return (
    <main>
      <Suspense fallback={<Loader />}>
        <Await resolve={loaderData} errorElement={<p>error</p>}>
          {(loaderCampaign: CampaignTypes) => (
            <div className="flex flex-col gap-2 mt-10">
              <CampaignCardList
                title="On Going"
                campaignInfo={loaderCampaign.ongoingCampaigns}
              />
              <CampaignCardList
                title="Completed"
                campaignInfo={loaderCampaign.completedCampaigns}
              />
            </div>
          )}
        </Await>
      </Suspense>
    </main>
  )
}

export default DiscoverCampaign

export const loader = async () => {
  const response = (await handleFetchAction({
    url: `/api/creator-campaigns`,
  })) as GetResponse
  return defer(response.data.data)
}
