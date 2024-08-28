import { Link } from 'react-router-dom'
import { User } from './types'
// import { usersData } from './userData'
import { useEffect, useState } from 'react'


export default function App() {
  const [usersData,setUsersData] = useState([])
  useEffect(()=>{
    fetch("http://localhost:4500/users")
    .then((data)=>data.json())
    .then((data)=>{
      console.log("data",data.users)
      setUsersData(data.users)
    })
    .catch((err)=>console.log("err",err))
  },[])
  const users = usersData.map((user:User)=>(
    <div key={user._id} className=" border justify-between p-5 rounded-md shadow-md flex gap-5">
      <Link to={user._id.toString()} className='w-full'>
      <p>Name: <span>{user.name}</span></p>
      <p>Email: <span>{user.email}</span></p> 
      </Link>
      <div className="flex gap-5">
        <button className="px-5  rounded-md bg-red-500 text-white">Delete</button>
        <button className="px-5  rounded-md bg-teal-700 text-white">Update</button>
      </div>     
    </div>
  ))
  return (
    <>
    <h1 className="font-bold text-xl">All Users</h1>
    <div className='flex flex-col gap-1 pr-20'>
    {users}
    </div>
    </>
  )
}