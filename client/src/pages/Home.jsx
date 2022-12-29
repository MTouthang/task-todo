import React, { useContext } from 'react'
import { Navigate } from 'react-router'
import Todo from '../Components/Todo'
import TodoForm from '../Components/TodoForm'

import userContext from '../contextAPI/userContext'

const Home = () => {


  const {userDetails} = useContext(userContext)

  console.log({userDetails})


  if(!userDetails){
    return <Navigate replace to="/signup"/>
  }

  console.log(userDetails.$id)

  return (
    <div>
     
        <TodoForm/>
        <h1 className='text-center mx-auto'> Tasks List - </h1>
        <Todo/>
        
    </div>
  )
}

export default Home