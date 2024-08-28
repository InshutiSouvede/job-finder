import { Link } from 'react-router-dom'
import { User } from './types'
import { usersData } from './userData'


export default function App() {
  const users = usersData.map((user:User)=>(
    <div key={user.id} className=" border justify-between p-5 rounded-md shadow-md flex gap-5">
      <Link to={user.id.toString()} className='w-full'>
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