import { useState } from 'react'
import { CampaignFormProps } from '../../../types/campaignForm.types'
import MultiSelectListboxComponentTypes from '../../listBox/multiSelectListBox'
import { typesOfInfluencersList } from '../../../constants/typesOfinfluencers.types'
import { socialMediaPlatformList } from '../../../constants/campaign'
import { categorySelectPropertiesList } from '../../../constants/categoryList'

const ExecutionDetailsForm = ({
  activeTab,
  incrementTab,
  decrementTab,
  onChange,
  updateValues,
  updateStatus,
  formRef,
  values,
}: CampaignFormProps) => {
  const [selectedTypeOfInfluencers, setSelectedTypeOfInfluencers] = useState<
    string[] | null
  >(null)
  const [
    selectedSocialMediaPlatform,
    setSelectedSocialMediaPlatform,
  ] = useState<string[] | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string[] | null>(
    null,
  )
  const addValues = () => {
    if (updateValues) {
      updateValues((prev) => ({
        ...prev,
        type_of_influencers:
          selectedTypeOfInfluencers && selectedTypeOfInfluencers,
        social_media_platform:
          selectedSocialMediaPlatform && selectedSocialMediaPlatform,
        creator_category: selectedCategory && selectedCategory,
      }))
    }
  }
  const onNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const startDate = e.currentTarget.elements.namedItem(
      'start_date',
    ) as HTMLInputElement

    const endDate = e.currentTarget.elements.namedItem(
      'end_date',
    ) as HTMLTextAreaElement

    const requiredFields = [
      { field: 'Start Date', value: startDate.value },
      { field: 'End Date', value: endDate.value },
      { field: 'Type Of Influencers', value: selectedTypeOfInfluencers },
      { field: 'Social Media Platform', value: selectedSocialMediaPlatform },
      { field: 'Creator Category', value: selectedCategory },
    ]

    for (const requiredField of requiredFields) {
      if (!requiredField.value) {
        updateStatus({
          errorMessage: `${requiredField.field} is required`,
          successMessage: '',
        })

        // scroll to the top of the form
        formRef && formRef.current?.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }

    addValues()

    if (incrementTab && requiredFields.every((field) => field.value)) {
      updateStatus({
        errorMessage: ``,
        successMessage: '',
      })
      incrementTab()
    }
  }

  // Get today's date in ISO format (YYYY-MM-DD)
  const today = new Date().toISOString().split('T')[0]
  const minEndDate = values.start_date
    ? new Date(values.start_date).toISOString().split('T')[0]
    : today

  let isActiveTab = activeTab === 1
  return (
    <main className={`${isActiveTab ? 'flex' : 'hidden'}`}>
      <form className="w-full" onSubmit={onNext}>
        <section className="flex flex-col gap-3">
          <div className="w-full flex items-center gap-5 flex-col md:flex-row">
            <div className="w-full relative flex-1">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Start Date
              </label>
              <input
                className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type={'date'}
                name={'start_date'}
                min={today}
                onChange={onChange}
              />
            </div>
            <div className="w-full relative flex-1">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                End Date
              </label>
              <input
                className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type={'date'}
                name={'end_date'}
                min={minEndDate}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="w-full relative">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Type Of Influencers
            </label>
            <MultiSelectListboxComponentTypes
              selectedItem={selectedTypeOfInfluencers}
              updateSelectedItem={setSelectedTypeOfInfluencers}
              itemsList={typesOfInfluencersList}
              type="type Of Influencers"
            />
          </div>

          <div className="w-full relative">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Social Media Platform
            </label>
            <MultiSelectListboxComponentTypes
              selectedItem={selectedSocialMediaPlatform}
              updateSelectedItem={setSelectedSocialMediaPlatform}
              itemsList={socialMediaPlatformList}
              type="social media platform"
            />
          </div>

          <div className="w-full relative">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Creator Category
            </label>
            <MultiSelectListboxComponentTypes
              selectedItem={selectedCategory}
              updateSelectedItem={setSelectedCategory}
              itemsList={categorySelectPropertiesList}
              type="category"
            />
          </div>
        </section>
        <section className="w-full flex items-center justify-between my-10">
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
            disabled={!isActiveTab}
            type="submit"
            className={`${
              !isActiveTab ? 'bg-gray-200 cursor-not-allowed' : 'bg-main'
            } text-white ml-auto flex items-center justify-center gap-2 ease-in duration-300 hover:-translate-y-1 hover:scale-110 font-medium rounded-full p-3 px-5`}
          >
            Next
          </button>
        </section>
      </form>
    </main>
  )
}

export default ExecutionDetailsForm
