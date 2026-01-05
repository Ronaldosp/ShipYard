import { useState , useEffect } from "react";
import "../styling/Services.scss";

export default function Services(){
    return(
        <div className="service-component">
             <div className="service-component-title">
                <h1>Services</h1>
            </div>
            <div className="service-container">
                <div className="service-wrapper">
                    <div className="service-container-thumbnail">
                        <img src="https://cdn.discordapp.com/attachments/1041599632066748508/1457639524057219195/download.jpg?ex=695cbc18&is=695b6a98&hm=a8ad0628e0f66ffb2c27e7138e07a80b65f860ed0c07eb97df436cb3307f3f8a&" alt="Image"/>
                    </div>
                    <div className="service-container-content">
                        <div className="service-title">
                            <h2>Konsultasi</h2>
                        </div>
                        <div className="service-description">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
                        </div>
                    </div>
                </div>

                <div className="service-wrapper">
                    <div className="service-container-thumbnail">
                        <img src="https://cdn.discordapp.com/attachments/1041599632066748508/1457639524770517012/Alat-Komunikasi-Kapal.jpg?ex=695cbc18&is=695b6a98&hm=9c359edbb7b91423a9386ac0bc706aed6fb8cd24f820148c57f0b86527c1c4ce&" alt="Image"/>
                    </div>
                    <div className="service-container-content">
                        <div className="service-title">
                            <h2>Instalasi & Maintenence System</h2>
                        </div>
                        <div className="service-description">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}