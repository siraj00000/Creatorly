import { Suspense } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import {
  NavLink,
  useLoaderData,
  defer,
  Await,
} from 'react-router-dom'
import { handleFetchAction } from '../../../../utils/api'
import { GetResponse } from '../../../../types/response.types'
import { AboutMyBrand } from '../../../../types/loader.types'
import MyBrandCard from '../../../../components/card/MyBrandCard'
import Loader from '../../../../components/loader/loader'
type Props = {}

const MyBrands = (props: Props) => {
  const loaderMyBrands = useLoaderData() as { my_brands: AboutMyBrand[] }
  return (
    <main className="p-0 md:p-10 max-md:pb-[20%] w-full">
      <section className="flex items-center justify-between w-full">
        <h1 className="text-main font-semibold text-4xl">Brands</h1>

        <NavLink
          to={'add-brand'}
          className="flex items-center justify-center gap-2 ease-in duration-300 text-sm border-1 border-main bg-main text-white font-medium rounded-full py-1 px-4 w-max"
        >
          <AiOutlinePlus className="text-white" /> Add Brand
        </NavLink>
      </section>

      <Suspense fallback={<Loader />}>
        <Await resolve={loaderMyBrands.my_brands} errorElement={<p>error...</p>}>
          {(loaderMyBrands) => <MyBrandCard myBrands={loaderMyBrands} />}
        </Await>
      </Suspense>
    </main>
  )
}

export default MyBrands

export const loader = async () => {
  const response = (await handleFetchAction({
    url: '/api/my-brand',
  })) as GetResponse

  return defer({ my_brands: response.data.data })
}
