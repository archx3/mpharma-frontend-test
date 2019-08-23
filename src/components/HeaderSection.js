import React from 'react';
import logo  from "../logo.svg";

const HeaderSection = () => {
  return (
    <header className="App-header">
      <nav className="navbar navbar-expand-lg bg-inverse fixed-top scrolling-navbar">
        <div className="container">
          <a href="/" className="navbar-brand">
            <div style={{ backgroundImage : `url(${logo})` }} aria-roledescription="logo"/>
          </a>

          <div className="navbar-toggler" role="button"
               data-toggle="collapse" data-target="#navbarCollapse"
               aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <div className="layer"/>
            <div className="layer"/>
            <div className="layer"/>
          </div>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto w-100 justify-content-end">
              <li className="nav-item pb-2">
                <a className="nav-link btn btn-primary p pl-3 pr-3" href="#">Add Product</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default HeaderSection;
