import React, { useState } from 'react'
import { SingleCampaignFormProps } from '../../../types/campaignForm.types'
import { handleInsertAction } from '../../../utils/api'
import { ApiErrorResponse, UploadResponse } from '../../../types/response.types'
import { Form, useNavigate } from 'react-router-dom'
import TagComp from './PreviewComponents/TagComp'
import SingleCreatorNameBox from './PreviewComponents/SingleCreatorNameBox'
import { decryptData } from '../../../utils/encryption'

type Props = {
  alreadyChoosedCreator: any
}

const SingleCreatorCampaignPreview: React.FC<
  SingleCampaignFormProps & Props
> = ({
  activeTab,
  values,
  decrementTab,
  updateStatus,
  alreadyChoosedCreator,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  let isActiveTab = activeTab === 2

  const encryptedCreatorId = sessionStorage.getItem('_#@ena')
  const decryptedCreatorId =
    !alreadyChoosedCreator[0] && decryptData(encryptedCreatorId!)

  const createCampaign = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData()
    if (values.campaign_image) {
      formData.append('campaign_image', values.campaign_image)
    }
    let data = {
      ...values,
      formData,
      creators_id: alreadyChoosedCreator[0]
        ? alreadyChoosedCreator[0]
        : decryptedCreatorId,
    }

    try {
      const response = (await handleInsertAction({
        url: `/api/single-campaign`,
        data,
        type: 'multipart/form-data',
      })) as UploadResponse

      if (response) {
        setIsSubmitting(false)
        updateStatus({
          successMessage: response.data.message,
          errorMessage: '',
        })
        setTimeout(() => {
          navigate('/single-creator-campaign', { replace: true })
        }, 1000)
      }
    } catch (error) {
      let err = error as ApiErrorResponse
      console.log(err)

      updateStatus({ successMessage: '', errorMessage: err.response.data })
    }
  }

  return (
    <main className={`${isActiveTab ? 'flex flex-col gap-10' : 'hidden'}`}>
      <SingleCreatorNameBox values={values} />

      {/* Campaign Details */}
      <section>
        <h1 className="text-xl font-semibold text-black mb-4">
          Campaign Details
        </h1>
        <aside className="flex flex-col gap-4">
          <TagComp label="Description" value={values.campaign_brief} />
          <div className="flex items-center justify-between flex-wrap gap-4 w-3/4">
            <TagComp label="Budget" value={'₹ ' + values.budget} />
            <TagComp label="Product Link" value={values.product_link} />
          </div>
          <TagComp label="About product" value={values.about_product} />
          <TagComp label="Start Date" value={values.start_date} />
        </aside>
      </section>

      <Form
        onSubmit={createCampaign}
        className="flex items-center justify-between my-10 w-full md:w-3/4"
      >
        <button
          disabled={!isActiveTab}
          onClick={decrementTab}
          type="button"
          className={`${
            !isActiveTab ? 'bg-gray-200 cursor-not-allowed' : 'bg-main'
          } text-white mr-auto flex items-center justify-center gap-2 ease-in duration-300 hover:-translate-y-1 hover:scale-110 font-medium rounded-full p-3 px-5`}
        >
          Back
        </button>
        <button
          disabled={isSubmitting}
          type="submit"
          className={`bg-main text-white ml-auto flex items-center justify-center gap-2 ease-in duration-300 hover:-translate-y-1 hover:scale-110 font-medium rounded-full p-3 px-5`}
        >
          {isSubmitting ? 'Submitting...' : 'Save'}
        </button>
      </Form>
    </main>
  )
}

export default SingleCreatorCampaignPreview
