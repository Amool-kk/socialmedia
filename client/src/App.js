import React, { useCallback, useEffect, useState } from 'react'
import Home from './Home';
import Login from './login'
import Profile from './components/profile/profile';
import './app.css'
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate()


  const loginState = useCallback(async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      })

      const result = await res.json();
      // console.log(result, res, res.status);
      if (res.status === 200) {
        setLogin(true)
        localStorage.setItem('username',result.message)
        // navigate('/')
      } else {
        setLogin(false)
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }, [navigate])


  useEffect(() => {
    loginState()
  }, [loginState])



  return (
    <>
      <Routes>
        {login ? (
          <>
            <Route path='/' element={<Home />} />
            <Route path='/profile:username' element={<Profile />} />
          </>
        ) : (
          <Route path='/login' element={<Login />} />
        )}
      </Routes>

    </>
  );
}

export default App;
