import React from 'react'

export default function Nav() {
  const auth = false
  return (
    <div className='bg-indigo-900 flex items-center justify-between p-4'>
      <div className="flex flex-col md:justify-between md:flex-row md:w-2/3">
        <h1 className='text-indigo-400 text-xl md:text-3xl'>Flurri</h1>
        <h1 className='text-white text-xl md:text-3xl pl-4'>New day - new note!</h1>
      </div>
      {
        auth ? <button className='bg-green-500 text-white text-xl md:text-3xl p-2 rounded'>Login</button> : <button className='bg-red-500 text-white text-xl md:text-3xl p-2 rounded'>Logout</button>
      }
    </div>
  )
}
