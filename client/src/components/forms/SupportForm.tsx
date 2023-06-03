import { Form } from 'react-router-dom';

const SupportForm = () => {
  return (
    <Form className="p-0 md:p-10 max-md:pb-[20%]">
      <label className="w-full relative block uppercase tracking-wide text-gray-700 text-xs font-bold">
        Name
        <input
          className="mt-2 appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          name={'name'}
          placeholder={'Joe'}
        />
      </label>
      <label className="w-full relative block uppercase tracking-wide text-gray-700 text-xs font-bold">
        Email
        <input
          type="email"
          className="mt-2 appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          name={'email'}
          placeholder={'joe@gmail.com'}
        />
      </label>
      <label className="w-full relative block uppercase tracking-wide text-gray-700 text-xs font-bold">
        Support
        <textarea
          className="mt-2 appearance-none block w-full h-28 resize-none text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          name={'support'}
          placeholder={`We are available 24/7, let us know how we can help`}
        ></textarea>
      </label>
      {/* this button */}
      <button
        type="button"
        className="mr-auto flex items-center justify-center gap-2 ease-in duration-300 hover:-translate-y-1 hover:scale-110 border-1 border-main bg-main text-white font-medium rounded-full p-3 px-5 "
      >
        Send
      </button>
    </Form>
  )
}

export default SupportForm
