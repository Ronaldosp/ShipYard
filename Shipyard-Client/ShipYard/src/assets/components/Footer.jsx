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
                <p>@ 220210081 Ronaldo Surya Putra. 220210010 Gabriel Oscario Konstantin . Powered and secured by SHELLFISH</p>
            </div>
        </div>
    )
}