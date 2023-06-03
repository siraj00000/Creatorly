import { Suspense } from 'react'
import { handleFetchAction } from '../../../utils/api'
import { GetResponse } from '../../../types/response.types'
import { Await, defer, useLoaderData } from 'react-router-dom'
import Loader from '../../../components/loader/loader'
import { UserProfileTypes } from '../../../types/loader.types'
import MyProfileForm from '../../../components/forms/profileForms/MyProfile'

type Props = {}

const CreatorProfilePage = (props: Props) => {
  const profileLoader = useLoaderData() as { userProfile: UserProfileTypes[] }
  return (
    <main className="p-10  max-md:p-[5%]">
      <Suspense fallback={<Loader />}>
        <aside className="w-full">
          <section className="">
            <Await
              resolve={profileLoader.userProfile}
              errorElement={<h1>Error Occur</h1>}
            >
              {(userProfileLoader) => (
                <MyProfileForm userInfo={userProfileLoader} />
              )}
            </Await>
          </section>
        </aside>
      </Suspense>
    </main>
  )
}

export default CreatorProfilePage

export const creatorProfileLoader = async () => {
  const response = (await handleFetchAction({
    url: '/api/profile',
  })) as GetResponse

  return defer({ userProfile: response.data.data })
}
