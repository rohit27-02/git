/* eslint-disable @next/next/no-head-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useEffect, useState } from 'react';
import Router from 'next/router';


const Contact = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [message, setmessage] = useState("");
  const [number, setnumber] = useState("");
  const [sw, setsw] = useState(false);

  function handleChange(e) {
    if (e.target.id == "name") {
      setname(e.target.value)
    }
    else if (e.target.id == "email") {
      setemail(e.target.value)
    }
    else if (e.target.id == "message") {
      setmessage(e.target.value)
    }
    else if (e.target.id == "number") {
      setnumber(e.target.value)
    }
  }
  async function submit(e) {
    const data = { name, email, message,number }
    console.log(data)
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify(data)
    })
    let response = await res.json()
    console.log(response)
    if (response.success=="success") {
      setemail("")
      setname("")
      setmessage("")
      setnumber("")
      toast.success('Your feedback has been submitted', {
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
      }, 3000);
    }
  }

  
  useEffect(() => {
    if(screen.width>768){
      setsw(true)
    }
    
  }, []);

 

  return (<>


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
  

<section  style={{fontFamily: "'Roboto Slab', serif"}} className="text-white ">
  <div style={sw?{padding:" 7.5vw 1.575vw"}:{padding:" 7.5vw 1.575vh"}} className=" px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
    
    <div style={sw?{lineHeight:"5vw",fontSize:"1.25vw",marginLeft:"2vw"}:{lineHeight:"5vh",fontSize:"1.25vh"}} className=" md:w-1/2  flex  flex-col md:ml-auto w-full">
      <h2 style={sw?{fontFamily: "'Fjalla One', sans-serif",wordSpacing:2,fontSize:"1.875vw",marginBottom:"1vw"}:{fontFamily: "'Fjalla One', sans-serif",wordSpacing:2,fontSize:"1.875vh",marginBottom:"1vh",marginTop:"2vh"}} className="text-white md:text-2xl 2xl:text-3xl mb-1 font-medium title-font">LEAVE A COMMENT</h2>
      
     
      <div >
        
        <input placeholder='Name' required onChange={(e)=>handleChange(e)} type="text" style={sw?{width:"23vw",height:"3.4vw",padding:"0.325vw 0.9375vw"}:{height:"3.4vh",padding:"0.325vh 0.9375vh"}} id="name" name="name" className="w-full border border-gray-300  focus:ring-2 focus:ring-[#565fa1]  outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
     
      
      <div style={{marginBottom:"1vw"}} className="flex flex-col relative ">
      <div >
      
        <input placeholder='Email' required onChange={(e)=>handleChange(e)} type="email" id="email" style={sw?{width:"23vw",height:"3.4vw",padding:"0.325vw 0.9375vw"}:{height:"3.4vh",padding:"0.325vh 0.9375vh"}} name="email" className="w-full  border border-gray-300  focus:ring-2 focus:ring-[#565fa1]  outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div >
        
        <input placeholder='Number ' required onChange={(e)=>handleChange(e)} type="number" id="number" style={sw?{width:"23vw",height:"3.4vw",padding:"0.325vw 0.9375vw"}:{height:"3.4vh",padding:"0.325vh 0.9375vh"}} name="number" className="w-full  border border-gray-300  focus:ring-2 focus:ring-[#565fa1]  outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      </div>
      <div style={sw?{marginBottom:"1.5vw"}:{marginBottom:"1.5vh"}} className="flex relative mb-4">
       
        <textarea style={sw?{width:"48vw",height:"10vw",padding:"1vw 0.9375vw"}:{width:"50vh",height:"10vh",padding:"1vh 0.9375vh"}} placeholder='Write your message here ' required onChange={(e)=>handleChange(e)} id="message" name="message" className="  border border-gray-300  focus:ring-2 focus:ring-[#565fa1] h-32  outline-none  py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
      </div>
      <div><button style={sw?{height:"2.825vw",width:"7.5vw",fontSize:"1.25vw"}:{height:"2.825vh",width:"7.5vh",fontSize:"1.25vh"}} onClick={(e)=>submit(e)} className="bg-[#565fa1]  flex justify-center items-center float-left shadow-xl hover:scale-105 duration-500 border-0 py-2 px-6  text-sm 2xl:text-lg">Submit</button></div>
     
    </div>
  </div>
</section>




    </>
  )
}

export default Contact