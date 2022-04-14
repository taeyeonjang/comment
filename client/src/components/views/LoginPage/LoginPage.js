import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from  '../../../actions/user_action';
import { useNavigate } from 'react-router-dom';
import Auth from '../../../hoc/auth';
import { useSelector } from 'react-redux';

function LoginPage() {

  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(rememberMeChecked)

  let navigate = useNavigate();


  const onEmail=(e)=>{
    
    setEmail(e.currentTarget.value)

  }

  const onPassword=(e)=>{
    
    setPassword(e.currentTarget.value)

  }

  const onSubmit=(e)=>{
    
    e.preventDefault();

  let body={
    email: Email,
    password: Password
  }
//dispatch에 login user는 user action.js 에 함수명이네
  dispatch(loginUser(body))
  .then(response => {
    if (response.payload.loginSuccess) {
      window.localStorage.setItem('userId', response.payload.userId);
      if (rememberMe === true) {
        window.localStorage.setItem('rememberMe', e.id);
      } else {
        localStorage.removeItem('rememberMe');
      }
      navigate("/")
      alert(`환영합니다 ㅎ`)
    } else {
      alert('Check out your Account or Password again')
    }
  })
  }
  return(
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center'
      , width: '100%', height :'100vh'
    }}>
      <form style={{ display:'flex', flexDirection: 'column'}}
        onSubmit={onSubmit}>
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmail} />
        <label>Password</label>
        <input style={{border:'1px solid gray', borderRadius:'2px'}}type="password" vlaue={Password} onChange={onPassword} />

        <br/>
        <button type="submit">
          Login
        </button>
      </form>
    </div>

  )

}

export default Auth(LoginPage, false);
