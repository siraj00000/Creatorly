import React, { useState } from 'react'
import ListboxComponent from '../../listBox'
import { CampaignObjectiveList } from '../../../constants/campaign'
import { SingleCampaignFormProps } from '../../../types/campaignForm.types'
import DynamicMultiSelectListBox from '../../listBox/DynamicMultiSelectListBox'
import { BsCloudUploadFill } from 'react-icons/bs'

const AboutSingleCampaignForm = ({
  activeTab,
  incrementTab,
  onChange,
  updateValues,
  updateStatus,
  formRef,
}: SingleCampaignFormProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectBrand, setSelectBrand] = useState<Array<any> | null>(null)

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

  const addValues = () => {
    if (updateValues) {
      updateValues((prev) => ({
        ...prev,
        campaign_image: selectedFile,
        imageURL: imageUrl && imageUrl,
        sub_brand_ids: selectBrand && selectBrand.map((obj) => obj._id),
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

export default React.memo(AboutSingleCampaignForm)
