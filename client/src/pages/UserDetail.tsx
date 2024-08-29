import { useNavigate, useParams } from "react-router-dom";
import { User } from "../types";
import { useEffect, useState } from "react";

export default function UserDetail() {
    const [deleteUser,setDeleteUser] = useState(false)
  const params = useParams();
  const id: string = params.id ?? "1";
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate()
  // const user:User|undefined = usersData.find((user:User)=>user.id == Number(id))
  useEffect(() => {
    fetch(`http://localhost:4500/users/${id}`)
      .then((response) => response.json())
      .then((data) => setUser(data.user))
      .catch((error) => console.log(error));
  }, [id]);
  useEffect(()=>{
    console.log("Id changed to",id)
    if(deleteUser){
        fetch(`http://localhost:4500/users/${id}`,{method:'DELETE'})
    .then((data)=>data.json())
    .then((data)=>{
      console.log("res",data.data)
      navigate('/',{replace:true})
    })
    .catch((err)=>console.log("err",err))
    }
    
  },[deleteUser])
  const handleDelete = (id:string)=>{
    console.log("The id of clicked user is",id)
    setDeleteUser(true)
  }
  return (
    <>
      <h1>User Details</h1>
      {user && (
        <div className=" border justify-between p-5 rounded-md shadow-md flex flex-col gap-5">
          <img src={user.profilePicture} alt={user.profilePicture} />
          <p>
            Name: <span>{user.name}</span>
          </p>
          <p>
            Email: <span>{user.age}</span>
          </p>
          <p>
            Email: <span>{user.email}</span>
          </p>
          <a className="underline text-blue-700" href={user.cv} target="_blank">
            CV
          </a>
          <div className="flex gap-5">
            <button className="px-5  rounded-md bg-teal-700 text-white">
              Update
            </button>
            <button
              onClick={() => handleDelete(user._id)}
              className="px-5  rounded-md bg-red-500 text-white"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
}
