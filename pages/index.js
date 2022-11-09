import React, { useState, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Head from 'next/head';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Octokit } from 'octokit';
import { createOAuthAppAuth } from '@octokit/auth-oauth-app';
const Home = () => {
  const [username, setusername] = useState("");
  const [user, setuser] = useState();
  const [data, setdata] = useState([]);
  const [ready, setready] = useState(false);
  const [start, setstart] = useState(false);
  const [page, setpage] = useState(1);
  const [nf, setnf] = useState(false);
  const [history, sethistory] = useState([]);

  const octokit = new Octokit({
    authStrategy: createOAuthAppAuth,
    auth: {
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    },
  })

  const handleChange = (e) => {
    setusername(e.target.value);
  }


  const pagechange = () => {
    setstart(true)
    setpage(page + 1)

  }
  useEffect(() => {
    changed();
  }, [page]);

  const changed = async () => {
    const res = await octokit.request(`GET /users/{username}/repos`, { username: username, per_page: 10, page: page })
    setdata(data.concat(res.data))
  }
  useEffect(() => {
    console.log(data)
  }, [data]);

  const search = async () => {
    sethistory(history.concat(username))
    localStorage.setItem("history",JSON.stringify(history))
    setdata([])
    setready(false)
    setpage(1)
    setstart(true)
    try {
      const response = await octokit.request('GET /users/{username}', {
        username: username
      }
      )

      setuser(response.data)
      const res = await octokit.request(`GET /users/{username}/repos`, { username: username, per_page: 10 })
      setdata(data.concat(res.data))
      setready(true)
      setstart(false)
    }
    catch (err) {
      setstart(false)
      setnf(true)
    }

  }



  return (
    <div className=''>
      <Head>
        <title>repos finder</title>
        <link rel='icon' href="https://img.icons8.com/3d-fluency/100/000000/3d-fluency-github-logo.png"></link>
      </Head>
      <div className='flex flex-col md:items-center md:justify-between md:flex-row' style={{ padding: "0vh 2vh" }}>

        <div className='absolute top-8 w-full justify-center flex '>
          <input className='px-[2vh] w-1/5 py-[1vh] text-[2.2vh] rounded-lg' value={username} placeholder='enter the usename' onChange={(e) => handleChange(e)}></input>
          <button className='hover:opacity-90 text-black text-[3vh] text-center bg-[#c7ede6] rounded-lg  w-[15vh]  ml-[4vw] md:ml-[5vh] ' onClick={search}>search</button></div>
      </div>


      {ready ? <div> <div className=' px-[4vh]  py-[5vh] h-[40vh] flex flex-col md:flex-row  md:space-x-[16vh]' >
        <div className='flex flex-col justify-center items-center '>
          <img className='w-[30vh]  border-2 p-[0.5vh] rounded-full drop-shadow-xl' src={user.avatar_url}></img>
          <div className='flex mt-[2vh] ' ><img className='mr-[1vh] h-[4vh]' src="https://img.icons8.com/material-rounded/24/22C3E6/link--v1.png" /><a className='truncate text-[2.5vh]' href={user.html_url}>{user.html_url}</a></div>
        </div>
        <div className='mt-[3vh] w-full  text-center md:text-start space-y-[2vh]'>
          <h1 className='text-[4vh]  uppercase font-bold tracking-widest'>{user.name}</h1>
          <p>{user.bio}</p>
          <div className='flex text-[2.5vh] '><img className='h-[4vh] mr-[1vh]' src="https://img.icons8.com/office/48/000000/marker.png" />{user.location}</div>
          <div className='flex text-[2.5vh]'><img className='h-[4vh] mr-[1vh]' src="https://img.icons8.com/fluency/48/000000/twitter.png" /><a href={`https://twitter.com/${user.twitter_username}`}>{user.twitter_username}</a></div>
        </div>
      </div>

        <h1 className='text-center md:text-[4vw] text-[4vh] mt-[36vh] md:mt-0 font-medium py-[3vh]'>Repostries : {user.public_repos}</h1>
        <InfiniteScroll
          className='flex flex-col md:grid md:grid-cols-2 grid-flow-row px-[2vh]   py-[6vh]'
          dataLength={data.length} //This is important field to render the next data
          next={pagechange}
          hasMore={page * 10 <= user.public_repos}
          loader={<h4>Loading...</h4>}
          endMessage={
            <div style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </div>
          }
        >
          {data.map((r) => {
            return <a href={r.html_url} key={r.html_url} className="border-2 hover:bg-[#c7ede6] break-words rounded-xl hover:border-[#c7ede6] transition-all duration-700 hover:text-black cursor-pointer space-y-[3vh] border-white m-[2vh] p-[2vh]"><h1 className='text-[4vh] font-semibold'>{r.name}</h1>
              <p className='truncate text-[2.5vh]' >{r.description}</p>
              <p className='bg-[#565fa1] h-[5.5vh] rounded-lg w-[18vh] text-white flex text-[2.5vh] justify-center items-center '>{r.language}</p>
            </a>
          })}
        </InfiniteScroll>

      </div> : start ?

        <Box className='fixed top-[50%] left-[50%]' sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box> : nf ? <div className='flex justify-center items-center text-[2vh] md:text-[2vw] flex-col md:flex-row'><p>No user found</p><img className='h-[50vh]' src="https://img.icons8.com/clouds/400/000000/error.png" /></div> : <div className='flex justify-center flex-col items-center h-[100%]'><img className='h-[50vh]' src="https://img.icons8.com/clouds/400/000000/enter-2.png" /><p className='text-[3vh]'>Made with ❤️ by <a className='font-bold ' href='https://www.linkedin.com/in/rohit-rawat-a41b411a9/'>rohit rawat</a></p></div>}





    </div>
  )
}

export default Home
