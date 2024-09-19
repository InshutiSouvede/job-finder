import { Link } from "react-router-dom";
import { User } from "../types";

interface CardProps{
    user:User
}
export default function UserCard({user}:Readonly<CardProps>) {
  return (
        <Link key={user._id} to={user._id.toString()} className='m-auto text-xl rounded-md shadow-md items-center p-5 w-1/2 grid grid-cols-2 bg-red-400 gap-5 min-w-[500px] max-w-xl'>
        <img src={`http://localhost:4500${user.profilePicture}`} alt="" className="" />
        <div>
        <p>Name: <span>{user.name}</span></p>
        <p>Email: <span>{user.email}</span></p> 
        </div>
        </Link>
  )
}
