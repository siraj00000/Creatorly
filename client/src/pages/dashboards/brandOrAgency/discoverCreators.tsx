import {
  Await,
  LoaderFunctionArgs,
  defer,
  useLoaderData,
  useSearchParams,
} from 'react-router-dom'
import { GetResponse } from '../../../types/response.types'
import { handleFetchAction } from '../../../utils/api'
import { Suspense } from 'react'
import Loader from '../../../components/loader/loader'
import CreatorDiscoveryTable from '../../../components/tables/CreatorDiscoveryTable'
import { DiscoveryData } from '../../../types/campaignForm.types'
import { discoveryTableColumns } from '../../../constants/campaign'
import SearchBar from '../../../components/other/searchBar'

const DiscoverCreators = () => {
  const { userProfiles } = useLoaderData() as { userProfiles: DiscoveryData }
  const [params] = useSearchParams()
  return (
    <main className="md:p-10 p-0 max-md:pb-[20%]">
      {/* TODO: Search Creator by username */}
      <SearchBar defaultValue={params.get('search')!} />
      
      <Suspense fallback={<Loader />}>
        <Await resolve={userProfiles} errorElement={<h1>Error Occur</h1>}>
          {(userProfileData) => (
            <CreatorDiscoveryTable
              data={userProfileData}
              columns={discoveryTableColumns}
            />
          )}
        </Await>
      </Suspense>
    </main>
  )
}

export default DiscoverCreators

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const search = new URLSearchParams(url.search)
  const response = (await handleFetchAction({
    url: `/api/get-creators?username=${search.get('search')}`,
  })) as GetResponse

  return defer({ userProfiles: response.data.data })
}
