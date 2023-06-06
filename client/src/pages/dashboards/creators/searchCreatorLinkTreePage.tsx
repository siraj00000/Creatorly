import { ActionFunctionArgs, Navigate, useActionData } from 'react-router-dom'
import { handleInsertAction } from '../../../utils/api'
import { ApiErrorResponse, InsertResponse } from '../../../types/response.types'
import VisitorForm from '../../../components/forms/VisitorForm'

const SearchCreatorLinkTreePage = () => {
  const actionData = useActionData() as any
  return (
    <main className="bg-light">
      {actionData?.instagramLink && (
        <Navigate
          to={`/signup/creator`}
          replace={true}
          state={actionData?.instagramLink}
        />
      )}
      <section className="h-screen bg-white flex items-center pt-[10%] flex-col gap-2 mx-auto max-w-4xl md:px-20 px-5">
        <h1 className="md:text-7xl text-6xl mb-2 text-main font-semibold ">
          Creatorly.
        </h1>
        <h1 className="md:text-4xl text-2xl text-center text-black font-semibold tracking-wide capitalize">
          We are awake corporation
        </h1>
        <VisitorForm errorMessage={actionData?.error} />
        <p className="font-medium text-lg text-red-600">{actionData?.error}</p>
        <p className="text-xl text-black tracking-widest">
          Join creatorly as creator
        </p>
      </section>
    </main>
  )
}

export default SearchCreatorLinkTreePage

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  let instagramLink = formData.get('instagram_link')
  formData.append('instagramLink', `https://www.${instagramLink}`)
  try {
    const response = (await handleInsertAction({
      url: `/api/add-visitor`,
      data: formData,
    })) as InsertResponse
    return response.data.data
  } catch (error) {
    let err = error as ApiErrorResponse
    return err.response.data
  }
}
