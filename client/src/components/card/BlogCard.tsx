import React from 'react'
import { BlogTypes } from '../../constants/blogList'

const BlogCard: React.FC<BlogTypes> = ({
  blog_image: { secureUrl },
  title,
  blog
}) => {
  return (
    <div className="w-[300px] min-h-72 h-full">
      <div className="bg-white h-full shadow-md border border-gray-200 rounded-lg max-w-sm mb-5">
        <img
          className="rounded-t-lg h-60 w-full object-fill"
          src={secureUrl}
          alt={title}
        />
        <div className="p-5">
          <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">
            {title}
          </h5>
          <p className="font-normal text-gray-700 mb-3">{blog}</p>
        </div>
      </div>
    </div>
  )
}
export default BlogCard
