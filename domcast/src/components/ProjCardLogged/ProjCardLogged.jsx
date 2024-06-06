import React from "react";
import "./ProjCardLogged.css";

const ProjCardLogged = ({ title, subtitle, description, link }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">{title}</h4>
        <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>
        <p className="card-text">{description}</p>
        <div className="row justify-content-evenly">
          <div className="col">
            <h6 className="h6">Members</h6>
          </div>
          <div className="col">
            <h6 className="h6">State</h6>
          </div>
        </div>
        <a href={link} className="btn btn-primary">
          More info...
        </a>
      </div>
    </div>
  );
};

export default ProjCardLogged;
