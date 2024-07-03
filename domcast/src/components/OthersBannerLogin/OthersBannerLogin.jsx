import React from "react";
import "./OthersBannerLogin.css";

function OthersBannerLogin() {
  return (
<div 
    className="banner py-5 text-center" 
    style={{
        maxWidth: '45rem', 
        '@media (max-width: 992px)': {
            width: '80%'
        },
    }}
>
    <h2 style={{ color: "var(--color-yellow-02)"}}>Welcome to your creative playground!</h2>
    <h4 style={{ color: "var(--color-blue-03)"}}>Your ideas... Endless possibilities!</h4>
</div>
  );
}

export default OthersBannerLogin;
