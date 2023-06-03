import React, { useCallback, useState } from 'react'
import ListboxComponent from '../../listBox'
import MultiSelectListboxComponentTypes from '../../listBox/multiSelectListBox'
import { CampaignObjectiveList } from '../../../constants/campaign'
import { LocationList } from '../../../constants/locations'
import { GenderOfAudience } from '../../../constants/gender'
import { CampaignFormProps } from '../../../types/campaignForm.types'
import DynamicMultiSelectListBox from '../../listBox/DynamicMultiSelectListBox'
import MultiRangeSlider from '../../multiRangeSlider/MultiRangeSlider'
import { BsCloudUploadFill } from 'react-icons/bs'

const AboutCampaignForm = ({
  activeTab,
  incrementTab,
  onChange,
  updateValues,
  updateStatus,
  formRef,
}: CampaignFormProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectBrand, setSelectBrand] = useState<Array<any> | null>(null)
  const [selectedLocation, setSelectedLocations] = useState<string[] | null>(
    null,
  )
  const [selectedGender, setSelectedGender] = useState<string[] | null>(null)
  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0])
      const reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = () => {
        setImageUrl(reader.result as string)
      }
    }
  }
  const onCampaignObjectSelect = (item: string) => {
    if (updateValues) {
      updateValues((prev) => ({
        ...prev,
        campaign_objective: item,
      }))
    }
  }
  const onRangeChange = useCallback(
    ({ min, max }: { min: number; max: number }) => {
      if (updateValues) {
        updateValues((prev) => ({
          ...prev,
          age_of_audience: { min, max },
        }))
      }
    },
    [updateValues],
  )
  const addValues = () => {
    if (updateValues) {
      updateValues((prev) => ({
        ...prev,
        campaign_image: selectedFile,
        imageURL: imageUrl && imageUrl,
        sub_brand_ids: selectBrand && selectBrand.map((obj) => obj._id),
        location: selectedLocation && selectedLocation,
        gender_of_audience: selectedGender && selectedGender,
      }))
    }
  }
  const onNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const campaignName = e.currentTarget.elements.namedItem(
      'campaign_name',
    ) as HTMLInputElement

    const campaignBrief = e.currentTarget.elements.namedItem(
      'campaign_brief',
    ) as HTMLTextAreaElement

    const requiredFields = [
      { field: 'Brand', value: selectBrand },
      { field: 'Campaign name', value: campaignName.value },
      { field: 'Campaign brief', value: campaignBrief.value },
      { field: 'Gender', value: selectedGender },
      { field: 'Location', value: selectedLocation },
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

  let isActiveTab = activeTab === 0
  return (
    <main className={`${isActiveTab ? 'flex' : 'hidden'}`}>
      <form className="w-full" onSubmit={onNext}>
        <section className="flex flex-col gap-3">
          <div className="w-full relative">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Brand
            </label>
            <DynamicMultiSelectListBox
              type="brand"
              selectedItems={selectBrand}
              updateSelectedItem={setSelectBrand}
              endpointURL="/api/my-brand"
              searchBy="company_name"
            />
          </div>

          <div className="w-full relative">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Compaign Name
            </label>
            <input
              className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type={'text'}
              name={'campaign_name'}
              placeholder={'i.e Bingo Fest Campaign'}
              onChange={onChange}
            />
          </div>

          <div className="w-full relative">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Campaign Brief
            </label>
            <textarea
              className="appearance-none block w-full h-24 resize-none text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name={'campaign_brief'}
              placeholder={`3 Key points to highlight in the campaign`}
              onChange={onChange}
            ></textarea>
          </div>

          <div className="w-full relative">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Campaign Objective
            </label>
            <ListboxComponent
              onItemSelected={onCampaignObjectSelect}
              dataList={CampaignObjectiveList}
              placeholder="ig. Brand awareness & lead generation"
            />
          </div>

          <div className="relative">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Brand Image
            </label>
            <div className="flex gap-5 w-full items-end">
              {imageUrl && (
                <div className="w-40 h-40 rounded-md relative shadow-md">
                  <img
                    src={imageUrl}
                    alt="Uploaded"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              )}
              <label className="w-64 flex flex-col items-center p-2 bg-white text-black rounded-lg shadow-lg tracking-wide uppercase cursor-pointer hover:bg-main hover:text-white">
                <BsCloudUploadFill size={25} />
                <span className="mt-2 text-sm leading-normal">
                  Select brand logo
                </span>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileInput}
                />
              </label>
            </div>
          </div>

          <h5 className="text-2xl font-semibold text-main mt-8 mb-3">
            Target Audience
          </h5>

          <div className="w-full relative">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Gender of Audience
            </label>
            <MultiSelectListboxComponentTypes
              selectedItem={selectedGender}
              updateSelectedItem={setSelectedGender}
              itemsList={GenderOfAudience}
              type="gender"
            />
          </div>

          <div className="w-full relative">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Location
            </label>
            <MultiSelectListboxComponentTypes
              selectedItem={selectedLocation}
              updateSelectedItem={setSelectedLocations}
              itemsList={LocationList}
              type="location"
            />
          </div>

          <div className="mb-5 relative">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Age of Audience
            </label>
            <MultiRangeSlider min={13} max={80} onChange={onRangeChange} />
          </div>

          <div className="w-full relative">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Hashtags
            </label>
            <input
              className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type={'text'}
              name={'hashtags'}
              placeholder={'ig. #fashion #travel'}
              onChange={onChange}
            />
          </div>
        </section>
        <section className="w-full flex items-center justify-between my-10">
          <button
            disabled={!isActiveTab}
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

export default React.memo(AboutCampaignForm)
