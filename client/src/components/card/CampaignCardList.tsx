import React from 'react'
import { campaignAttributes } from '../../types/loader.types'
import Avatar from '../other/avatar'

type props = {
  campaignInfo: campaignAttributes[]
  title: string
}

const CampaignCardList: React.FC<props> = ({ title, campaignInfo }) => {
  return (
    <aside className="mt-5">
      <h1 className="text-2xl text-black font-semibold">{title} Campaign</h1>
      <section className="w-full grid md:grid-cols-2 gap-5">
        {campaignInfo.map((campaign) => (
          <div
            className="flex items-center gap-5 rounded-md shadow-xl p-5"
            key={campaign?._id}
          >
            <div className="w-24">
              <Avatar
                imageURL={campaign?.campaign_image?.url}
                title={campaign?.campaign_name}
                sizeX="16"
                sizeY="16"
              />
            </div>
            <div className="w-full flex items-center justify-between gap-4">
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
          </div>
        ))}
      </section>
      {campaignInfo.length === 0 && (
        <section>
          <h5 className="text-sm text-main bg-light my-2 py-5 px-2 rounded-md border-1 border-dashed border-main capitalize">
            Empty
          </h5>
        </section>
      )}
    </aside>
  )
}

export default CampaignCardList
