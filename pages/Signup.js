/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import React from 'react'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import Router from 'next/router';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
const Signup = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sw, setsw] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) { Router.push("/") }
    if (screen.width > 500) {
      setsw(true)
    }
  }, []);
  const handleChange = (e) => {
    if (e.target.name == "name") {
      setName(e.target.value)
    }
    if (e.target.name == "email") {
      setEmail(e.target.value)
    }
    if (e.target.name == "password") {
      setPassword(e.target.value)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { name, email, password }
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify(data)
    })
    let response = await res.json()
    if (response.success) {
      setEmail("")
      setName("")
      setPassword("")
      toast.success('congratulation your account is signed up', {
        position: "top-center",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        Router.push("/Login")
      }, 2000);

    }
  }
  const assign = (obj) => {
    return { name: obj.name, email: obj.email, password: obj.email }
  }
  const auth = async (e) => {
    let obj = await jwtDecode(e.credential)
    const data = await assign(obj)

    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify(data)
    })
    let response = await res.json()
    setEmail("")
    setName("")
    setPassword("")
    if (response.success) {
      toast.success('congratulation your account is signed up', {
        position: "top-center",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        Router.push("/Login")
      }, 2000);
    }
  }
  return (
    <div className="min-h-full flex items-center justify-center">
      <div className='flex pt-8 pb-32 drop-shadow-md'>
        {sw && <div className='bg-[#565fa1] text-center font-medium flex flex-col items-center justify-center w-80 space-y-5'>
          <h1 className='text-3xl font-semibold  '>Welcome back</h1>
          <p>To keep connected with us please <br></br>login with your personal info</p>
          <button className='px-8 hover:shadow-lg bg-white text-gray-700 shadow-black py-1 drop-shadow-md '><a href='/Login'>SIGN IN</a></button>
        </div>}
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className='bg-white md:px-32 py-2 md:py-12'>
          <div className="max-w-md w-full space-y-8 ">
            <div>
              <img
                className="mx-auto h-10 md:h-20 w-auto"
                src="https://img.icons8.com/clouds/100/000000/github.png"
                alt="Workflow"
              />
              <h2 className="mt-6 text-center md:text-3xl px-4 font-extrabold text-gray-900">Sign up on Repos Finder<br></br> or <a className='underline underline-offset-4 decoration-2 decoration-[#565fa1] text-sm font-normal' href='/Login'>SIGN IN</a></h2>

            </div>
            <form onSubmit={handleSubmit} className="mt-8 scale-90 md:scale-100 space-y-6" method="POST">
              <input type="hidden" name="remember" defaultValue="true" />
              <div className=" shadow-sm ">
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input onChange={handleChange}
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    className="appearance-none  relative block w-full px-3 py-2 border mb-2 bg-gray-200 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                    placeholder="Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input onChange={handleChange}
                    id="emai"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    className="appearance-none  relative block w-full px-3 py-2 border mb-2 bg-gray-200 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input onChange={handleChange}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    required
                    value={password}
                    className="appearance-none  relative block w-full px-3 py-2 border bg-gray-200 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">



                <button
                  type="submit"
                  className="group bg-[#565fa1] drop-shadow-sm relative w-full flex justify-center py-2 px-4 border hover:shadow-lg  text-sm font-medium  "
                >

                  Sign up
                </button>
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
              /></GoogleOAuthProvider></div>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup