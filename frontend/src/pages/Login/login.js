import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import {setToken} from '../../components/Auth'
import pass_icon from "../../components/images/password.png"
import email_icon from "../../components/images/email.png"
import './login.css'
import Auth from '../auth0'
 
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [error, setError] = useState('')
    const navigate = useNavigate()
     
    const login = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/login", {
          email: email,
          password: password,
        })
        .then(res => {
            console.log(res);
            if(res.data.Status === 'Success') {
        console.log(res.data.Token);
        setToken(res.data.Token)
                navigate('/');
            } else {
                setError(res.data.Error);
            }
        })
        .catch(err => console.log(err));
    }
    
  return (
              <div className="container">
                <div className="header">
                  <div className="text3">Login</div>
                    <h1>{error && error}</h1>
                  <div className="inputs">
                    <div className="input">
                       <img src={email_icon} alt=""/>
                          <input
                            type="email"
                            placeholder="Enter a valid email address"
                            onChange={(e) => {setEmail(e.target.value)}}
                          />
                    </div>
                    <div className="input">
                      <img src={pass_icon} alt="password"/>
                        <input
                          type="password"
                          placeholder="Enter password"
                          onChange={(e) => {setPassword(e.target.value)}}
                        />
                    </div>
    
                    <div className="">
                        <input type="checkbox" value=""/>
                        <label>
                          Remember me
                        </label>
                    </div>
                      <a href="/#" className="forgot-password"><span>Forgot password?</span></a>
      
                    <div className="submit-container">
                    <button type="button" id="login" onClick={login}>Login</button><br/>
                      <span className="or">or</span><br/>                     
                      <Auth/>
                      <p className="submit"> Not registered yet?  <a href="signup" className="link-danger">Sign Up</a></p>
                    </div>
                  </div>
               </div>
              </div>
  );
};
   
export default Login;