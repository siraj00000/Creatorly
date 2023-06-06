import React from 'react'
import Avatar from '../../../other/avatar'
import { SingleCreatorCampaignType } from '../../../../types/campaignForm.types'

type Props = {
  values: SingleCreatorCampaignType
}

const SingleCreatorNameBox: React.FC<Props> = ({ values }) => {
  return (
    <section className="flex items-center gap-5">
      <Avatar title="siraj" imageURL={values.imageURL} sizeX="32" sizeY="32" />
      <aside>
        <h1 className="text-2xl font-semibold text-black">
          {values.campaign_name}
        </h1>
        <p className="text-md text-black font-medium">
          {values.campaign_objective}
        </p>
      </aside>
    </section>
  )
}

export default SingleCreatorNameBox
