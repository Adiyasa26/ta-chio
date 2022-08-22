import React from 'react'

import SignInForm from '../../components/login-form'
import SignUpForm from '../../components/regis-form'

import './style.scss'

const Auth = () => {
  return (
    <div className='auth-container'>
        <SignInForm />
    </div>
  )
}

export default Auth