import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import AppLayout from './components/layouts/AppLayout.tsx'
import UserDetail from './components/UserDetail.tsx'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<AppLayout/>} >
    <Route index element={<App/>} />
    <Route path=':id' element={<UserDetail/>} />
  </Route>
))
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
