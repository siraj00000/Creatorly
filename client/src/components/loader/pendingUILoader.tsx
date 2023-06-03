import React from 'react'
import { GiCagedBall } from 'react-icons/gi'

type Props = {}

const PendingUILoader = (props: Props) => {
  return (
    <div className="flex items-center flex-col justify-center w-full h-screen bg-light">
      <GiCagedBall className="animate-bounce" size={70} />
      in progress...
    </div>
  )
}

export default PendingUILoader
