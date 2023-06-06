import React from 'react'
import { NavLink } from 'react-router-dom'

type Props = {}

const BlogCard = (props: Props) => {
  return (
    <div className="max-w-lg min-w-[400px] mx-auto">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5">
        <NavLink to="#">
          <img
            className="rounded-t-lg"
            src="https://flowbite.com/docs/images/blog/image-1.jpg"
            alt=""
          />
        </NavLink>
        <div className="p-5">
          <NavLink to="#">
            <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">
              Noteworthy technology acquisitions 2021
            </h5>
          </NavLink>
          <p className="font-normal text-gray-700 mb-3">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
          <NavLink
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
            to="#"
          >
            Read more
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default BlogCard
