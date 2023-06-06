import { Form } from 'react-router-dom'

type VisitorFormProps = {
  errorMessage?: string
}

const VisitorForm: React.FC<VisitorFormProps> = ({ errorMessage }) => {
  return (
    <Form action="/creator-search" method="post" className="flex w-full mt-10">
      <input
        type="text"
        name="username"
        placeholder="username"
        className={`${
          errorMessage ? 'border-red-600' : 'border-gray-400'
        } p-3 px-10 border border-r-0 rounded-l-2xl w-full h-20 text-lg italic text-black font-medium`}
        required
      />
      <button
        className={`${
          errorMessage ? 'border-red-600' : 'border-gray-400'
        } h-20 px-12 flex items-center self-center text-white text-xl font-medium border rounded-r-2xl bg-main`}
      >
        GO
      </button>
    </Form>
  )
}

export default VisitorForm
