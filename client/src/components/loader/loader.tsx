import React from 'react'
import { ImSpinner2 } from 'react-icons/im'

type Props = {}

const Loader = (props: Props) => {
  return (
    <section className="w-full h-full flex items-center justify-center gap-5">
      <h1 className='text-4xl text-main font-semibold'>Creatorly.</h1>
      <ImSpinner2 size={30} className='animate-spin text-main' />
    </section>
  )
}

export default Loader
