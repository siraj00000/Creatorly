import React from 'react'
import { NavLink } from 'react-router-dom'

type Props = {}

const _404page = (props: Props) => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-5">
      <h1 className="text-9xl font-bold text-main">Oops!</h1>
      <h4 className="text-xl font-semibold">404 - Page Not Found</h4>
      <p className='w-1/2 mx-auto text-center'>
        The page you are looking for might have removed had its name changed or
        is temporarily unavailable
      </p>
      <NavLink
        to={'/login'}
        replace={true}
        className="ease-in duration-300 hover:-translate-y-1 hover:scale-110 text-center border-1 border-main bg-main text-white font-medium rounded-full p-3 w-56 my-3"
      >
        Go Back
      </NavLink>
    </div>
  )
}

export default _404page
