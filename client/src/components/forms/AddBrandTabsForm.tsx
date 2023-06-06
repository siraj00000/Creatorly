import React, { useState } from 'react'
import ListboxComponent from '../listBox'
import { countryList } from '../../constants/countryList'
import { BsCloudUploadFill } from 'react-icons/bs'
import { handleInsertAction } from '../../utils/api'
import { ApiErrorResponse, UploadResponse } from '../../types/response.types'
import ErrorAlert from '../alerts/errorAlert'
import SuccessAlert from '../alerts/successAlert'
import { useNavigate } from 'react-router-dom';

type Props = {}

const AddBrandTabsForm = (props: Props) => {
  const navigate = useNavigate();
  const [activeTab, setactiveTab] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [values, setValues] = useState({
    company_name: '',
    country: '',
    about_brand: '',
  });
  const [status, setStatus] = useState({ errorMessage: '', successMessage: '' });
  const onCountrySelect = (country: string) => {
    setValues((prev) => ({ ...prev, country }));
  };
  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        setImageUrl(reader.result as string);
      };
    }
  };
  const incrementTab = () => {
    if (activeTab !== 2) {
      setactiveTab(activeTab + 1);
    }
  };
  const decrementTab = () => {
    if (activeTab !== 0) {
      setactiveTab(activeTab - 1);
    }
  };
  const onChange = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const onBrandSave = async () => {
    try {
      if (!selectedFile) return;

      const formData = new FormData();
      formData.append('company_name', values.company_name);
      formData.append('country', values.country);
      formData.append('brand-logo', selectedFile);
      formData.append('about_brand', values.about_brand);

      const response = (await handleInsertAction({
        url: `/api/my-brand`,
        data: formData,
        type: 'multipart/form-data',
      })) as UploadResponse;

      if (response.data.success) {
        setStatus({ successMessage: response.data.message, errorMessage: '' });
        navigate(-1)
      }
    } catch (error) {
      let err = error as ApiErrorResponse;

      if (err.response.data.error) {
        setStatus({ successMessage: '', errorMessage: err.response.data.error });
        return;
      }
      setStatus({ successMessage: '', errorMessage: err.response.data });
    }
  };

  const isNameTabValid = [values.company_name, values.country].includes('')
  const isLogoTabValid = [selectedFile].includes(null)
  const isAboutTabValid = [values.about_brand].includes('')

  return (
    <aside className="my-5 w-full md:w-3/4 max-md:pb-[50%]">
      {/* Alerts */}
      <section className="my-4">
        <ErrorAlert errorMessage={status.errorMessage} />
        <SuccessAlert successMessage={status.successMessage} />
      </section>

      {/* Tabs */}
      <section className="flex items-center lg:justify-between flex-wrap gap-2 w-full">
        <ActiveTabComponent
          activeIndex={activeTab}
          tabIndex={0}
          tabTitle="name"
        />
        <div className="flex-1 h-0 border-t-1 bg-gray-400" />
        <ActiveTabComponent
          activeIndex={activeTab}
          tabIndex={1}
          tabTitle="logo"
        />
        <div className="flex-1 h-0 border-t-1 bg-gray-400" />
        <ActiveTabComponent
          activeIndex={activeTab}
          tabIndex={2}
          tabTitle="about"
        />
      </section>

      {/* Tab components */}
      {activeTab === 0 && (
        <section className="mt-16 flex flex-col gap-3">
          <div className="w-full relative">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Name
            </label>
            <input
              className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type={'text'}
              name={'company_name'}
              placeholder={'Company name'}
              value={values.company_name}
              onChange={onChange}
            />
          </div>
          
          <div className="w-full relative">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Country
            </label>
            <ListboxComponent
              onItemSelected={onCountrySelect}
              dataList={countryList}
              placeholder="country"
            />
          </div>

          <button
            disabled={isNameTabValid}
            onClick={incrementTab}
            className={`${
              isNameTabValid ? 'bg-gray-200 cursor-not-allowed' : 'bg-main'
            } text-white ml-auto flex items-center justify-center gap-2 ease-in duration-300 hover:-translate-y-1 hover:scale-110 font-medium rounded-full p-3 px-5`}
          >
            Next
          </button>
        </section>
      )}
      {activeTab === 1 && (
        <div className="flex flex-col w-full items-center justify-center gap-5 bg-white mt-16">
          <div className="w-40 h-40 rounded-md relative shadow-md">
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Uploaded"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <label className="w-64 flex flex-col items-center p-2 bg-white text-black rounded-lg shadow-lg tracking-wide uppercase cursor-pointer hover:bg-main hover:text-white">
            <BsCloudUploadFill size={25} />
            <span className="mt-2 text-sm leading-normal">
              Select brand logo
            </span>
            <input type="file" className="hidden" onChange={handleFileInput} />
          </label>

          <section className="w-full flex items-center justify-between my-10">
            <button
              onClick={decrementTab}
              className="mr-auto flex items-center justify-center gap-2 ease-in duration-300 hover:-translate-y-1 hover:scale-110 border-1 border-main bg-main text-white font-medium rounded-full p-3 px-5 "
            >
              Back
            </button>
            <button
              disabled={isLogoTabValid}
              onClick={incrementTab}
              className={`${
                isLogoTabValid ? 'bg-gray-200 cursor-not-allowed' : 'bg-main'
              } text-white ml-auto flex items-center justify-center gap-2 ease-in duration-300 hover:-translate-y-1 hover:scale-110 font-medium rounded-full p-3 px-5`}
            >
              Next
            </button>
          </section>
        </div>
      )}
      {activeTab === 2 && (
        <section className="mt-16 flex flex-col gap-3">
          <div className="w-full relative">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              About the brand
            </label>
            <textarea
              className="appearance-none block w-full h-32 resize-none text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name={'about_brand'}
              onChange={onChange}
              value={values.about_brand}
              placeholder={`Tell us a little about your brand You can paste this from your website, Facebook page, etc.`}
            ></textarea>
          </div>

          <section className="w-full flex items-center justify-between my-10">
            <button
              onClick={decrementTab}
              className="mr-auto flex items-center justify-center gap-2 ease-in duration-300 hover:-translate-y-1 hover:scale-110 border-1 border-main bg-main text-white font-medium rounded-full p-3 px-5 "
            >
              Back
            </button>
            <button
              onClick={onBrandSave}
              disabled={isAboutTabValid}
              className={`${
                isAboutTabValid ? 'bg-gray-200 cursor-not-allowed' : 'bg-main'
              } text-white ml-auto flex items-center justify-center gap-2 ease-in duration-300 hover:-translate-y-1 hover:scale-110 font-medium rounded-full p-3 px-5`}
            >
              Save
            </button>
          </section>
        </section>
      )}
    </aside>
  )
}

type activeTabComponentType = {
  activeIndex: number
  tabTitle: string
  tabIndex: number
}

const ActiveTabComponent = (_props: activeTabComponentType) => {
  let isActiveTab = _props.activeIndex === _props.tabIndex
  return (
    <div
      className={`${
        isActiveTab ? 'bg-main' : 'bg-white'
      } p-3 rounded-md w-max shadow-lg cursor-default`}
    >
      <h6
        className={`${
          isActiveTab ? 'text-white text-center' : 'text-main'
        } text-md capitalize font-medium`}
      >
        {_props.tabTitle}
      </h6>
    </div>
  )
}

export default AddBrandTabsForm
