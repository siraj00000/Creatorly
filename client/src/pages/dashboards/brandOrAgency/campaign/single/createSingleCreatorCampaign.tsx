import React, { useRef, useState } from 'react'
import { ActiveTabComponent } from '../../../../../components/other/tabs'
import ErrorAlert from '../../../../../components/alerts/errorAlert'
import SuccessAlert from '../../../../../components/alerts/successAlert'
import { singleCampaignValueSchema } from '../../../../../constants/campaign'
import { SingleCreatorCampaignType } from '../../../../../types/campaignForm.types'
import AboutSingleCampaignForm from '../../../../../components/forms/createCampaignForms/AboutSingleCampaign'
import SingleCreatorProductDetailsForm from '../../../../../components/forms/createCampaignForms/SingleCreatorProductDetails'
import SingleCreatorCampaignPreview from '../../../../../components/forms/createCampaignForms/SingleCampaignPreview'
import { useLocation } from 'react-router-dom';

const SingleCreatorCampaign = () => {
  const { state: creators_id } = useLocation()
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState({ errorMessage: '', successMessage: '' })
  const [values, setValues] = useState<SingleCreatorCampaignType>(
    singleCampaignValueSchema,
  )
  const [activeTab, setactiveTab] = useState(0)
  const incrementTab = () => {
    if (activeTab !== 5) {
      setactiveTab(activeTab + 1)
    }
  }
  const decrementTab = () => {
    if (activeTab !== 0) {
      setactiveTab(activeTab - 1)
    }
  }
  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  return (
    <main className="py-10 md:px-24 w-full" ref={formRef}>
      <section className="flex items-center lg:justify-between flex-wrap gap-2 w-full">
        <ActiveTabComponent
          activeIndex={activeTab}
          tabIndex={0}
          tabTitle="About Campaign"
        />
        <div className="flex-1 h-0 border-t-1 bg-gray-400" />
        <ActiveTabComponent
          activeIndex={activeTab}
          tabIndex={1}
          tabTitle="Product Details"
        />
        <div className="flex-1 h-0 border-t-1 bg-gray-400" />
        <ActiveTabComponent
          activeIndex={activeTab}
          tabIndex={2}
          tabTitle="Campaign Preview"
        />
      </section>

      {/* Alerts */}
      <div className="mb-10 mt-4">
        <ErrorAlert errorMessage={status.errorMessage} />
        <SuccessAlert successMessage={status.successMessage} />
      </div>

      {/* Tabs Components */}
      <section>
        <AboutSingleCampaignForm
          activeTab={activeTab}
          updateActiveTab={setactiveTab}
          incrementTab={incrementTab}
          onChange={onChange}
          updateValues={setValues}
          updateStatus={setStatus}
          values={values}
          formRef={formRef}
        />
        <SingleCreatorProductDetailsForm
          activeTab={activeTab}
          updateActiveTab={setactiveTab}
          incrementTab={incrementTab}
          decrementTab={decrementTab}
          onChange={onChange}
          updateStatus={setStatus}
          values={values}
        />
        <SingleCreatorCampaignPreview
          activeTab={activeTab}
          updateActiveTab={setactiveTab}
          incrementTab={incrementTab}
          decrementTab={decrementTab}
          onChange={onChange}
          updateValues={setValues}
          updateStatus={setStatus}
          values={values}
          alreadyChoosedCreator={creators_id}
        />
      </section>
    </main>
  )
}

export default SingleCreatorCampaign
