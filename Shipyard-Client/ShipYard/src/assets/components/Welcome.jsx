import { useState , useEffect } from "react";
import "../styling/Welcome.scss";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
    const navigate = useNavigate()
    return (
        <div className="welcome-container">
            <div className="welcome-title">
                <h2>Selamat Mencari</h2>
            </div>
            <div className="welcome-description">
                <p>Lorem Ipsum is simply dummy text of th Lorem Ipsum</p>
            </div>
        </div>
    )
}
