import { Form, NavLink } from 'react-router-dom'
import ErrorAlert from '../alerts/errorAlert'
import SuccessAlert from '../alerts/successAlert'
import { GrView } from 'react-icons/gr'
import { RxEyeClosed } from 'react-icons/rx'
import { useState } from 'react';
import { loginInputPropertiesList } from '../../constants/loginInputProperies';

type Props = {
  isSubmitting: boolean
  errorMessage?: string
  successMessage?: string
}

const LoginForm = (props: Props) => {
  const [inputList, setInputList] = useState(loginInputPropertiesList)

  const viewPasswordMethod = (index: number) => {
    let signUpInputsList = [...inputList]
    if (signUpInputsList[index].type === 'password') {
      signUpInputsList[index].type = 'text'
    } else {
      signUpInputsList[index].type = 'password'
    }

    setInputList(signUpInputsList)
  }
  return (
    <Form
      method="post"
      action="/login"
      className="w-full max-w-lg mx-auto pt-10 px-4"
    >
      <h4 className="text-4xl font-semibold text-main mb-8">
        Log In to Creatorly.
      </h4>

      {/* Alerts */}
      <div className="my-4">
        <ErrorAlert errorMessage={props.errorMessage} />
        <SuccessAlert successMessage={props.successMessage} />
      </div>
      <>
        {loginInputPropertiesList.map((input, index) => (
          <div className="flex flex-wrap -mx-3" key={index}>
            <div className="w-full px-3 relative">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                {input.label}
              </label>
              <input
                className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type={input.type}
                name={input.name}
                placeholder={input.placeholder}
              />
              {input.name === 'password' && (
                <button
                  type="button"
                  onClick={() => viewPasswordMethod(index)}
                  className="absolute right-8 bottom-7"
                >
                  {input.type === 'text' ? <GrView /> : <RxEyeClosed />}
                </button>
              )}
            </div>
          </div>
        ))}
      </>

      <p className="text-md text-light-gray font-medium mb-4">
        <NavLink to={'/login'} className={'text-red-400 font-bold'}>
          Forgot your password?
        </NavLink>
      </p>

      <button className="border-1 border-main bg-main text-white font-medium rounded-full p-3 w-full my-3">
        {props.isSubmitting ? 'Submitting...' : 'Login'}
      </button>

      <p className="text-md text-light-gray font-medium mt-10 text-center">
        Don't have an account?
        <NavLink to={'/who-you-are'} className={'text-main font-bold'}>
          {' '}
          Create
        </NavLink>
      </p>
    </Form>
  )
}

export default LoginForm
