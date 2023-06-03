import { Suspense } from 'react'
import { Await, NavLink, defer, useLoaderData } from 'react-router-dom'
import { handleFetchAction } from '../../../../utils/api'
import { GetResponse } from '../../../../types/response.types'
import { InvoiceDataTypes } from '../../../../types/loader.types'
import Loader from '../../../../components/loader/loader'
import { invoiceTableColumns } from '../../../../constants/invoice'
import DynamicTable from '../../../../components/tables/DynamicTable'
import { TbFileInvoice } from 'react-icons/tb'
const Invoices = () => {
  const { invoices } = useLoaderData() as { invoices: InvoiceDataTypes }
  return (
    <main className="p-10 max-md:p-[5%]">
      <NavLink
        to={'create'}
        className={`bg-main text-white p-2 mb-5 w-full font-bold text-lg rounded-md flex items-center justify-center gap-4 my-2`}
      >
        <TbFileInvoice size={25} />
        Invoice
      </NavLink>
      <Suspense fallback={<Loader />}>
        <Await resolve={invoices} errorElement={<h1>Error</h1>}>
          {(invoices) => (
            <DynamicTable data={invoices} columns={invoiceTableColumns} />
          )}
        </Await>
      </Suspense>
    </main>
  )
}

export default Invoices

export const loader = async () => {
  const response = (await handleFetchAction({
    url: `/api/invoices`,
  })) as GetResponse
  return defer({ invoices: response.data.data })
}
