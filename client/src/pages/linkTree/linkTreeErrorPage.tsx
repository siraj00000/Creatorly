import React from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {}

const LinkTreeErrorPage = (props: Props) => {
  const navigate = useNavigate()
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="md:text-9xl text-7xl text-main font-semibold">
        Creatorly.
      </h1>
      <p className="text-lg text-black max-w-2xl">
        The page you’re looking for doesn’t exist.
      </p>
      <button
        onClick={() => navigate(-1)}
        className="ease-in duration-300 font-semibold text-main bg-white hover:-translate-y-1 hover:scale-110 hover:bg-white py-4 px-5 rounded-full"
      >
        Go Back
      </button>
    </main>
  )
}

export default LinkTreeErrorPage
