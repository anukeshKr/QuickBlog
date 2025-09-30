import React from "react"
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Blog from "./Pages/Blog";
import Layout from "./Pages/Admin/Layout";
import Dashboard from "./Pages/Admin/Dashboard";
import Addblog from "./Pages/Admin/Addblog";
import Listblog from "./Pages/Admin/Listblog";
import Comments from "./Pages/Admin/Comments";
import Login from "./components/Admin/Login";
import 'quill/dist/quill.snow.css'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from "./context/Appcontext";

const App = ()=>{

  const {token} = useAppContext()
  return(
    <div>
      <Toaster/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/blog/:id" element={<Blog/>}/>
        <Route path="/admin" element={token?<Layout/>:<Login/>}>
          <Route index element={<Dashboard/>}/>
          <Route path="addblog" element={<Addblog/>}/>
          <Route path="listblog" element={<Listblog/>}/>
          <Route path="comments" element={<Comments/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App;