import { socialMediaInputList } from '../../constants/socialMediaList'
import MultiSelectListboxComponent from '../listBox/multiSelectListBox'
import { categorySelectPropertiesList } from '../../constants/categoryList'
import { useState } from 'react'
import { handleInsertAction } from '../../utils/api'
import { ApiErrorResponse, ApiResponse } from '../../types/response.types'
import ErrorAlert from '../alerts/errorAlert'
import SuccessAlert from '../alerts/successAlert'
import { useNavigate } from 'react-router-dom'
import { decryptData } from '../../utils/encryption'
import Cookies from 'js-cookie'

type Props = {}

const CreatorOnlinePresenceForm = (props: Props) => {
  const navigate = useNavigate()
  const [selectedItem, setSelectedItems] = useState<string[] | null>(null)
  const [status, setStatus] = useState({ errorMessage: '', successMessage: '' })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    try {
      const response = (await handleInsertAction({
        url: '/api/creator-online-presence',
        data: {
          category: selectedItem,
          links: {
            instagram: formData.get('instagram'),
            facebook: formData.get('facebook'),
            youtube: formData.get('youtube'),
            twitter: formData.get('twitter'),
            linkedin: formData.get('linkedin'),
          },
        },
      })) as ApiResponse

      if (response.data.success) {
        setStatus({ successMessage: response.data.message, errorMessage: '' })
        navigate('/dashboard')
      }
    } catch (error) {
      let err = error as ApiErrorResponse

      if (err.response.data.error) {
        setStatus({ successMessage: '', errorMessage: err.response.data.error })
        return
      }
      setStatus({ successMessage: '', errorMessage: err.response.data })
    }
  }
  let CATCH_CRET = Cookies.get('CATCH_CRET')
  let userLink = CATCH_CRET ? decryptData(CATCH_CRET!) : ""
  return (
    <form onSubmit={handleSubmit} className="w-full lg:w-1/2">
      <div className="my-4 w-full">
        {/* Alerts */}
        <div className="my-4">
          <ErrorAlert errorMessage={status.errorMessage} />
          <SuccessAlert successMessage={status.successMessage} />
        </div>

        <h5 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Select your category
        </h5>
        <MultiSelectListboxComponent
          selectedItem={selectedItem}
          updateSelectedItem={setSelectedItems}
          type="category"
          itemsList={categorySelectPropertiesList}
        />
      </div>

      <div className="mt-4 mb-10 w-full">
        <h5 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Social Media
        </h5>
        <>
          {socialMediaInputList.map(({ Icon, ...rest }, inputIdx) => (
            <div
              key={inputIdx}
              className="flex items-center gap-5 pl-5 border border-gray-200 rounded mb-5"
            >
              <Icon size={25} className="text-main" />
              <input
                {...rest}
                disabled={rest.name === 'instagram'}
                defaultValue={rest.name === 'instagram' ? userLink?.data : ''}
                className="appearance-none block w-full h-full rounded text-gray-700 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
          ))}
        </>
      </div>

      <button className="ease-in duration-300 hover:-translate-y-1 hover:scale-110 border-1 border-main bg-main text-white font-medium rounded-full p-3 w-56 mt-5">
        Submit
      </button>
    </form>
  )
}

export default CreatorOnlinePresenceForm
