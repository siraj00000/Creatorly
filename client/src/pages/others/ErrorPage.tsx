import { useRouteError } from 'react-router-dom'
import { ApiErrorResponse } from '../../types/response.types'

type Props = {}

const ErrorPage = (props: Props) => {
    const error = useRouteError() as ApiErrorResponse
    console.log({error});
    
  return <h1>Error Page</h1>
}

export default ErrorPage
