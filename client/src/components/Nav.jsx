import React from 'react'

export default function Nav() {
  const auth = !!window.localStorage.getItem('token')
  const [email, setEmail] = React.useState(
    window.localStorage.getItem('email') || ''
  )
  const [password, setPassword] = React.useState('')
  const [formOn, setFormOn] = React.useState(false)
  const openForm = () => {
    setFormOn(!formOn)
  }
  const [formValue, setFormValue] = React.useState(false)
  const switchForm = () => {
    setFormValue(!formValue)
  }

  const registerHandler = async () => {
    try {
      const res = await fetch('http://localhost:4999/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()
      console.log(data)
      if (data.token) {
        window.localStorage.setItem('token', data.token)
        window.localStorage.setItem('email', data.email)
      }
      alert(data.message)
      setFormOn(false)

    } catch (err) {
      console.log(err)
      alert('Registration error')
    }
  }
  const loginHandler = async () => {
    try {
      const res = await fetch('http://localhost:4999/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
      })
      const data = await res.json()
      console.log(data)
      if (data.token) {
        window.localStorage.setItem('token', data.token)
        window.localStorage.setItem('email', data.user.email)
      }
      alert(data.message)
      setFormOn(false)

    } catch(err) {
      console.log(err)
      alert('Login error')
    }
  }
  const logoutHandler = () => {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('email')
    alert('Logged out successfully')
    setTimeout(() => {
      window.location.reload()
    }, 2000)
  }
  return (
    <div className='bg-indigo-900 flex items-center justify-between p-4'>
      <div className="flex flex-col md:justify-between md:flex-row md:w-2/3">
        <h1 className='text-indigo-400 text-xl md:text-3xl'>Flurri</h1>
        <h1 className='text-white text-xl md:text-3xl pl-4'>New day - new note!</h1>
      </div>
      {
        !auth ? <button className='bg-green-500 text-white text-xl md:text-3xl p-2 rounded' onClick={openForm}>Login</button> : <button className='bg-red-500 text-white text-xl md:text-3xl p-2 rounded' onClick={logoutHandler}>Logout</button>
      }
      {
        formOn && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-md min-h-screen flex justify-center items-center" onClick={openForm}>
            {
              !formValue ? <div className="w-full max-w-sm mx-auto mt-20 p-6 rounded-xl bg-slate-400 shadow-lg" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-2xl font-semibold text-center text-white mb-6">
                  Register
                </h2>

                <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
                  <input
                    type="text"
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex items-center">
                    <button
                      className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 px-4"
                      onClick={registerHandler}
                    >
                      Register
                    </button>
                    <div
                      className="ml-auto text-white cursor-pointer border-2 hover:border-dashed px-2 rounded-lg p-2"
                      onClick={switchForm}
                    >
                      Already have an account?
                    </div>
                  </div>
                </form>
              </div> : <div className="w-full max-w-sm mx-auto mt-20 p-6 rounded-xl bg-slate-400 shadow-lg" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-2xl font-semibold text-center text-white mb-6">
                  Login
                </h2>

                <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
                  <input
                    type="text"
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex items-center">
                    <button
                      className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 px-4"
                      onClick={loginHandler}
                    >
                      Login
                    </button>
                    <div
                      className="ml-auto text-white cursor-pointer border-2 hover:border-dashed px-2 rounded-lg p-2"
                      onClick={switchForm}
                    >
                      Don't have an account?
                    </div>
                  </div>
                </form>
              </div>
            }

          </div>)
      }
    </div>
  )
}
