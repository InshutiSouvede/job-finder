import { User } from '../types'
// import { usersData } from './userData'
import { useEffect, useState } from 'react'
import UserCard from '../components/UserCard'
import apiUrl from '../util'
export default function Home() {
    const [usersData,setUsersData] = useState([])
    useEffect(()=>{
      fetch(`${apiUrl}/users`)
      .then((data)=>data.json())
      .then((data)=>{
        console.log("data",data.users)
        setUsersData(data.users)
      })
      .catch((err)=>console.log("err",err))
    },[])
    const users = usersData.map((user:User)=>{
      console.log("user", user)
     return <UserCard key={user._id} user={user}/>}
    )
    return (
      <>
      <h1 className="font-bold text-xl">All Users</h1>
      <div className='flex gap-10 pr-20 flex-wrap'>
      {users}
      </div>
      </>
    )
}
