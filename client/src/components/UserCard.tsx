import { Link } from "react-router-dom";
import { User } from "../types";

interface CardProps{
    user:User
}
export default function UserCard({user}:Readonly<CardProps>) {
  return (
    <div className=" border justify-between p-5 rounded-md shadow-md flex gap-5">
        <Link to={user._id.toString()} className='w-full'>
        <p>Name: <span>{user.name}</span></p>
        <p>Email: <span>{user.email}</span></p> 
        </Link>   
      </div>
  )
}
