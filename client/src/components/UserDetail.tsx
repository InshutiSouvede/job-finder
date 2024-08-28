import { useParams } from "react-router-dom"
import { User } from "../types"
import { useEffect, useState } from "react"

export default function UserDetail() {
  const params = useParams() 
  const id:string = params.id||"1"
  const [user,setUser] = useState<User|null>(null)
  // const user:User|undefined = usersData.find((user:User)=>user.id == Number(id))
  useEffect(()=>{
    fetch(`http://localhost:4500/users/${id}`)
    .then((response)=>response.json())
    .then((data)=>setUser(data.user))
    .catch((error)=>console.log(error))
  },[id])
  return (
    <>
    <h1>User Details</h1>
    {
      user &&
    <div className=" border justify-between p-5 rounded-md shadow-md flex flex-col gap-5">
      <img src={user.profilePicture} alt={user.profilePicture} />
      <p>Name: <span>{user.name}</span></p>
      <p>Email: <span>{user.age}</span></p>    
      <p>Email: <span>{user.email}</span></p>
      <a className="underline text-blue-700" href={user.cv} target="_blank">CV</a>
    </div>
    }
    </>
  )
}
