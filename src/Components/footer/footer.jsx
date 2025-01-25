import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css'
import footer_logo from '../assets/logo_big.png'
import instagram_icon from '../assets/instagram_icon.png'
import github_icon from '../assets/github.png'
import linkedin_icon from '../assets/linkedin.png'
import connection_icon from '../assets/portefeuille.png'
 const Footer = () => {
  return (
    <div className='footer'>
       <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>BTK-SHOP</p>
       </div>
       <ul className="footer-links">
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
       </ul>
       <div className="footer-social-icon">

             <div className="footer-icons-container">
             <Link to={'https://www.instagram.com/mohamed_betkaoui/'}><img src={instagram_icon} alt="" /></Link> 
             </div>

             <div className="footer-icons-container">
                <Link to={'https://github.com/MohammedBetkaoui'}><img src={github_icon} alt="" /></Link>
             </div>

             <div className="footer-icons-container">
                <Link to={'https://www.linkedin.com/in/mohammed-betkaoui-b005342a5/'}><img src={linkedin_icon} alt="" /></Link>
             </div>
             <div className="footer-icons-container">
                <Link to={'https://betkaoui.netlify.app/'}><img src={connection_icon} alt="" /></Link>
             </div>

       </div>
       <div className="footer-copyright">
        <p>&copy; 2025 BTK-SHOP. All rights reserved.</p>
       </div>
    </div>
  )
}

export default Footer;
