import { BiSend } from 'react-icons/bi'

type Props = {
  title: string
  progressHolder: string
  count: number | string
}

const ProgressCard = ({ title, progressHolder, count }: Props) => { 
  return (
    <div className="md:flex-1 w-full bg-white shadow-xl shadow-gray-200 py-3 px-5 rounded-md border-1 border-gray-300 border-l-8 border-l-main cursor-pointer">
      <BiSend size={25} />
      <div className="flex items-center justify-between">
        <span>
          <h2 className="text-lg text-black font-semibold mt-4">{title}</h2>
          <h5 className="text-xs text-black font-light">{progressHolder}</h5>
        </span>
        <span>
          <h1 className="text-2xl text-black font-bold">{count}</h1>
        </span>
      </div>
    </div>
  )
}

export default ProgressCard
