import React from 'react'

const about = () => {
  return (
    <div className='px-[5vw] '>
      <section class="text-gray-300 body-font">
        <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <img class="lg:w-2/6 md:w-3/6 w-5/6  object-cover object-center rounded" alt="hero" src="https://img.icons8.com/clouds/500/000000/github.png"/>
            <div class="text-center lg:w-2/3 w-full">
              <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-200">Github Repostries Finder</h1>
              <p class="mb-8 leading-relaxed">This is a simple application which can be used to find anyone's github public Repostries. I have used github Octokit sdk to do so. It fetches 10 Repostries at a time and combined with InfiniteScroll it displays all the data . </p>
              <div class="flex justify-center">
                <a target={'/blank'} href='https://github.com/rohit27-02/git' class="inline-flex text-black justify-between pr-[3vh] md:pr-[3vw] font-medium items-center  bg-gray-100 border-0 w-[12vh] md:w-[10vw] focus:outline-none hover:bg-white rounded-full"><img className='h-[4vh] md:h-[4vw]' src="/icons8-github-100.png"/>Github</a>
              </div>
            </div>
        </div>
      </section>
    </div>
  )
}

export default about