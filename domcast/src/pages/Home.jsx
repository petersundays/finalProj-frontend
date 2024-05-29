import React from "react";
import NavbarNotLogged from "../components/Navbar-Not-Logged/NavbarNotLogged";
import NavbarLogged from "../components/Navbar-Logged/NavbarLogged";
import NavbarAdmin from "../components/Navbar-Admin/NavbarAdmin";



function Home() {
    return (
        <div className="home" id="home-outer-container">
            <div className="page-wrap" id="home-page-wrap">
                <div className="header">
                    <NavbarNotLogged />
                </div>
                <div className="body">
                    <NavbarLogged />
                </div>
                <div className="footer">
                    <NavbarAdmin />
                </div>
            </div>        
        </div>
    );
}

export default Home;