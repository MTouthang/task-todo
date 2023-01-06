import React, { useContext } from 'react'

/**appwrite for user account */
import account from '../config/appwrite'

/** react-router-dom for routing */
import { useNavigate } from 'react-router'

/** context api for userDetails */
import userContext from '../contextAPI/userContext'

const NavBar = () => {

  const navigate = useNavigate()
  const {userDetails, setUserDetails} = useContext(userContext)

  //logout function ---
  const logout = async () => {
    try {
      await account.deleteSession("current")
      navigate("/signup")
      setUserDetails(null)
      
    } catch (error) {
      console.log(error)
    }
   
  }
  

  return (
    <header className="text-gray-900 body-font">
        <div className=" mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between bg-gray-100">
            <a  className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" 
            href='/'>
            
              <span className="ml-3 text-xl">Task-Todo</span>
            </a>
            {!userDetails ? "": 
            <nav className="md:py-1 md:pl-4  md:border-gray-400	flex flex-wrap">
            <button 
              className="inline-flex items-center bg-gray-400  py-1 px-3 focus:outline-none hover:bg-red-400  rounded text-base mt-4 md:mt-0 mr-2"
              onClick={logout}
            > Logout
            
            </button>
           
            </nav>
          }
            
            
        </div>
</header>
  )
}

export default NavBar