import "./style.scss"
import axios from "axios";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Single from './pages/Single';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Write from "./pages/Write";

fetch('/api/some/resource')
  .then(resp => resp.json())
  .then(data => console.log(data));
function App() {

  // axios.defaults.withCredentials = true;
  // axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout/>
      ),
      children:[
        {
          path: "/",
          element:(<Home/>)
        },
        {
          path: "/post/:id",
          element:(<Single/>)
        },
        {
          path: "/write",
          element:(<Write/>)
        }
      ]
    },
    {
      path: "/register",
      element: <Register/>,
    },
    {
      path: "/login",
      element: <Login/>,
    }
  ]);

  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router}/>
      </div>
    </div>
  )
}

const Layout = () => {
  return( 
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App
