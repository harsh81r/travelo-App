import React from 'react'

function Header() {
  return (
    <div className='p-3 shadaw-sm flex justify-between items-center px-2 bg-black '>
        <img src='/logo.svg'/>
        <button class="bg-zinc-950 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out">
  Sign In
</button>
    </div>
  )
}

export default Header