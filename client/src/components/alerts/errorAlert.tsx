import { Fragment } from 'react'

type Props = {
  errorMessage?: string | null
}

const ErrorAlert = (props: Props) => {
  let isError = Boolean(props.errorMessage)
  return (
    <Fragment>
      {isError && (
        <div
          className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
          role="alert"
        >
          <p className="font-bold">Error</p>
          <p>{props.errorMessage}</p>
        </div>
      )}
    </Fragment>
  )
}

export default ErrorAlert
