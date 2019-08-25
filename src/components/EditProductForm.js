import React, { Component } from 'react';

class EditProductForm extends Component {
  render () {
    return <form>
      <div className="form-group">
        <label className="text-left col-12 p-0 font-weight-bold" htmlFor="p-name">Product Name</label>
        <input type="email" className="form-control" id="p-name" aria-describedby="emailHelp"
               placeholder="E.g (Exforge 10mg)"/>
        <small id="emailHelp" className="form-text text-muted text-sm-left">Type the name and the grammes.</small>
      </div>
      <div className="form-group">
        <label className="text-left col-12 p-0 font-weight-bold" htmlFor="p-price">Price</label>
        <input type="number" className="form-control" id="p-price" placeholder="0.00"/>
      </div>
      <button type="submit" className="btn btn-primary col-12">Submit</button>
    </form>;
  }
}


export default EditProductForm;
