import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import React, { Fragment, useState } from 'react'
import { handleFetchAction } from '../../utils/api'
import { GetResponse } from '../../types/response.types'
import Loader from '../loader/loader'

type DynamicMultiSelectListBoxProps = {
  updateSelectedItem: any
  selectedItems: Array<any> | null
  type: string
  endpointURL: string
  searchBy: string
}

const DynamicMultiSelectListBox: React.FC<DynamicMultiSelectListBoxProps> = ({
  type,
  updateSelectedItem,
  selectedItems,
  endpointURL,
  searchBy,
}) => {
  const [itemsList, setItemsList] = useState<Array<any>>([])
  const fetchData = async () => {
    try {
      if (itemsList.length !== 0) return;
      const response = (await handleFetchAction({
        url: endpointURL,
      })) as GetResponse
      setItemsList(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  const onChange = (e: any) => {
    updateSelectedItem(e)
  }

  let isEmpty = selectedItems === null || selectedItems.length === 0
  return (
    <div className="w-full">
      <Listbox onChange={onChange} multiple>
        <div className="relative my-1">
          <Listbox.Button
            onClick={fetchData}
            className="relative w-full cursor-pointer text-left border border-gray-200 rounded appearance-none block h-full text-gray-700 py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          >
            <Fragment>
              {!isEmpty ? (
                <h6 className="truncate flex gap-2">
                  {selectedItems?.map((item) => (
                    <span
                      key={item?._id}
                      className="bg-amber-100 text-amber-900 p-1"
                    >
                      {item[searchBy]}
                    </span>
                  ))}
                </h6>
              ) : (
                <span className="block truncate ">select {type}</span>
              )}
            </Fragment>

            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 z-50 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {itemsList.length !== 0 ? (
                itemsList.map((item) => (
                  <Listbox.Option
                    key={item?._id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 z-50 ${
                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                      }`
                    }
                    value={item}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {item[searchBy]}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))
              ) : (
                <Loader />
              )}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default DynamicMultiSelectListBox
