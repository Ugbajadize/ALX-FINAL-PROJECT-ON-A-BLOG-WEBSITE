import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home.jsx';
import Blogs from './pages/Blogs.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Services from './pages/Services.jsx';
import SingleBlog from './pages/SingleBlog.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/Blogs",
        element: <Blogs/>
      },
      {
        path: "/About",
        element: <About/> 
      },
      {
        path: "/Contact",
        element: <Contact/>
      },
      {
        path: "/Services",
        element: <Services/>
      },
      {
        path: "/blogs/:id",
        element: <SingleBlog/>,
        Loader: ({params}) => fetch(`http://localhost:5000/blogs/${params.id}`)
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>  
     <RouterProvider router={router} />
  </React.StrictMode>,
)
