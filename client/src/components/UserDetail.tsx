import { useParams, useSearchParams } from "react-router-dom"
import { usersData } from "../userData"
import { User } from "../types"

export default function UserDetail() {
  const params = useParams() 
  const id = params.id
  const user:User|undefined = usersData.find((user)=>user.id == id)

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
      <a className="underline text-blue-700" href={user.cv}>CV</a>
    </div>
    }
    </>
  )
}
