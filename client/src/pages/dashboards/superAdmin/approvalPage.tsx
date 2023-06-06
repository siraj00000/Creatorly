import { Suspense } from 'react'
import { handleFetchAction } from '../../../utils/api'
import { GetResponse } from '../../../types/response.types'
import { Await, defer, useLoaderData, useRevalidator } from 'react-router-dom'
import Loader from '../../../components/loader/loader'
import { campaignAttributes } from '../../../types/loader.types'
import PendingCampaignListComponent from '../../../components/card/PendingCampaignList'

type Props = {}

const ApprovalPage = (props: Props) => {
  const loaderData = useLoaderData() as { campaigns: campaignAttributes[] }
  const revalidator = useRevalidator()

  return (
    <main className="p-0 md:p-10 w-full max-md:pb-[30%]">
      <Suspense fallback={<Loader />}>
        <Await resolve={loaderData.campaigns} errorElement={<h1>Error</h1>}>
          {(loaderPendingCampaign) => (
            <section className="w-full">
              <PendingCampaignListComponent
                title="Waiting for approval"
                campaignInfo={loaderPendingCampaign}
                revalidator={revalidator.revalidate}
              />
            </section>
          )}
        </Await>
      </Suspense>
    </main>
  )
}

export default ApprovalPage

export const loader = async () => {
  const response = (await handleFetchAction({
    url: `/api/combined-pending-campaigns`,
  })) as GetResponse

  return defer({ campaigns: response.data.data })
}
