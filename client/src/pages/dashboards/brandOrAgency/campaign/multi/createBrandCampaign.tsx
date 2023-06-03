import { useState, useRef } from 'react'
import AboutCampaignForm from '../../../../../components/forms/createCampaignForms/AboutCampaignForm'
import ExecutionDetailsForm from '../../../../../components/forms/createCampaignForms/ExecutionDetailsForm'
import ProductDetailsForm from '../../../../../components/forms/createCampaignForms/ProductDetailsForm'
import ChooseCreator from '../../../../../components/forms/createCampaignForms/ChooseCreator'
import { CampaingValueSchemaType } from '../../../../../types/campaignForm.types'
import { campaignValueSchema } from '../../../../../constants/campaign'
import ErrorAlert from '../../../../../components/alerts/errorAlert'
import SuccessAlert from '../../../../../components/alerts/successAlert'
import CampaignPreview from '../../../../../components/forms/createCampaignForms/CampaignPreview'
import { ActiveTabComponent } from '../../../../../components/other/tabs'
import { useLocation } from 'react-router-dom'

const CreateBrandCampaign = () => {
  const { state: creators_id } = useLocation()
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState({ errorMessage: '', successMessage: '' })
  campaignValueSchema['creators_id'] = creators_id
  const [values, setValues] = useState<CampaingValueSchemaType>(
    campaignValueSchema,
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
    <main className="py-10 lg:px-24 w-full" ref={formRef}>
      {/* Tabs */}
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
          tabTitle="Execution Details"
        />
        <div className="flex-1 h-0 border-t-1 bg-gray-400" />
        <ActiveTabComponent
          activeIndex={activeTab}
          tabIndex={2}
          tabTitle="Product Details"
        />
        <div className="flex-1 h-0 border-t-1 bg-gray-400" />
        <ActiveTabComponent
          activeIndex={activeTab}
          tabIndex={3}
          tabTitle="Choose Creators"
        />
        <div className="flex-1 h-0 border-t-1 bg-gray-400" />
        <ActiveTabComponent
          activeIndex={activeTab}
          tabIndex={4}
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
        <AboutCampaignForm
          activeTab={activeTab}
          updateActiveTab={setactiveTab}
          incrementTab={incrementTab}
          onChange={onChange}
          updateValues={setValues}
          updateStatus={setStatus}
          values={values}
          formRef={formRef}
        />
        <ExecutionDetailsForm
          activeTab={activeTab}
          updateActiveTab={setactiveTab}
          updateValues={setValues}
          incrementTab={incrementTab}
          decrementTab={decrementTab}
          onChange={onChange}
          updateStatus={setStatus}
          values={values}
          formRef={formRef}
        />
        <ProductDetailsForm
          activeTab={activeTab}
          updateActiveTab={setactiveTab}
          incrementTab={incrementTab}
          decrementTab={decrementTab}
          onChange={onChange}
          updateStatus={setStatus}
          values={values}
        />
        <ChooseCreator
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
        <CampaignPreview
          activeTab={activeTab}
          updateActiveTab={setactiveTab}
          incrementTab={incrementTab}
          decrementTab={decrementTab}
          onChange={onChange}
          updateValues={setValues}
          updateStatus={setStatus}
          values={values}
        />
      </section>
    </main>
  )
}

export default CreateBrandCampaign
