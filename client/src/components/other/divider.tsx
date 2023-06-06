import React from 'react'

type Props = {
  borderStyles?: 'dashed' | 'solid'
}

const Divider: React.FC<Props> = ({ borderStyles = 'solid' }) => {
  return <div className={`w-full border-t-1 ${borderStyles} my-5`}></div>
}

export default Divider
