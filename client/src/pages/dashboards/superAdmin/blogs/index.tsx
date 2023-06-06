import { Await, NavLink, defer, useLoaderData } from 'react-router-dom'
import { handleFetchAction } from '../../../../utils/api'
import { GetResponse } from '../../../../types/response.types'
import { BlogTypes } from '../../../../constants/blogList'
import Loader from '../../../../components/loader/loader'
import { Suspense } from 'react'
import BlogCard from '../../../../components/card/BlogCard'
import { TbBrandBlogger } from 'react-icons/tb'
const Blogs = () => {
  const loaderData = useLoaderData() as { blogs: BlogTypes[] }
  return (
    <main className="p-0 md:p-10">
      <NavLink
        to="create"
        className="mb-10 w-max flex items-center justify-center gap-2 ease-in duration-300 border-1 border-main bg-main text-white font-medium rounded-full p-3 px-5 "
      >
        <TbBrandBlogger size={20} /> Create BLog
      </NavLink>
      <Suspense fallback={<Loader />}>
        <Await resolve={loaderData.blogs} errorElement={<h1>Error</h1>}>
          {(blogs) => (
            <section className="w-full flex flex-wrap gap-5">
              {blogs.map((blog: BlogTypes) => (
                <BlogCard {...blog} key={blog._id} />
              ))}
            </section>
          )}
        </Await>
      </Suspense>
    </main>
  )
}

export default Blogs

export const loader = async () => {
  const response = (await handleFetchAction({
    url: `/api/blogs`,
  })) as GetResponse

  return defer({ blogs: response.data.data })
}
