import { Suspense } from 'react'
import { Await, NavLink, defer, useLoaderData } from 'react-router-dom'
import { TfiReceipt } from 'react-icons/tfi'
import { FaFlagCheckered } from 'react-icons/fa'
import { AiOutlinePlus } from 'react-icons/ai'
// import BlogCard from '../../../components/card/BlogCard'
import { VscTools } from 'react-icons/vsc'
import { TbBrandCampaignmonitor } from 'react-icons/tb'
import { handleFetchAction } from '../../../utils/api'
import { GetResponse } from '../../../types/response.types'
import Loader from '../../../components/loader/loader'
import { BlogTypes } from '../../../constants/blogList'
import BlogCard from '../../../components/card/BlogCard'

const ResourcesPage = () => {
  const loaderData = useLoaderData() as { blogs: BlogTypes[] }
  return (
    <main className="p-10 max-md:p-[5%] max-md:pb-20">
      <section className="flex items-center justify-between max-md:flex-col gap-2">
        {/* Invoicing Made Easy */}
        <aside className="h-32 max-md:w-full flex-1 flex items-center text-2xl font-medium border-dashed border-2 border-main rounded-md gap-4 hover:shadow-xl p-5 group">
          <TfiReceipt
            size={50}
            className="text-black transition-colors duration-300"
          />
          Invoicing Made Easy
          <NavLink
            to={'/invoice'}
            className="ml-auto p-2 bg-white shadow group-hover:text-main rounded-md transition-colors group-hover:delay-150 group-hover:duration-300 group-hover:scale-110"
          >
            <AiOutlinePlus size={30} />
          </NavLink>
        </aside>

        <NavLink
          aria-disabled={false}
          to={''}
          className={`h-32 max-md:w-full flex-1 flex items-center text-2xl font-medium border-dashed border-2 border-main rounded-md gap-4 p-5`}
        >
          <FaFlagCheckered size={50} />
          Profile Insights checker <br /> (coming soon)
        </NavLink>
      </section>

      {/* BLogs Section */}
      <section className="my-10">
        <h1 className="capitalize text-lg font-medium text-black">
          Creatorly Creators Academy
        </h1>
        <Suspense fallback={<Loader />}>
          <Await resolve={loaderData.blogs} errorElement={<h1>Error</h1>}>
            {(blogs) => (
              <div className="flex overflow-x-scroll mt-5 pb-10">
                <div className="flex items-center space-x-2">
                  {blogs.map((blog: BlogTypes) => (
                    <BlogCard {...blog} key={blog._id} />
                  ))}
                </div>
              </div>
            )}
          </Await>
        </Suspense>
      </section>

      {/* More */}
      <section>
        <NavLink
          aria-disabled={false}
          to={''}
          className={`h-32 flex-1 flex items-center justify-center text-2xl font-medium border-dashed border-2 border-main rounded-md gap-4 p-5`}
        >
          <VscTools size={50} />
          Creatorly Creator KIT
        </NavLink>
        <NavLink
          aria-disabled={false}
          to={'/discover'}
          className={`mt-5 flex-1 flex items-center justify-center text-2xl text-white font-medium bg-main border-2 border-main rounded-md gap-4 p-5`}
        >
          <TbBrandCampaignmonitor size={50} />
          Explore Brand Campaigns
        </NavLink>
      </section>
    </main>
  )
}

export default ResourcesPage

export const loader = async () => {
  const response = (await handleFetchAction({
    url: `/api/latest-blogs`,
  })) as GetResponse

  return defer({ blogs: response.data.data })
}
