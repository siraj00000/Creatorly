import React, { useReducer } from 'react'
import { UserProfileTypes } from '../../../types/loader.types'
import ImageUploader from '../../other/imageUploader'
import { UserProfileValuesType } from '../../../constants/profile'
import MultiSelectListboxComponent from '../../listBox/multiSelectListBox'
import { languagesList } from '../../../constants/language'
import { categorySelectPropertiesList } from '../../../constants/categoryList'
import { regionList } from '../../../constants/locations'
import { ApiErrorResponse, UploadResponse } from '../../../types/response.types'
import { handleInsertAction } from '../../../utils/api'
import ErrorAlert from '../../alerts/errorAlert'
import SuccessAlert from '../../alerts/successAlert'
import ListboxComponent from '../../listBox'

type Props = {
  userInfo: UserProfileTypes
}

type State = {
  values: UserProfileValuesType
  selectedLanguage: string[] | null
  selectedCategory: string[] | null
  profileImage: File | null
  errorMessage: string | null
  successMessage: string | null
}

type Action =
  | { type: 'SET_VALUES'; payload: UserProfileValuesType }
  | { type: 'SET_SELECTED_LANGUAGE'; payload: string[] | null }
  | { type: 'SET_SELECTED_CATEGORY'; payload: string[] | null }
  | { type: 'SET_PROFILE_IMAGE'; payload: File | null }
  | { type: 'SET_SUCCESS_MESSAGE'; payload: string | null }
  | { type: 'SET_ERROR_MESSAGE'; payload: string | null }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_VALUES':
      return { ...state, values: action.payload }
    case 'SET_SELECTED_LANGUAGE':
      return { ...state, selectedLanguage: action.payload }
    case 'SET_SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.payload }
    case 'SET_PROFILE_IMAGE':
      return { ...state, profileImage: action.payload }
    case 'SET_ERROR_MESSAGE':
      return { ...state, errorMessage: action.payload }
    case 'SET_SUCCESS_MESSAGE':
      return { ...state, successMessage: action.payload }
    default:
      return state
  }
}

function getAllStringsFromArray(array: string[] | undefined): string[] | null {
  return array && array.length > 0 ? array : null
}

