import React from 'react'
import './css/loginsignup.css'
 const LoginSignup = () => {
  return (
    <div className='login-signup'>
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsignup-fields">
          <input type="text" placeholder="Username" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          
        </div>
        <button type="submit">Sign Up</button>
           <p className="loginsignup-login">Already have an account?<span>Login here</span></p>
           <div className="loginsignup-agree">
            <input type="checkbox" id="" name="" />
              <p>I agree to the terms and conditions</p> 
           </div>
      </div>

    </div>
  )
}

export default LoginSignup;

