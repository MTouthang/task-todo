import React, { useContext, useState } from 'react'

/** appwrite for user account*/
import account from '../config/appwrite'

/** react-router-dom for routing */
import { useNavigate } from 'react-router-dom'

/** context api for userDetails */
import userContext from '../contextAPI/userContext'



const Login = () => {
  const navigate = useNavigate()

  
  const {userDetails, setUserDetails} = useContext(userContext)
  

  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const loginUser = async (e) => {
    e.preventDefault()

    try {
       await account.createEmailSession(user.email, user.password)
      const acc =  await account.get()
      
      if(acc){
        setUserDetails(acc)
      }
      
    } catch (error) {
      console.log(error)
    }
   
  }
  
  

  if(userDetails){
    navigate("/")
  }

  return (
    <div>
        <section className="text-gray-600">
            <div className=" py-10 flex flex-wrap items-center  ">
                <div className=" bg-gray-100 rounded-lg p-8 flex flex-col md:m-auto lg:m-auto md:mt-0 border-2 ">
                    <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Login</h2>
                    <div className="relative mb-4">
                      <label 
                       className="full-name leading-7 text-sm text-gray-600"
                       htmlFor='email'
                       >Email</label>
                      <input 
                      type="email" 
                      id="email" 
                      name="email"
                      onChange={e => {
                        setUser({
                          ...user,
                          email: e.target.value
                        })
                      }} 
                      className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                    </div>
                    <div className="relative mb-4">
                      <label 
                      htmlFor="email" 
                      className="leading-7 text-sm text-gray-600"
                      >Password
                      </label>
                      <input 
                      type="password" 
                      id="email" 
                      name="email" 
                      onChange={e => {
                        setUser({
                          ...user,
                          password: e.target.value
                        })
                      }}
                      className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                    </div>
                    <button 
                    className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                    onClick={loginUser}
                    >Login</button>
                    
                </div>
            </div>
  </section>
    </div>
  )
}

export default Login