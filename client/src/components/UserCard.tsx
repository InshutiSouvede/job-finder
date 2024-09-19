import { Link } from "react-router-dom";
import { User } from "../types";
import apiUrl from "../util";

interface CardProps{
    user:User
}
export default function UserCard({user}:Readonly<CardProps>) {
  return (
        <Link key={user._id} to={user._id.toString()} className='text-xl rounded-md shadow-md items-center p-5 w-1/2 grid grid-cols-2 bg-red-100 gap-5 min-w-[500px] max-w-xl'>
        <img src={`${apiUrl}/${user.profilePicture}`} alt="Avatar" className="rounded-md" />
        <div className="flex flex-col gap-5">
        <p>Name: <span>{user.name}</span></p>
        <p>Email: <span>{user.email}</span></p> 
        </div>
        </Link>
  )
}
