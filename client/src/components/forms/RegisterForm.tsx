import { Form, NavLink, useLocation } from 'react-router-dom'
import { signUpInputPropertiesList } from '../../constants/signupInputProperies'
import ErrorAlert from '../alerts/errorAlert'
import SuccessAlert from '../alerts/successAlert'
import { useState } from 'react'
import { GrView } from 'react-icons/gr'
import { RxEyeClosed } from 'react-icons/rx'

type Props = {
  isSubmitting: boolean
  errorMessage?: string
  successMessage?: string
  creatorLink?: any
}

const UserRegisterationForm = (props: Props) => {
  const { pathname } = useLocation()
  const [inputList, setInputList] = useState(signUpInputPropertiesList)

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
      action={`/signup/${pathname.split('/')[2]}`}
      className="w-full max-w-lg mx-auto pt-10 px-4"
    >
      <h4 className="text-4xl font-semibold text-main mb-8">
        Sign up to Creatorly.
      </h4>

      {/* Alerts */}
      <div className="my-4">
        <ErrorAlert errorMessage={props.errorMessage} />
        <SuccessAlert successMessage={props.successMessage} />
      </div>

      <>
        {inputList.map((input, index) => (
          <div className="flex flex-wrap -mx-3" key={index}>
            <div className="w-full px-3 relative">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                {input.label}
              </label>
              <input
                className="appearance-none block w-full  bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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

        {/**
         * This input be render but will contain the creatorLink by the name
         */}
        <input
          type="text"
          name="instagramLink"
          defaultValue={props.creatorLink}
          className="hidden"
        />
      </>

      <button className="border-1 border-main bg-main text-white font-medium rounded-full p-3 w-full my-3">
        {props.isSubmitting ? 'Submitting...' : 'Signup'}
      </button>

      <p className="text-md text-light-gray font-medium mt-10 text-center">
        Already have an account?
        <NavLink to={'/login'} className={'text-main font-bold'}>
          {' '}
          Login
        </NavLink>
      </p>
    </Form>
  )
}

export default UserRegisterationForm
