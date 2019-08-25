import React, { Component } from 'react';
import { connect }          from 'react-redux' // a fn that return a higher order component

class AddProductForm extends Component {
  state = {
    name : '',
    // the prices data shape will look like:
    /** @type {{
     id : Number <index + 1>,
     name : String <*>,
     date : Date <Date.now()>}} */
    price      : '0',
    busy        : false, // a boolean that tells us whether something is happening
    error       : false
  };

  // can't trust user input
  // Let's make sure users type in the right stuff
  validateInput () {
    let state = this.state;
    let tempState = Object.assign({}, state);

    tempState.name = tempState.name.trim();
    tempState.price = tempState.price.trim();

    // we may need to make some other checks on the price can't use an ANDed if, ;(
    if (tempState.name) {
      console.log(typeof parseFloat(tempState.price), parseInt(tempState.price, 10));
      // FIXME find workaround for parseFloat converting text 0
      if (typeof parseInt(tempState.price) === 'number'){
        // we're good to go let's save the data
        this.saveProduct();
      }
    }
    // let's pay back the memory we borrowed
    tempState = null
  }

  // Add the data in the component state the one in the app state
  saveProduct () {
    let state = this.state;
    this.props.onAddProduct({name : state.name, price : parseFloat(state.price)})
  }

  nameChangedHandler (event) {
    let state = this.state;
    this.setState({
                    ...state, name : event.target.value
                  });
  }

  priceChangedHandler (event) {
    let state = this.state;
    this.setState({
      ...state, price : event.target.value
                  })
  }

  render () {
    return <form>
      <div className="form-group">
        <label className="text-left col-12 p-0 font-weight-bold" htmlFor="p-name">Product Name</label>
        <input type="email" className="form-control" id="p-name" aria-describedby="emailHelp"
               placeholder="E.g (Exforge 10mg)"
               onChange={ this.nameChangedHandler.bind(this) }/>
        <small id="emailHelp" className="form-text text-muted small">Type the name and the grammes.</small>
      </div>
      <div className="form-group">
        <label className="text-left col-12 p-0 font-weight-bold" htmlFor="p-price">Price</label>
        <input type="number" className="form-control" id="p-price" placeholder="0.00"
        onChange={ this.priceChangedHandler.bind(this) }/>
      </div>
      <button type="button" className="btn btn-primary col-12"
              onClick={ () => { this.validateInput(); } }>Submit
      </button>
    </form>;
  }
}

// actions
const mapDispatchToProps = dispatch => {
  return {
    onAddProduct : (product) => dispatch({
                                    type    : 'ADD_PRODUCT',
                                    payload : {
                                      product : product
                                    }
                                  })
  }
};

export default connect(null, mapDispatchToProps)(AddProductForm);
