import { useState } from 'react'
import { brandOrAgencyWebsiteInputList } from '../../constants/socialMediaList'
import ErrorAlert from '../alerts/errorAlert'
import SuccessAlert from '../alerts/successAlert'
import MultiSelectListboxComponent from '../listBox/multiSelectListBox'
import { categorySelectPropertiesList } from '../../constants/categoryList'
import { ApiErrorResponse, ApiResponse } from '../../types/response.types'
import { handleInsertAction } from '../../utils/api'
import { useNavigate } from 'react-router-dom'

type Props = {}

const BrandOrAgencyOnlinePresenceForm = (props: Props) => {
  const navigate = useNavigate()
  const [selectedItem, setSelectedItems] = useState<string[] | null>(null)
  const [status, setStatus] = useState({ errorMessage: '', successMessage: '' })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    try {
      const response = (await handleInsertAction({
        url: '/api/brand-online-presence',
        data: {
          category: selectedItem,
          websiteLink: formData.get('websiteLink'),
        },
      })) as ApiResponse

      if (response.data.success) {
        setStatus({ successMessage: response.data.message, errorMessage: '' })

        setTimeout(() => {
          navigate('/dashboard')
        }, 1000)
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
  return (
    <form onSubmit={handleSubmit}>
      <div className="my-4 w-full md:w-1/2">
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

      <div className="mt-4 mb-10 w-full md:w-1/2">
        <h5 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Social Media
        </h5>
        <>
          {brandOrAgencyWebsiteInputList.map(({ Icon, ...rest }, inputIdx) => (
            <div
              key={inputIdx}
              className="flex items-center gap-5 pl-5 border border-gray-200 rounded mb-5"
            >
              <Icon size={25} className="text-main" />
              <input
                {...rest}
                className="appearance-none block w-full h-full text-gray-700 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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

export default BrandOrAgencyOnlinePresenceForm
