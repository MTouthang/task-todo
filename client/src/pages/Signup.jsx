import React, {useState} from 'react'

/** appwrite for user account */
import account from '../config/appwrite'
import { ID } from "appwrite"

/** react-router-dom for routing */
import { useNavigate } from "react-router-dom";



const Signup = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email:"",
    password: ""
  })

  // signup 
  const signUpUser =  (e) => {
    e.preventDefault()
  
    const promise =  account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
  
    );
    
    promise.then(
      function(response) {
      console.log(response)
      // navigate to Login
      // setUserDetails(user)
      if(response){
       navigate("/login")
      }
    }, function(error) {
      console.log(error)
    })

  }

 
 
  return (
    <div>
        <section className="text-gray-600 width ">
            <div className="container py-10 flex flex-wrap items-center  ">
                <div className=" bg-gray-100 rounded-lg p-8 flex flex-col md:m-auto lg:m-auto md:mt-0 border-2 ">
                    <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign Up</h2>
                    <div className="relative mb-4">
                      <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">Name</label>
                      <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      onChange={(e) => {
                        setUser({
                          ...user,
                          name: e.target.value
                        })
                      }}
                      />
                    </div>
                    <div className="relative mb-4">
                      <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">Email</label>
                      <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      onChange={(e) => {
                        setUser({
                          ...user,
                          email: e.target.value
                        })
                      }}
                      />
                    </div>
                    <div className="relative mb-4">
                      <label htmlFor="email" className="leading-7 text-sm text-gray-600">Password</label>
                      <input 
                      type="password" 
                      id="password" 
                      name="password" 
                      className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      onChange={(e) => {
                        setUser({
                          ...user,
                          password: e.target.value
                        })
                      }}
                      />
                      </div>
                    <button 
                    className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                    onClick={signUpUser}
                    >Sign Up</button>
                    <a
                    className='text-center py-3 hover:text-indigo-500'
                   href='/login'
                    > Already have account? Login here</a>

                </div>
            </div>
  </section>
    </div>
  )
}

export default Signup