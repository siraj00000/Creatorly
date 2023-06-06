import React from 'react'

const NotesComponent: React.FC = () => {
  return (
    <div className="mt-10">
      <label
        htmlFor="notes"
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
      >
        Notes:
      </label>
      <textarea
        id="notes"
        rows={4}
        cols={50}
        name='note'
        placeholder="Notes - any relevant information not covered, additional terms and conditions"
        className="resize-none appearance-none block w-full h-28 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      ></textarea>
      <label
        htmlFor="notes"
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1 mt-5"
      >
        Signature
      </label>
      <input
        id="notes"
        name='signature'
        className="appearance-none block w-full max-w-xs h-8 text-gray-700 border-b-1 border-gray-200 py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      />
    </div>
  )
}

export default NotesComponent
