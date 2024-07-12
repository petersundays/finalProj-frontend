import React from "react";
import "./OthersBannerLogin.css";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

function OthersBannerLogin() {
  const { t } = useTranslation();
  
  return (
<div 
    className="banner py-5 text-center" 
    style={{
        maxWidth: '45rem', 
        '@media (maxWidth: 992px)': {
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
