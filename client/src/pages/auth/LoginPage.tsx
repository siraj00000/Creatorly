import {
  ActionFunctionArgs,
  useActionData,
  useNavigation,
} from 'react-router-dom'
import LoginForm from '../../components/forms/LoginForm'
import { handleInsertAction } from '../../utils/api'
import { ApiErrorResponse, ApiResponse } from '../../types/response.types'
import Cookies from 'js-cookie'
import { decryptData } from '../../utils/encryption'

type Props = {}

const LoginPage = (props: Props) => {
  const data = useActionData() as any
  const navigation = useNavigation()

  if (data?.msg) {
    setTimeout(() => {
      window.location.href = data?.navigateTo
    }, 1000)
  }

  return (
    <>
      <LoginForm
        successMessage={data?.msg}
        errorMessage={data?.error}
        isSubmitting={navigation.state === 'submitting'}
      />
    </>
  )
}

export default LoginPage

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  let data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }
  try {
    let response = (await handleInsertAction({
      url: `/api/login-user`,
      data,
    })) as ApiResponse

    if (response.data.success) {
      let token = response.data.token // extracting token
      sessionStorage.setItem('_cttkn', token) // saving token in session
      Cookies.set('__cretorly', response.data.user.role) // saving user role in cookie
      Cookies.set('__cretorty', response.data.user.userType) // saving user type in cookie
    }

    let navTo
    let isSingleCreator = sessionStorage.getItem('_#@ena')
    if (isSingleCreator) {
      let decryptCreatorId = decryptData(isSingleCreator)
      navTo = `/profile/${decryptCreatorId}`
    }
    let sucess = {
      msg: `Logged In, Successfully!`,
      navigateTo: navTo || response.data.userRoute,
    }
    return sucess
  } catch (error) {
    let err = error as ApiErrorResponse
    return err.response.data
  }
}
