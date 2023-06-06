import { useEffect, useRef, useState } from 'react'
import Cookies from 'js-cookie'
import moment from 'moment'
import { HiCalendar } from 'react-icons/hi'
import { Form } from 'react-router-dom'

type Option = {
  label: string
  value: string
}

type DatePickerProps = {
  revalidator: () => void
}

const DatePicker = ({ revalidator }: DatePickerProps) => {
  const [selectedMonth, setSelectedMonth] = useState(
    moment().startOf('month').format('MMM DD, YYYY') +
      ' - ' +
      moment().endOf('month').format('MMM DD, YYYY'),
  )

  useEffect(() => {
    const selectedMonthCookie = Cookies.get('__Month')
    if (selectedMonthCookie) {
      const selectedMonth = Number(selectedMonthCookie)
      const startDate = moment()
        .year(moment().year())
        .month(selectedMonth - 1)
        .startOf('month')
      const endDate = moment()
        .year(moment().year())
        .month(selectedMonth - 1)
        .endOf('month')
      setSelectedMonth(selectedMonth.toString())
      setDisplayDate(
        startDate.format('MMM DD, YYYY') +
          ' - ' +
          endDate.format('MMM DD, YYYY'),
      )
    } else {
      const startDate = moment().startOf('month').format('MMM DD, YYYY')
      const endDate = moment().endOf('month').format('MMM DD, YYYY')
      setDisplayDate(`${startDate} - ${endDate}`)
    }
  }, [])

  const handleDateChange = (selectedOption: Option | null) => {
    if (selectedOption) {
      const selectedMonth = Number(selectedOption.value)
      const startDate = moment()
        .year(moment().year())
        .month(selectedMonth - 1)
        .startOf('month')
      const endDate = moment()
        .year(moment().year())
        .month(selectedMonth - 1)
        .endOf('month')
      setSelectedMonth(selectedOption.value)
      setDisplayDate(
        startDate.format('MMM DD, YYYY') +
          ' - ' +
          endDate.format('MMM DD, YYYY'),
      )

      // Save the selected month number to a cookie
      Cookies.set('__Month', selectedMonth.toString())

      // Recall the loader
      revalidator()
    }
  }

  const months = moment.months().map((month, index) => {
    return {
      label: month,
      value: (index + 1).toString().padStart(2, '0'),
    }
  })

  const [showOptions, setShowOptions] = useState(false)
  const [displayDate, setDisplayDate] = useState('')

  const toggleOptions = () => {
    setShowOptions(!showOptions)
  }

  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowOptions(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <Form action="/dashboard" className="relative md:max-w-lg w-full ml-auto">
      <aside ref={dropdownRef} className="w-full relative">
        <input
          type="text"
          name="month"
          className="hidden"
          defaultValue={selectedMonth}
        />
        <button
          type="button"
          onClick={toggleOptions}
          className="w-full bg-white border border-gray-300 rounded-lg shadow-sm px-4 py-2 inline-flex items-center justify-center text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <HiCalendar className="mr-2 h-5 w-5" />
          <span>{displayDate || moment.months(Number(selectedMonth) - 1)}</span>
        </button>
        {showOptions && (
          <div className="absolute w-full bg-white border border-gray-300 rounded-b-lg shadow-sm">
            <div className="px-4 py-2 grid grid-cols-3 gap-4 ">
              {months.map((option) => (
                <button
                  key={option.value}
                  type="submit"
                  className="text-gray-700 hover:text-gray-500 focus:outline-none focus:bg-gray-100"
                  onClick={() => {
                    handleDateChange(option)
                    toggleOptions()
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </aside>
    </Form>
  )
}

export default DatePicker
