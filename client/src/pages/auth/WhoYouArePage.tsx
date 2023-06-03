import { SiSpringCreators } from 'react-icons/si'
import { MdHandshake } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

type Props = {}

const WhoYouArePage = (props: Props) => {
  const [userType, setUserType] = useState<'/creator-search' | '/signup/brand'>('/creator-search')

  return (
    <div className="md:h-screen w-full flex flex-col text-center items-center gap-8 justify-center max-md:py-[20%]">
      <div className="h-20 max-md:hidden"></div>
      <h5 className="text-lg text-black font-medium">
        Are you a Creator or a Brand/Agency?
      </h5>

      <div className="flex items-center justify-center gap-5 w-6/12 max-md:w-full px-3 mx-auto text-main">
        <button
          onClick={() => setUserType('/creator-search')}
          className={`${
            userType === '/creator-search'
              ? 'shadow-2xl border-light bg-light'
              : ' border-white bg-white'
          } shadow-2xl border-1 w-56 max-md:w-60 py-5  rounded-lg flex flex-col items-center justify-center gap-6 cursor-pointer`}
        >
          <SiSpringCreators size={50} className="text-black" />
          <h5 className="text-md font-bold">Creator</h5>
        </button>
        <button
          onClick={() => setUserType('/signup/brand')}
          className={`${
            userType === '/signup/brand'
              ? 'shadow-2xl border-light bg-light'
              : 'border-white bg-white'
          } shadow-2xl border-1 w-56 max-md:w-60 py-5 rounded-lg flex flex-col items-center justify-center gap-6 cursor-pointer`}
        >
          <MdHandshake size={50} className="text-black" />
          <h5 className="text-md font-bold">Brand/Agency</h5>
        </button>
      </div>

      <NavLink
        to={userType}
        className="ease-in duration-300 hover:-translate-y-1 hover:scale-110 border-1 border-main bg-main text-white font-medium rounded-full p-3 w-56 my-3"
      >
        Next
      </NavLink>

      <p className="text-md text-light-gray font-medium mt-24">
        Already have an account?
        <NavLink to={'/login'} className={'text-main font-bold'}>
          {' '}
          Sign In
        </NavLink>
      </p>
    </div>
  )
}

export default WhoYouArePage
