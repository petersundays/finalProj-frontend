import React from "react";
import "./ProjCardNotLogged.css";

const ProjCardNotLogged = ({ title, subtitle, description, link }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">{title}</h4>
        <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>
        <p className="card-text">{description}</p>
        <a href={link} className="btn btn-primary">
          More info...
        </a>
      </div>
    </div>
  );
};

export default ProjCardNotLogged;