const MyProfileForm = ({ userInfo: { loggedInUser, userProfile } }: Props) => {
  let language = getAllStringsFromArray(userProfile?.languages)
  let category = getAllStringsFromArray(userProfile?.category)

  let initialState: State = {
    values: {
      userName: loggedInUser?.userName || '',
      date_of_birth: userProfile?.date_of_birth || '',
      gender: userProfile?.gender || '',
      about: userProfile?.about || '',
      contact_email: userProfile?.contact_email || '',
      region: userProfile?.region || '',
    },
    selectedLanguage: language || null,
    selectedCategory: category || null,
    profileImage: null,
    errorMessage: null,
    successMessage: null,
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const {
    values,
    selectedLanguage,
    selectedCategory,
    errorMessage,
    successMessage,
    profileImage,
  } = state

  const getUploadedImage = (file: File) => {
    // Handle image upload logic
    dispatch({ type: 'SET_PROFILE_IMAGE', payload: file })
  }

  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    dispatch({
      type: 'SET_VALUES',
      payload: { ...values, [e.target.name]: e.target.value },
    })
  }

  const updateSelectedLanguage = (selected: string[] | null) => {
    dispatch({ type: 'SET_SELECTED_LANGUAGE', payload: selected })
  }

  const updateSelectedCategory = (selected: string[] | null) => {
    dispatch({ type: 'SET_SELECTED_CATEGORY', payload: selected })
  }

  const onRegionSelected = (selected: string | '') => {
    dispatch({
      type: 'SET_VALUES',
      payload: { ...values, region: selected },
    })
  }

  const onSubmitProfile = async () => {
    try {
      const formData = new FormData()
      formData.append('languages', JSON.stringify(selectedLanguage))
      formData.append('category', JSON.stringify(selectedCategory))
      formData.append('userName', values.userName)
      formData.append('date_of_birth', values.date_of_birth)
      formData.append('region', values.region)
      formData.append('gender', values.gender)
      formData.append('about', values.about)
      formData.append('contact_email', values.contact_email)

      // Append profile image only if it is not null
      if (profileImage) {
        formData.append('profile_image', profileImage)
      }

      const response = (await handleInsertAction({
        url: '/api/profile',
        data: formData,
        type: 'multipart/form-data',
      })) as UploadResponse

      dispatch({
        type: 'SET_SUCCESS_MESSAGE',
        payload: response.data.message,
      })
    } catch (error) {
      let err = error as ApiErrorResponse

      dispatch({
        type: 'SET_ERROR_MESSAGE',
        payload: err.response.data.message,
      })
    }
  }

  return (
    <form className="w-full md:w-3/4 mb-16">
      {/* Alerts */}
      <section className="my-4">
        <ErrorAlert errorMessage={errorMessage} />
        <SuccessAlert successMessage={successMessage} />
      </section>

      <div className="flex items-center justify-center flex-wrap gap-10">
        <ImageUploader
          onUploadImage={getUploadedImage}
          currentImageURL={userProfile?.profile_image_url}
          profiler={loggedInUser?.userName}
        />
        <h1 className="text-4xl max-md:w-1/2">{loggedInUser?.userName}</h1>

        {/* this button */}
        <button
          type="button"
          onClick={onSubmitProfile}
          className="ml-auto flex items-center justify-center gap-2 ease-in duration-300 hover:-translate-y-1 hover:scale-110 border-1 border-main bg-main text-white font-medium rounded-full p-3 px-5 "
        >
          Save
        </button>
      </div>

      <div className="my-12" />

      <div className="flex flex-col gap-4">
        <label className="w-full relative block uppercase tracking-wide text-gray-700 text-xs font-bold">
          User Name
          <input
            className="mt-2 appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            name={'userName'}
            value={values.userName}
            onChange={onChange}
            placeholder={'Enter user name'}
          />
        </label>

        <label className="w-full relative block uppercase tracking-wide text-gray-700 text-xs font-bold">
          Date of Birth
          <input
            className="mt-2 appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="date"
            name={'date_of_birth'}
            value={values.date_of_birth}
            onChange={onChange}
          />
        </label>

        <label className="w-full relative block uppercase tracking-wide text-gray-700 text-xs font-bold">
          Languages
          <MultiSelectListboxComponent
            itemsList={languagesList}
            selectedItem={selectedLanguage}
            type="language"
            updateSelectedItem={updateSelectedLanguage}
          />
        </label>

        <label className="mt-2 w-full relative block uppercase tracking-wide text-gray-700 text-xs font-bold">
          Gender
          <div className="flex items-center gap-10 mt-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={values.gender === 'male'}
                onChange={onChange}
              />
              <label className="ml-2">Male</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={values.gender === 'female'}
                onChange={onChange}
              />
              <label className="ml-2">Female</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="other"
                name="gender"
                value="other"
                checked={values.gender === 'other'}
                onChange={onChange}
              />
              <label className="ml-2">Other</label>
            </div>
          </div>
        </label>

        <label className="mt-2 w-full relative block uppercase tracking-wide text-gray-700 text-xs font-bold">
          Category
          <MultiSelectListboxComponent
            itemsList={categorySelectPropertiesList}
            selectedItem={selectedCategory}
            type="category"
            updateSelectedItem={updateSelectedCategory}
          />
        </label>

        <label className="mt-2 w-full relative block uppercase tracking-wide text-gray-700 text-xs font-bold">
          Region
          <ListboxComponent
            dataList={regionList}
            placeholder="location"
            onItemSelected={onRegionSelected}
          />
        </label>

        <label className="w-full relative block uppercase tracking-wide text-gray-700 text-xs font-bold">
          About
          <textarea
            className="mt-2 appearance-none block w-full h-28 resize-none text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            name={'about'}
            onChange={onChange}
            value={values.about}
            placeholder={`Tell us a little about business`}
          ></textarea>
        </label>

        <label className="w-full relative block uppercase tracking-wide text-gray-700 text-xs font-bold">
          Contact Email
          <input
            className="mt-2 appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="email"
            name={'contact_email'}
            value={values.contact_email}
            onChange={onChange}
            placeholder="Enter email"
          />
        </label>
      </div>
    </form>
  )
}

export default MyProfileForm
