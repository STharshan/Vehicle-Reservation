import { useState } from "react";
import Axios from "axios";
import './signup.css';

import person_icon from '../../components/images/person.png';
import email_icon from '../../components/images/email.png';
import password_icon from '../../components/images/password.png';
import phone_icon from '../../components/images/phone.png';
import country_icon from '../../components/images/country.png'


const SignUp = () => {
    
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [country, setCountry] = useState("");
    const [phone, setPhone] = useState("");
    const [registerStatus, setRegisterStatus] = useState("");
 
    const register = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3001/register", {
          name: name,
          country: country,
          phone: phone,
          email: email,
          password: password,
         
        }).then((response) => {
          console.log(response);
          if(response.data.message){
            setRegisterStatus(response.data.message);
          }else{
            setRegisterStatus("ACCOUNT CREATED SUCCESSFULLY");
          }
        })
        .catch(err => console.log(err));
    }
 
  return ( 
              <div className="container">
                <div className="header">
                  <div className="text1">
                    <p>Create Your Account</p>
                  </div>
                  <h1>{registerStatus}</h1>
                  <div className="inputs"> 
                      <div className="input">
                        <img src={person_icon} alt="person"/>
                        <input
                            type="text"
                            onChange={(e) => {setName(e.target.value)}} placeholder="Enter your Name" required
                        />
                      </div>
                      <div className="input">
                        <img src={country_icon} alt="country"/>
                        <input
                            type="text"
                            onChange={(e) => {setCountry(e.target.value)}} placeholder="Enter your Country" required
                        />
                      </div>
                      <div className="input">
                        <img src={phone_icon} alt="phone"/>
                        <input
                            type="number"
                            onChange={(e) => {setPhone(e.target.value)}} placeholder="Enter your Number" required
                        />
                      </div>
                      <div className="input">
                        <img src={email_icon} alt="email"/>
                        <input
                          type="email"
                          onChange={(e) => {setEmail(e.target.value)}} placeholder="Enter your Email Address" required
                        />
                      </div>
                      <div className="input">
                        <img src={password_icon} alt="password"/>
                        <input
                          type="password"
                          onChange={(e) => {setPassword(e.target.value)}} placeholder="Enter your Password" required
                        />
                      </div>
                        <div className="form-check mb-0">
                          <input type="checkbox" value=""/>
                          <label className="form-check-label">Remember me</label>
                        </div>
                      <div className="submit-container">
                        <button type="button" id="signup" onClick={register}>Sign Up</button>
                        <p>Login to your account <a href="login" className="link">Login</a></p>
                      </div>
                  </div>
                </div>
              </div>
  );
};
   
export default SignUp;