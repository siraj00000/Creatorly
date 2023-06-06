import { FiSearch } from 'react-icons/fi'

type Props = {
  searchCreator: React.Dispatch<React.SetStateAction<string>>
}

const TableSearchbar = ({ searchCreator }: Props) => {
  return (
    <div className="relative flex items-center gap-2 w-full border border-gray-200 rounded py-3 px-4 mb-3">
      <FiSearch className="text-gray-700" />
      <input
        className="appearance-none block w-full text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        type={'text'}
        name={'creator'}
        placeholder={'search creator'}
        onChange={(e) => searchCreator(e.target.value)}
      />
    </div>
  )
}

export default TableSearchbar
