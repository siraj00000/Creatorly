import { Suspense } from 'react'
import { handleFetchAction } from '../../../../utils/api'
import { GetResponse } from '../../../../types/response.types'
import {
  Await,
  LoaderFunctionArgs,
  defer,
  useLoaderData,
} from 'react-router-dom'
import Loader from '../../../../components/loader/loader'
import { ShowInvoiceProps } from '../../../../types/loader.types'
import ShowInvoiceTemplate from '../../../../components/_templates/ShowInvoiceTemplate'

const ShowInvoice = () => {
  const { invoice } = useLoaderData() as { invoice: ShowInvoiceProps }
  return (
    <main className="md:p-10 max-md:mb-[20%]">
      <Suspense fallback={<Loader />}>
        <Await resolve={invoice} errorElement={<h1>Error</h1>}>
          {(invoices) => <ShowInvoiceTemplate data={invoices} />}
        </Await>
      </Suspense>
    </main>
  )
}

export default ShowInvoice

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const response = (await handleFetchAction({
    url: `/api/invoice/${params.id}`,
  })) as GetResponse
  return defer({ invoice: response.data.data })
}
