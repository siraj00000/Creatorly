import React, { useEffect, useState } from 'react'
import {
  CampaignFormProps,
  UserProfileWithUser,
} from '../../../types/campaignForm.types'
import { handleInsertAction } from '../../../utils/api'
import { ApiResponse } from '../../../types/response.types'
import TableComponent from '../../tables'

type Props = {
  alreadyChoosedCreator?: any
}

const ChooseCreator: React.FC<CampaignFormProps & Props> = ({
  activeTab,
  values,
  updateValues,
  decrementTab,
  incrementTab,
  alreadyChoosedCreator,
}) => {
  const [creatorsList, setCreatorsList] = useState<
    UserProfileWithUser[] | null
  >(null)
  const [userNameQuery, setUserNameQuery] = useState<string>('')

  const fetchCreators = async () => {
    try {
      const response = (await handleInsertAction({
        url: `/api/fetch-profile?userName=${userNameQuery}`,
        data: { category: values.creator_category, region: values.location },
      })) as ApiResponse

      setCreatorsList(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCreators()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.creator_category, values.location])

  useEffect(() => {
    fetchCreators()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userNameQuery])

  const onCreatorSelect = (creator_ids: Array<string>) => {
    if (updateValues) {
      updateValues((prev) => ({ ...prev, creators_id: creator_ids }))
    }
  }

  let isActiveTab = activeTab === 3
  return (
    <main className={`${isActiveTab ? 'flex' : 'hidden'}`}>
      <aside className="w-full">
        <section className="flex flex-col gap-3">
          <h1 className="text-2xl font-semibold">Suggested Creators</h1>
          <p className="text-md">
            The below list is based on the data you have provided in the
            previous step.
          </p>
        </section>
        {/* Creators */}
        <section className="w-full my-10">
          {creatorsList && (
            <TableComponent
              data={creatorsList}
              handleSearch={setUserNameQuery}
              onCreatorSelect={onCreatorSelect}
              alreadyChoosedCreator={alreadyChoosedCreator}
            />
          )}
        </section>
        <section className="w-full flex items-center justify-between my-10">
          <button
            disabled={!isActiveTab}
            onClick={decrementTab}
            className={`${
              !isActiveTab ? 'bg-gray-200 cursor-not-allowed' : 'bg-main'
            } text-white mr-auto flex items-center justify-center gap-2 ease-in duration-300 hover:-translate-y-1 hover:scale-110 font-medium rounded-full p-3 px-5`}
          >
            Back
          </button>
          <button
            disabled={
              !isActiveTab ||
              values.creators_id?.length === 0 ||
              values.creators_id === null
            }
            onClick={incrementTab}
            className={`${
              !isActiveTab ? 'bg-gray-200 cursor-not-allowed' : 'bg-main'
            } text-white ml-auto flex items-center justify-center gap-2 ease-in duration-300 hover:-translate-y-1 hover:scale-110 font-medium rounded-full p-3 px-5`}
          >
            Next
          </button>
        </section>
      </aside>
    </main>
  )
}

export default React.memo(ChooseCreator)
