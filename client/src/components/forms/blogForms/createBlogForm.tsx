import { Form, useNavigation } from 'react-router-dom'
import { useState } from 'react'
import { BsCloudUploadFill } from 'react-icons/bs'

const CreateBlogForm = () => {
  const { state } = useNavigation()
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]
      setPreviewImage(URL.createObjectURL(file))
    }
  }
  return (
    <Form action="/blog/create" method="post" encType="multipart/form-data">
      <div className="w-full relative">
        <label className="ml-auto w-64 my-5 flex flex-col items-center p-2 bg-white text-black rounded-lg shadow-lg tracking-wide uppercase cursor-pointer hover:bg-main hover:text-white">
          <BsCloudUploadFill size={25} />
          <span className="mt-2 text-sm leading-normal">Select blog image</span>
          <input
            type="file"
            className="hidden"
            name="blog_image"
            onChange={handleFileChange}
          />
        </label>
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className="w-36 h-auto mb-3 object-cover border shadow-xl"
          />
        )}
      </div>
      <div className="w-full relative">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Title
        </label>
        <input
          className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type={'text'}
          name={'title'}
          placeholder={'blog title'}
        />
      </div>
      <div className="w-full relative">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Blog
        </label>
        <textarea
          className="appearance-none block w-full h-32 resize-none text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          name={'blog'}
          placeholder={'blog title'}
        />
      </div>

      <button
        disabled={state === 'submitting'}
        className={`bg-main w-full text-white ml-auto flex items-center justify-center gap-2 ease-in duration-300 font-medium rounded-full p-3 px-5`}
      >
        {state === 'submitting' ? 'Creating...' : 'Create'}
      </button>
    </Form>
  )
}

export default CreateBlogForm
