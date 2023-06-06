import { Await, defer, useLoaderData, useRevalidator } from 'react-router-dom'
import { handleFetchAction } from '../../../utils/api'
import { GetResponse } from '../../../types/response.types'
import TitlebarComponent from '../../../components/other/titlebar'
import { Suspense } from 'react'
import Loader from '../../../components/loader/loader'
import RequestTable from '../../../components/tables/RequestTable'

const RequestsPage = () => {
  const { requests } = useLoaderData() as { requests: any }
  const revalidator = useRevalidator()
  return (
    <main className="p-10">
      <TitlebarComponent title="Requests For Collaboration" />

      <Suspense fallback={<Loader />}>
        <Await resolve={requests} errorElement={<h1>Error Occur</h1>}>
          {(userProfileData) => (
            <RequestTable
              data={userProfileData}
              revalidator={revalidator.revalidate}
            />
          )}
        </Await>
      </Suspense>
    </main>
  )
}

export default RequestsPage

export const loader = async () => {
  const response = (await handleFetchAction({
    url: `/api/combined-approved-campaigns`,
  })) as GetResponse
  return defer({ requests: response.data.data })
}
