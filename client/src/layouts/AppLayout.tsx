import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <>
    <h1 className="font-bold text-3xl p-5 bg-red-950 text-white">Navbar placeholder</h1>
    <Outlet/>
    </>
  )
}
