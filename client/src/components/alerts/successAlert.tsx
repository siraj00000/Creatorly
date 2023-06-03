import { Fragment } from 'react'

type Props = {
  successMessage?: string | null
}

const SuccessAlert = (props: Props) => {
  let isSuccess = Boolean(props.successMessage)
  return (
    <Fragment>
      {isSuccess && (
        <div
          className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4"
          role="alert"
        >
          <p className="font-bold">Sucess</p>
          <p>{props.successMessage}</p>
        </div>
      )}
    </Fragment>
  )
}

// eslint-disable-next-line react-hooks/exhaustive-deps
export default SuccessAlert
