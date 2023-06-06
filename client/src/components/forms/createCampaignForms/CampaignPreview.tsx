import React, { useState } from 'react'
import { CampaignFormProps } from '../../../types/campaignForm.types'
import { handleInsertAction } from '../../../utils/api'
import { ApiErrorResponse, UploadResponse } from '../../../types/response.types'
import { Form, useNavigate } from 'react-router-dom'
import NameBox from './PreviewComponents/NameBox'
import TagComp from './PreviewComponents/TagComp'
import TagListComp from './PreviewComponents/TagListComp'

const CampaignPreview: React.FC<CampaignFormProps> = ({
  activeTab,
  values,
  decrementTab,
  updateStatus,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  let isActiveTab = activeTab === 4
  const createCampaign = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData()
    if (values.campaign_image) {
      formData.append('campaign_image', values.campaign_image)
    }
    let data = { ...values, formData }
    try {
      const response = (await handleInsertAction({
        url: `/api/campaign`,
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
          navigate('/multi-creator-campaign', { replace: true })
        }, 500)
      }
    } catch (error) {
      let err = error as ApiErrorResponse

      updateStatus({
        successMessage: '',
        errorMessage: err.error ? err.error : err.response.data,
      })
    }
  }

  return (
    <main className={`${isActiveTab ? 'flex flex-col gap-10' : 'hidden'}`}>
      <NameBox values={values} />

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
        </aside>
      </section>

      {/* Target Audience */}
      <section>
        <h1 className="text-xl font-semibold text-black mb-4">
          Target Audience
        </h1>
        <aside className="flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-4 w-3/4">
            <TagListComp label="Gender" tagList={values.gender_of_audience!} />
            <TagComp
              label="Age"
              value={`${values.age_of_audience.min} to ${values.age_of_audience.max}`}
            />
          </div>
          <TagListComp label="Location" tagList={values.location!} />
        </aside>
      </section>

      {/* Execution Details */}
      <section>
        <h1 className="text-xl font-semibold text-black mb-4">
          Execution Details
        </h1>
        <aside className="flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-4 w-3/4">
            <TagComp label="Start Date" value={values.start_date} />
            <TagComp label="End Date" value={values.end_date} />
          </div>
          <TagListComp
            label="Creator type"
            tagList={values.type_of_influencers!}
          />
          <div className="flex items-center justify-between flex-wrap gap-4 w-3/4">
            <TagListComp
              label="Creator Category"
              tagList={values.creator_category!}
            />
            <TagListComp
              label="Platform"
              tagList={values.social_media_platform!}
            />
          </div>
          <TagComp label="Hashtags" value={values.hashtags} />
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

export default CampaignPreview
