import { useState , useEffect } from "react";
import "../styling/Footer.scss";
import facebookLogo from "../images/Facebook-Logo.png";
import instagramLogo from "../images/Instagram-Logo.png";
import whatsappLogo from "../images/WhatsApp-Logo.png";

export default function Footer(){
    return(
        <div className="footer-container">
            <div className="footer-logo-container">
                <div className="footer-logo-asset">
                    <a href=""><img src={facebookLogo}/></a>
                </div>
                <div className="footer-logo-asset">
                    <a href=""><img src={instagramLogo}/></a>
                </div>
                <div className="footer-logo-asset">
                    <a href=""><img src={whatsappLogo}/></a>
                </div>
            </div>
            <div className="footer-text">
                <p>© 2035 by Ronaldo Surya Putra. Powered and secured by ron</p>
            </div>
        </div>
    )
}