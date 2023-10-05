import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./page/Home";
import Profile from "./page/Profile";
import Login from "./page/Login";
import Register from "./page/Register";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context, server } from "./main";


function App() {

  const { setuser, setIsAuthenticated, setloading } = useContext(Context)

  useEffect(()=>{

    setloading(true);

    axios.get(`${server}/users/me`, {
      withCredentials: true,
    }).then(res =>{
      setuser(res.data.user);
      setIsAuthenticated(true);
      setloading(false);

    }).catch((error)=>{
     setuser({});
     setIsAuthenticated(false);
     setloading(false);
    })

  }, [])

  return <Router>
      <Header/>
    <Routes>
      
      <Route path="/" element ={<Home/>} />
      <Route path="/profile" element ={<Profile/>}/>
      <Route path="/login" element ={<Login/>}/>
      <Route path="/register" element ={<Register/>} />

    </Routes>
   <Toaster />
  </Router>;

}

export default App;
