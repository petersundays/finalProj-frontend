import React from "react";
import NavbarNotLogged from "../components/Navbar-Not-Logged/NavbarNotLogged";
import NavbarAdmin from "../components/Navbar-Admin/NavbarAdmin";
import "./Home.css";



function Home() {
    return (
        <div className="home" id="home-outer-container">
            <div className="page-wrap" id="home-page-wrap">
                <div className="header">
                    <NavbarAdmin />
                </div>
            </div>        
        </div>
    );
}

export default Home;