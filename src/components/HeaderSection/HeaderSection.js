import React, { Component } from 'react';
import logo                 from "../../assets/images/mutti-card-white.svg";
import AddProductForm       from "../AddProductForm";

export class HeaderSection extends Component {
  state = {
    showAddForm : false
  };

  toggleShowAddForm () {
    let state = this.state;
    this.setState({showAddForm : !state.showAddForm})
  }

  render () {
    return (
      <header className="App-header">
        <nav className="navbar navbar-expand-lg bg-inverse fixed-top scrolling-navbar">
          <div className="container">
            <a href="/" className="navbar-brand primary-color position-relative">
              <div className="d-inline-block" style={{ backgroundImage : `url(${logo})` }} aria-roledescription="logo"/>
              <span className="font-weight-bolder position-absolute"
                    style={{top: '50%', transform: 'translateY(-50%)'}}>mPharma</span>
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
                <li className="nav-item pt-3 pb-2">
                  <button
                     onClick={this.toggleShowAddForm.bind(this)}
                     className="nav-link btn btn-primary p pl-3 pr-3">Add Product</button>

                  {this.state.showAddForm ?
                   <div className="add-product">
                     <AddProductForm/>
                   </div> : null}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default HeaderSection;
