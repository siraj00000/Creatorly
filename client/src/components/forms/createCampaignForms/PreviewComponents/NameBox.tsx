import React from 'react'
import { CampaingValueSchemaType } from '../../../../types/campaignForm.types'
import Avatar from '../../../other/avatar'

type Props = {
  values: CampaingValueSchemaType
}

const NameBox: React.FC<Props> = ({ values }) => {
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
        <div className="flex items-center gap-3 mt-4">
          {values.creator_category &&
            values.creator_category.map((item, index) => (
              <p
                key={index}
                className="py-1 px-3 bg-gray-300 text-sm font-medium rounded-full"
              >
                {item}
              </p>
            ))}
        </div>
      </aside>
    </section>
  )
}

export default NameBox
