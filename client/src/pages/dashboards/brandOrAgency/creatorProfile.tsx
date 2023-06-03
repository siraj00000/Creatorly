import React, { Suspense } from 'react'
import {
  Await,
  LoaderFunctionArgs,
  defer,
  useLoaderData,
} from 'react-router-dom'
import { handleFetchAction } from '../../../utils/api'
import { GetResponse } from '../../../types/response.types'
import Loader from '../../../components/loader/loader'
import ProfileTemplate from '../../../components/_templates/ProfileTemplate'
import { ProfileDataType } from '../../../types/linkTree.types'

const CreatorProfile = () => {
  const { userProfile } = useLoaderData() as { userProfile: ProfileDataType }
  return (
    <main className="p-10">
      <Suspense fallback={<Loader />}>
        <Await resolve={userProfile} errorElement={<h1>Error Occur</h1>}>
          {(userProfileData) => <ProfileTemplate {...userProfileData} />}
        </Await>
      </Suspense>
    </main>
  )
}

export default CreatorProfile

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const response = (await handleFetchAction({
    url: `/api/profile/${params.id}`,
  })) as GetResponse

  return defer({ userProfile: response.data.data })
}
