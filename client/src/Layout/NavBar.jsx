import React from 'react'


const NavBar = () => {
  return (
    <header className="text-gray-900 body-font">
        <div className=" mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between bg-gray-100">
            <a  className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" 
            href='facebook.com'>
            
              <span className="ml-3 text-xl">Task-Todo</span>
            </a>
            <nav className="md:py-1 md:pl-4  md:border-gray-400	flex flex-wrap">
            <button 
        
            className="inline-flex items-center bg-gray-100 border-2 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 mr-2"> Signup
            
            </button>
            <button className="inline-flex items-center bg-gray-100 border-2 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 ml-2">Login 
            
            </button>
            </nav>
            
        </div>
</header>
  )
}

export default NavBar