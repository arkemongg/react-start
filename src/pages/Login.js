import { Link } from 'react-router-dom'
import './styles/Login.css'
import img from './assets/logo.png'
import { useEffect, useState } from 'react'
import { validatePassword } from './templates.js'
import { apiUrl } from "../urls";
import axios from 'axios'
import { useHistory } from 'react-router-dom';

const LoginArea = (props) => {
  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')
  const [validate, setValidate] = useState('')
  const [error, setError] = useState('')
  let timeoutId = null;
  const hadnleLogin = (event) => {
    event.preventDefault();
    if (!validate) {
      return
    }
    props.setLoading(true)
    const data = {
      username: username,
      password: pass
    }
    const loginUrl = apiUrl + '/auth/jwt/create'
    const loginData = axios.post(loginUrl, data)
    loginData.then(data => {
      if (data.status === 200) {
        localStorage.setItem('data', data.data.access)
        setTimeout(() => {
          window.location = '/profile'
        }, 3000);
      }
    })
      .catch(error => {
        setError(error.message)
        
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
          props.setLoading(false)
        }, 2000);
      })
  }

  useEffect(() => {
    if (pass === '') {
      setError('')
    }
  }, [pass])

  const handlePassword = (e) => {
    setPass(e.target.value)
    setValidate(validatePassword(pass))
    if (!validate) {
      setError("Password not standard")
    } else {
      setError('')
    }
  }
  return (
    <div className={`p-6 space-y-4 md:space-y-6 sm:p-8 ${props.loading?'invisible':''}`}>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Sign in to your account
      </h1>
      <form className="space-y-4 md:space-y-6" onSubmit={hadnleLogin}>
        <div>
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
          <input
            type="username"
            name="username"
            id="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Username"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={pass}
            onChange={handlePassword}
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-start">
            {/* <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                    </div> */}
          </div>
          <Link to={'/reset'} className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
        </div>
        {(error !== '' ? <p className='text-xs' style={{ color: "red" }}>{error}</p> : '')}
        <button
          type="submit"
          className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Sign in
        </button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Don’t have an account yet? <Link to={'/register/'} href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
        </p>
      </form>
    </div>
  )
}


const Login = () => {

  const [loginLoading, setLoginLoading] = useState(false)

  // useEffect(()=>{

  // },[loginLoading])
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 login-section">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-10 h-15 mr-2" src={img} alt="logo" />
            Piscrow
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 login-area">
              <LoginArea loading = {loginLoading} setLoading = {setLoginLoading}/>
              <div className={`loading-area ${loginLoading?'':'invisible'}`}>
                <div className='loading loading-ring loading-lg'></div>
              </div>
          </div>
        </div>
      </section>



    </>
  )
}

export default Login