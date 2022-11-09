/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from 'next/router';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sw, setsw] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      Router.push("/")
    }
    if (screen.width > 500) {
      setsw(true)
    }
  }, []);
  const handleChange = (e) => {

    if (e.target.name == "email") {
      setEmail(e.target.value)
    }
    if (e.target.name == "password") {
      setPassword(e.target.value)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { email, password }
    let res = await fetch(`/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify(data)
    })
    let response = await res.json()
    setEmail("")
    setPassword("")
    if (response.admin) {
      localStorage.setItem("admin", response.admin)
    }
    if (response.success) {
      localStorage.setItem("token", response.token)
      toast.success('congratulation your are logged in', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        Router.push("/")
      }, 2000);
    }
    else {
      toast.error(response.error, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    }

  }
  function assign(obj) {
    return { email: obj.email }
  }
  const auth = async (res) => {
    const obj = await jwtDecode(res.credential)
    setEmail(obj.email)
    const data = await assign(obj)
    let response = await fetch(`/api/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify(data)
    })
    let status = await response.json()
    setEmail("")
    if (status.success) {
      localStorage.setItem("token", status.token)
      toast.success('congratulation your are logged in', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        Router.push("/")
      }, 2000);
    }
    else {
      toast.warning(status.error, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  return (
    <div className="min-h-full  flex items-center justify-center pt-8 pb-28 ">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className='flex drop-shadow-md'>
        <div className='bg-white block md:px-32 py-2 md:py-12'>
          <div className="max-w-md  w-full space-y-6">
            <div>
              <img
                className="mx-auto h-10 md:h-20 w-auto"
                src="https://img.icons8.com/clouds/100/000000/github.png"
                alt="Workflow"
              />
              <h2 className="mt-4 text-center px-4 md:text-3xl font-extrabold text-gray-800">Sign in to Repos Finder<br></br>  Or <a className='text-sm font-normal underline decoration-[#565fa1] decoration-2 underline-offset-4 ' href='/Signup'>SIGN UP</a></h2>

            </div>
            <form onSubmit={handleSubmit} className="mt-8 scale-90 md:scale-100 space-y-6" method="POST">
              <div className=" shadow-sm">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    onChange={handleChange}
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    autoComplete="email"
                    required
                    className="appearance-nonerelative block w-full px-3 py-2 border mb-2 bg-gray-200 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-[#C7EDE6] focus:border-[#C7EDE6] focus:z-10 sm:text-sm"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    onChange={handleChange}
                    value={password}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    required
                    className="appearance-none  relative block w-full px-3 py-2 border bg-gray-200 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-[#C7EDE6] focus:border-[#C7EDE6] focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className='pt-8 pb-4'>
                <button
                  type="submit"
                  className="group drop-shadow-sm relative w-full flex bg-[#565fa1] justify-center py-2 px-4 border hover:shadow-lg  text-sm font-medium  "
                >

                  SIGN IN
                </button>
                <div className="text-sm float-right">
                  <a href="/Forgot" className="font-medium text-gray-400 hover:text-gray-600">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className='flex justify-center space-x-2 '>
                <div className='border-b border-gray-800 my-3 w-32'></div>
                <div className='text-black'>Or</div>
                <div className='border-b border-gray-800 my-3 w-32'></div>
              </div>
              <div className='flex justify-center'>
                <GoogleOAuthProvider clientId="390204161646-6noec67uc8qleni584kq3ojnbbebeo1i.apps.googleusercontent.com"><GoogleLogin
                  onSuccess={res => auth(res)}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                  auto_select
                  useOneTap
                /></GoogleOAuthProvider></div>
            </form>
          </div>
        </div>
        {sw && <div className='text-center bg-[#565FA1] font-medium flex flex-col items-center justify-center w-80 space-y-5'>
          <h1 className='text-3xl font-semibold  '>Hello, Friend!</h1>
          <p>Enter your personal details <br></br>and start journey with us</p>
          <button className='px-8 hover:shadow-lg shadow-black py-1 drop-shadow-md bg-white text-gray-700'><a href='/Signup'>SIGN UP</a></button>
        </div>}
      </div>
    </div>

  )
}

export default Login