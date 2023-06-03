import { CiSearch } from 'react-icons/ci'
import { Form } from 'react-router-dom'

type SearchBarProps = {
  defaultValue: string
}

const SearchBar: React.FC<SearchBarProps> = ({ defaultValue }) => {
  return (
    <Form
      action="/discover-creators"
      method="get"
      className="w-72 my-4 px-3 ml-auto flex items-center justify-between border border-gray-300 rounded-lg outline-none focus:border-gray-400"
    >
      <input
        type="text"
        placeholder="Search"
        name="search"
        defaultValue={defaultValue}
        className="p-2 rounded-lg"
      />
      <CiSearch size={25} className='text-gray-400' />
      <button className="hidden">search</button>
    </Form>
  )
}

export default SearchBar
