import React, { Component } from 'react';
import axios                from 'axios'
// import EditProductForm      from "./EditProductForm";
import { connect }          from 'react-redux' // a fn that return a higher order component
import {setInitialState}    from "../../store/actions/actions";

import Product from "../Product";

class Products extends Component {
  state = {
    products          : null,
    product          : {
      name              : '',  // we'll keep temporary product edit data here
      price             : '0', // we'll keep temporary product edit data here},
    },
    name              : '', // we'll keep temporary product edit data here
    price             : '0', // we'll keep temporary product edit data here
    selectedProductId : -1,
    isEditing         : false,
    loading           : false,
    loaded : false
  };

  // Catches exceptions generated in descendant components.
  // Unhandled exceptions will cause
  // the entire component tree to unmount.
  componentDidCatch (error, errorInfo) {}

  // Called immediately after a component is mounted.
  // Setting state here will trigger re-rendering
  componentDidMount () {
    let state = this.state;
    // this is a good time to reach out to the 3rd Party api to get and get our initial data

    this.getProducts();

    window.addEventListener('keyup', (e) => {
      if (e.key.toLocaleLowerCase() === 'escape') {
        this.exitEditingMode();
      }
    })
  }

  /**
   @use get products list from the 3P API
   */
  getProducts () {
    this.setState({ loading : true });

    // TODO set a timeout for the network request
    axios.get('http://www.mocky.io/v2/5c3e15e63500006e003e9795')
         .then((response) => {
           // loaded
           this.setState({ loading : false, loaded : true });
           return response.data.products
         })
         .then((products) => {
           console.log(products);

           // time to update our state cos it's helping us keep track of changes
           // this.setState({ products : products });

           // get our new data into the redux store
           this.props.setInitialState(products)
         })
         .catch((err) => {
           this.setState({ loading : false, loaded : true });
           console.log(err);
         });
  }

// Called immediately after updating occurs. Not called for the initial render.
  // The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null
  componentDidUpdate (prevProps, prevState, snapshot) {}

  // Called immediately before a component is destroyed.
  // Perform any necessary cleanup in this method, such as
  // cancelled network requests, or cleaning up any DOM elements created in componentDidMount.
  componentWillUnmount () {}

  addProduct () {

  }

  updateProduct (event, product) {
    let state = this.state;
    this.props.onSaveEditedProduct({...product, name : state.product.name, price : state.product.price});
    this.exitEditingMode();
  }

  nameChangedHandler (event, product) {
    let state = this.state;
     this.setState({
                    ...state, product : {name : event.target.value}
                  });

    // this.props.onSaveEditedProduct({...product, name : event.target.value})
  }

  priceChangedHandler (event, product) {
    // TODO make state changes reversible when the save button is not clicked but escape key pressed
    let state = this.state;
    this.setState({
                    ...state, product : {price : event.target.value}
                  });
    // this.props.onSaveEditedProduct({...product, price : event.target.value})
  }

  exitEditingMode () {
    this.setState({ product : {name : '', price : ''}, isEditing : false, selectedProductId : -1 });
  }

  // Switches to edit Mode
  setSelectedProductToEdit (product) {
    // let state = this.state;
    this.setState({ product : {name : product.name, price : product.price}, isEditing : true, selectedProductId : product.id });
    // console.log(state);
  }

  render () {
    let state = this.state;
    let props = this.props;

    // let's externalise the conditional rendering of the list of products
    // so the returned template is clean
    let ProductList = null;
    if(state.loading) { // busy state
      ProductList = <tr>
        <td colSpan="4" className="check text-center">Loading...</td>
      </tr>
    }
    if(state.loaded && !(props.products && props.products.length)) {
      ProductList = <tr>
        <td colSpan="4" className="check text-center">No products to display at the moment</td>
      </tr>
    }
    if (props.products && props.products.length) {
      ProductList = props.products
                         .map((product, i) => {
                           // dynamic className binding
                           const disableDelete = state.isEditing && state.selectedProductId === product.id ? 'disabled' : '';
                           const disableEdit = state.isEditing && state.selectedProductId === product.id ? 'disabled' : '';

                           return <Product key={i} state={state} product={product}
                                           onChange={(event) => { this.nameChangedHandler(event, product) }} onDoubleClick={() => {
                             this.setSelectedProductToEdit({
                                                             id    : product.id,
                                                             name  : product.name,
                                                             price : product.prices[0].price
                                                           })
                           }} editing={this.state.isEditing} onChange1={(event) => { this.priceChangedHandler(event, product) }}
                                           onClick={(event) => {this.updateProduct(event, product) }} disableEdit={disableEdit}
                                           onClick1={() => {
                                             this.setSelectedProductToEdit({
                                                                             id    : product.id,
                                                                             name  : product.name,
                                                                             price : product.prices[0].price
                                                                           })
                                           }} disableDelete={disableDelete}
                                           onClick2={() => { this.props.onDeleteProduct(product.id) }}/>
                         })
    }

    return (
      <div className="Products">
        <table className="table">
          <thead>
            <tr>
              <th className="check"><input type="checkbox"/></th>
              <th>Product</th>
              <th>Price</th>
              <th>{state.isEditing ? <span className="small">You can Use Escape To Exit Edit Mode</span> : null}</th>
            </tr>
          </thead>
          <tbody>{ProductList}</tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    products : state.products
  }
};

// actions
const mapDispatchToProps = dispatch => {
  return {
    onDeleteProduct     : (id) => dispatch({
                                             type    : 'REMOVE_PRODUCT',
                                             payload : {
                                               index : id
                                             }
                                           }),
    onSaveEditedProduct : (product) => dispatch({
                                             type    : 'EDIT_PRODUCT',
                                             payload : { product }
                                           }),
    setInitialState     : (products) => dispatch(setInitialState({products}))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
