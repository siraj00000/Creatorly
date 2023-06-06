import React from 'react'
import { campaignAttributes } from '../../types/loader.types'
import Avatar from '../other/avatar'
import { handleUpdateAction } from '../../utils/api'
import { ApiErrorResponse, ApiResponse } from '../../types/response.types'
import swal from 'sweetalert'

type props = {
  campaignInfo: campaignAttributes[]
  title: string
  revalidator: () => void
}

const PendingCampaignListComponent: React.FC<props> = ({
  title,
  campaignInfo,
  revalidator,
}) => {
  const approveCampaign = async (id: string) => {
    try {
      ;(await handleUpdateAction({
        url: `/api/campaign-update/${id}`,
        data: { status: 'approved' },
      })) as ApiResponse

      swal('Approved!', 'You approved campaign', 'success')
      revalidator()
    } catch (error) {
      let err = error as ApiErrorResponse
      swal('Error!', err.response.data.message)
    }
  }

  const denyCampaign = async (id: string) => {
    ;(await handleUpdateAction({
      url: `/api/campaign-update/${id}`,
      data: { status: 'denied' },
    })) as ApiResponse

    swal('Denied!', 'You denied this campaign', 'success')
    revalidator()
  }

  return (
    <aside className="md:mt-0 mt-5">
      <h1 className="text-2xl text-black font-semibold mb-10">{title}</h1>
      <section className="w-full grid grid-cols-1 gap-5">
        {campaignInfo.map((campaign) => (
          <div
            className="flex items-center max-md:flex-wrap gap-10 rounded-md shadow-xl p-5 w-full"
            key={campaign?._id}
          >
            <div className="flex items-center justify-between w-full">
              <div className="lg:w-24 w-20">
                <Avatar
                  imageURL={campaign?.campaign_image?.url}
                  title={campaign?.campaign_name}
                  sizeX="16"
                  sizeY="16"
                />
              </div>

              {/* Visible in md */}
              <div className="flex flex-col items-end gap-2 md:hidden">
                <button
                  onClick={() => approveCampaign(campaign._id)}
                  className="w-32 bg-main text-md text-white rounded-md py-1 px-3"
                >
                  Approve
                </button>
                <button
                  onClick={() => denyCampaign(campaign._id)}
                  className="w-32 bg-white text-md text-main border-1 rounded-md py-1 px-3"
                >
                  Deny
                </button>
              </div>
            </div>
            <div className="w-full flex items-center max-md:flex-wrap justify-between gap-4">
              <div className="">
                <h5 className="text-lg text-main font-semibold capitalize">
                  {campaign?.campaign_name}
                </h5>
                <h5 className="">₹ {campaign?.budget}</h5>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2">
                  <h5 className="text-xs">Start Date</h5>
                  <h5 className="bg-light py-1 px-4 rounded-full text-xs text-main">
                    {campaign?.start_date.split('T')[0]}
                  </h5>
                </div>
                {campaign?.end_date && (
                  <>
                    <div className="h-5 border-x-2 border-main mr-10"></div>
                    <div className="flex items-center gap-2">
                      <h5 className="text-xs">End Date</h5>
                      <h5 className="bg-light py-1 px-4 rounded-full text-xs text-main">
                        {campaign?.end_date.split('T')[0]}
                      </h5>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="md:flex flex-col items-end gap-2 hidden">
              <button
                onClick={() => approveCampaign(campaign._id)}
                className="w-32 bg-main text-md text-white rounded-md py-1 px-3"
              >
                Approve
              </button>
              <button
                onClick={() => denyCampaign(campaign._id)}
                className="w-32 bg-white text-md text-main border-1 rounded-md py-1 px-3"
              >
                Deny
              </button>
            </div>
          </div>
        ))}
      </section>
      {campaignInfo.length === 0 && (
        <section>
          <h5 className="text-sm bg-light text-main font-semibold my-2 py-3 px-2 rounded-md border-1 border-dashed border-main capitalize">
            Empty
          </h5>
        </section>
      )}
    </aside>
  )
}

export default PendingCampaignListComponent
