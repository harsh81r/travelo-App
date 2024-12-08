import React from 'react'
import { useGoogleLogin } from '@react-oauth/google'
function Header() {


  const login = useGoogleLogin({
    onSuccess:(codeResponse)=>console.log(codeResponse),
    onError:(error)=>console.log(error)
  })
  


  return (
    <div className='p-2 shadaw-sm flex justify-between items-center px-2 bg-black '>
      <span> <img    className=" "  src='/logo.svg'/></span> 
        <button  onClick={login} class="bg-zinc-950 text-white  font-semibold p px-2 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out">
  Sign In

</button>
    </div>
  )
}

export default Header