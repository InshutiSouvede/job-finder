import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import AppLayout from './layouts/AppLayout.tsx'
import UserDetail from './pages/UserDetail.tsx'
import NewUser from './pages/NewUser.tsx'
import UpdateUser from './pages/UpdateUser.tsx'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<AppLayout/>} >
    <Route index element={<App/>} />
    <Route path=':id' element={<UserDetail/>} />
    <Route path='create-user' element={<NewUser/>}/>
    <Route path='edit-user/:id' element={<UpdateUser/>}/>
  </Route>
))
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
