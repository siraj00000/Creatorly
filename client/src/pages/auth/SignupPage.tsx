import {
  ActionFunctionArgs,
  useActionData,
  useLocation,
  useNavigation,
} from 'react-router-dom'
import UserRegisterationForm from '../../components/forms/RegisterForm'
import { handleInsertAction } from '../../utils/api'
import { ApiErrorResponse, ApiResponse } from '../../types/response.types'
import Cookies from 'js-cookie'
import { decryptData, encryptData } from '../../utils/encryption'

const UserSignup = () => {
  const { state } = useLocation()
  const actionData = useActionData() as any
  const navigation = useNavigation()

  if (actionData?.msg) {
    setTimeout(() => {
      window.location.href = actionData.navigateTo
    }, 1000)
  }

  return (
    <>
      <UserRegisterationForm
        creatorLink={state}
        successMessage={actionData?.msg}
        errorMessage={actionData?.error}
        isSubmitting={navigation.state === 'submitting'}
      />
    </>
  )
}

export default UserSignup

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData()

  if (params.userType) {
    if (params.userType === 'brand') {
      formData.append('userType', params.userType + '/agency')
    } else {
      formData.append('userType', params.userType)
    }
  }

  let url = `/api/register-user`
  let data = formData

  try {
    const response = (await await handleInsertAction({
      url,
      data,
    })) as ApiResponse

    if (response.data.success) {
      let token = response.data.token // extracting token
      sessionStorage.setItem('_cttkn', token) // saving token in session
      Cookies.set('__cretorly', response.data.user.role) // saving user role in cookie
      Cookies.set('__cretorty', response.data.user.userType) // saving user type in cookie

      if (response.data.userLink) {
        let userLink = encryptData({ data: response.data.userLink })
        Cookies.set('CATCH_CRET', userLink)
      }
    }
    let navTo
    let isSingleCreator = sessionStorage.getItem('_#@ena')
    if (isSingleCreator) {
      let decryptCreatorId = decryptData(isSingleCreator)
      navTo = `/profile/${decryptCreatorId}`
    }
    let sucess = {
      msg: `Logged In, Successfully!`,
      navigateTo: navTo || '/onboarding',
    }
    return sucess
  } catch (error) {
    let err = error as ApiErrorResponse
    return err.response.data
  }
}
