import React, { useState } from 'react'
import Login from '../components/Login'
import Signup from '../components/SignUp'

function Auth() {


  const [state, setState] = useState('login')

  return (
    <div className='auth w-full h-screen bg-blue-100 flex items-center justify-center'>
      {
        state === 'login'
        ?
        <Login state={state} setState={setState} />
        :
        <Signup state={state} setState={setState} />
      }
    </div>
  )
}

export default Auth
