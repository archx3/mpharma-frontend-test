import React from 'react';
import logo  from "../logo.svg";

const HeaderSection = (props) =>
{
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo"/>
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
    </header>
  );
};

export default HeaderSection;
