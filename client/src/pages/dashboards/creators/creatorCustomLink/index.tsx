import { useState } from 'react'
import { handleInsertAction } from '../../../../utils/api'
import {
  ApiErrorResponse,
  InsertResponse,
} from '../../../../types/response.types'
import ErrorAlert from '../../../../components/alerts/errorAlert'
import SuccessAlert from '../../../../components/alerts/successAlert'
import { useNavigate } from 'react-router-dom'

type StateTypes = {
  title: string
  link: string
  index: number | null
}

const CreatorCustomLink = () => {
  const navigate = useNavigate()
  const [linkTree, setLinkTree] = useState<StateTypes[] | []>([])
  const [status, setStatus] = useState({ errorMessage: '', successMessage: '' })
  const [info, setInfo] = useState<StateTypes>({
    title: '',
    link: '',
    index: null,
  })
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const addLink = () => {
    if ([info.link, info.title].includes('')) return
    if (info.index !== null) {
      let treelist = [...linkTree]
      treelist[info.index] = info
      setLinkTree(treelist)
    } else {
      setLinkTree((prev) => [...prev, info])
    }
    setInfo({ title: '', link: '', index: null })
  }
  const editList = ({ title, link }: StateTypes, index: number) => {
    setInfo({ title, link, index })
  }
  const deleteLink = (index: number) => {
    let treelist = [...linkTree]
    treelist.splice(index, 1)
    setLinkTree(treelist)
  }
  const submitLink = async () => {
    try {
      const response = (await handleInsertAction({
        url: `/api/creator-custom-link`,
        data: {
          customLink: linkTree,
        },
      })) as InsertResponse

      if (response.data.success) {
        setStatus({ successMessage: response.data.message, errorMessage: '' })
        navigate('/dashboard')
      }
    } catch (error) {
      let err = error as ApiErrorResponse

      if (err.response.data.error) {
        setStatus({ successMessage: '', errorMessage: err.response.data.error })
        return
      }
      setStatus({ successMessage: '', errorMessage: err.response.data })
    }
  }
  return (
    <main className="w-full flex flex-col md:gap-3 gap-4 h-full p-10 max-md:p-0 max-md:pb-[20%]">
      <section className="w-full">
        <h1 className="text-3xl text-main font-medium capitalize">
          Generate your custom Link.
        </h1>
      </section>

      {/* Alerts */}
      <section className="w-full md:w-4/5 mx-auto">
        <ErrorAlert errorMessage={status.errorMessage} />
        <SuccessAlert successMessage={status.successMessage} />
      </section>

      <section className="flex items-center justify-center gap-2 w-full">
        <input
          name="title"
          type="text"
          placeholder="Enter title"
          value={info.title}
          onChange={onChange}
          className="appearance-none w-1/3 block h-full text-gray-700 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 border border-dashed border-gray-200 rounded"
        />
        <input
          name="link"
          type="text"
          placeholder="Enter link"
          value={info.link}
          onChange={onChange}
          className="w-2/3 appearance-none block h-full text-gray-700 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 border border-dashed border-gray-200 rounded"
        />
        <button
          onClick={addLink}
          className="flex-shrink flex items-center gap-2 border-1 border-main bg-main text-white font-medium rounded-full px-10 py-3 w-max"
        >
          add
        </button>
      </section>

      <section className="w-full md:mt-5">
        <table className="table-fixed w-full text-left divide-y break-words">
          <thead>
            <tr className="h-10 bg-light rounded-md shadow-lg">
              <th>#</th>
              <th>Titles</th>
              <th>Links</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr className="h-5"></tr>
            {linkTree.map((item, index) => (
              <tr
                key={index}
                className="h-10 border-dashed even:border-y-1 odd:border-b-1"
              >
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.link.substring(0, 30)}..</td>
                <td
                  onClick={() => editList(item, index)}
                  className="cursor-pointer"
                >
                  Edit
                </td>
                <td
                  onClick={() => deleteLink(index)}
                  className="cursor-pointer"
                >
                  Delete
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <button
        disabled={linkTree.length === 0}
        onClick={submitLink}
        className="flex items-center mr-auto gap-2 border-1 border-main bg-main text-white font-medium rounded-full px-10 py-3 w-max"
      >
        generate link
      </button>
    </main>
  )
}

export default CreatorCustomLink
