import React from 'react'

type Props = { title: string }

const TitlebarComponent = ({ title }: Props) => {
  return (
    <section className="mb-10">
      <div className="flex space-x-4 py-4 px-4 border-b border-gray-200">
        <h2>{title}</h2>
      </div>
    </section>
  )
}

export default TitlebarComponent
