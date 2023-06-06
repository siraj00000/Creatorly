import {
  ActionFunctionArgs,
  NavLink,
  useActionData,
  useNavigate,
} from 'react-router-dom'
import CreateBlogForm from '../../../../components/forms/blogForms/createBlogForm'
import {
  ApiErrorResponse,
  InsertResponse,
} from '../../../../types/response.types'
import { handleInsertAction } from '../../../../utils/api'
import ErrorAlert from '../../../../components/alerts/errorAlert'
import SuccessAlert from '../../../../components/alerts/successAlert'
import { BiArrowBack } from 'react-icons/bi'

const CreateBlogs = () => {
  const navigate = useNavigate()
  const actionData = useActionData() as any

  if (actionData?.success) {
    setTimeout(() => {
      navigate('/blog', { replace: true })
    }, 1000)
  }

  return (
    <main className="p-0 md:p-10 max-md:pb-[20%]">
      <NavLink to={'/blog'} replace={true} className={'flex items-center gap-2 hover:underline'}>
        <BiArrowBack />
        Back
      </NavLink>
      {/* Alerts */}
      <section className="my-4">
        <ErrorAlert errorMessage={actionData?.error} />
        <SuccessAlert successMessage={actionData?.message} />
      </section>
      <CreateBlogForm />
    </main>
  )
}

export default CreateBlogs

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  try {
    const response = (await handleInsertAction({
      url: '/api/create-blog',
      data: formData,
      type: 'multipart/form-data',
    })) as InsertResponse

    return response.data
  } catch (error) {
    let err = error as ApiErrorResponse
    return err.response.data
  }
}
