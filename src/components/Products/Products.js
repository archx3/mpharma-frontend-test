import React, { Component } from 'react';
import axios                from 'axios'
// import EditProductForm      from "./EditProductForm";
import { connect }          from 'react-redux' // a fn that return a higher order component
import { setInitialState }  from "../../store/actions/actions";

import Product from "../Product/Product";

export class Products extends Component {
  state = {
    product           : {
      name  : '',  // we'll keep temporary product edit data here
      price : '0', // we'll keep temporary product edit data here,
    },
    name              : '', // we'll keep temporary product edit data here
    price             : '0', // we'll keep temporary product edit data here
    selectedProductId : -1,
    isEditing         : false,
    isAdding : false,
    loading           : false,
    loaded            : false,
    canRetry : false
  };

  // Catches exceptions generated in descendant components.
  // Unhandled exceptions will cause
  // the entire component tree to unmount.
  componentDidCatch (error, errorInfo) {}

  // Called immediately after a component is mounted.
  // Setting state here will trigger re-rendering
  componentDidMount () {
    // this is a good time to reach out to the 3rd Party api to get and get our initial data
    this.getProducts();

    window.addEventListener('keyup', (e) => {
      if (e.key.toLocaleLowerCase() === 'escape') {
        this.exitEditingMode();
      }
    })
  }

  /**
   * @sideeffects
   * @use get products list from the 3P API
   * @returns void
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
           this.setState({ loading : false, loaded : true, canRetry : true });
           console.log(err);
         });
  }

// Called immediately after updating occurs. Not called for the initial render.
  // The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null
  // componentDidUpdate (prevProps, prevState, snapshot) {}

  // Called immediately before a component is destroyed.
  // Perform any necessary cleanup in this method, such as
  // cancelled network requests, or cleaning up any DOM elements created in componentDidMount.
  // componentWillUnmount () {}

  /**
   * @use commits ui changes to the redux store
   * @param event {HTMLElementEventMap}
   * @param product {{name : String, price : String | Number}}
   */
  updateProduct (event, product) {
    let state = this.state;
    this.props.onSaveEditedProduct({ ...product, name : state.product.name, price : state.product.price });
    this.exitEditingMode();
  }

  /**
   * @use
   * @param event {HTMLElementEventMap}
   */
  nameChangedHandler (event) {
    let state = this.state;
    this.setState({
                    ...state, product : { ...state.product, name : event.target.value }
                  });

    // this.props.onSaveEditedProduct({...product, name : event.target.value})
  }

  /**
   *
   * @param event {Event}
   */
  priceChangedHandler (event) {
    // TODO make state changes reversible when the save button is not clicked but escape key pressed
    let state = this.state;
    this.setState({
                    ...state, product : { ...state.product, price : event.target.value }
                  });
    // this.props.onSaveEditedProduct({...product, price : event.target.value})
  }

  /**
   * @use Switches the UI state to the normal read state
   * @returns {void}
   */
  exitEditingMode () {
    this.setState({ product : { name : '', price : '' }, isEditing : false, selectedProductId : -1 });
  }

  /**
   * @use Switches to edit Mode
   * @param product {{id : Number, name : String, price : String | Number}}
   */
  setSelectedProductToEdit (product) {
    // let state = this.state;
    this.setState({ product : { name : product.name, price : product.price }, isEditing : true, selectedProductId : product.id });
    // console.log(state);
  }

  render () {
    let state = this.state;
    let props = this.props;

    // let's externalise the conditional rendering of the list of products
    // so the returned template is clean
    let ProductList = null;
    if (state.loading) { // busy state
      ProductList = <tr>
        <td colSpan="3" className="check text-center">Loading...</td>
      </tr>
    }
    if (state.loaded && !(props.products && props.products.length)) {
      ProductList = <tr>
        <td colSpan="3" className="check text-center">No products to display at the moment
          <button className={`${state.canRetry ? '' : 'disabled'} btn btn-primary ml-3`}
          onClick={() => {
            state.canRetry = true;
            this.getProducts.bind(this)
          }}>Retry</button> </td>
      </tr>
    }
    if (props.products && props.products.length) {
      ProductList = props.products
                         .map((product, i) => {
                           // dynamic className binding
                           const disableDelete = state.isEditing && state.selectedProductId === product.id ? 'disabled' : '';
                           const disableEdit = state.isEditing && state.selectedProductId === product.id ? 'disabled' : '';
                           const productToEditPayload = {
                             id    : product.id,
                             name  : product.name,
                             price : product.prices.prices[0].price
                           };
                           return <Product key={i}
                                           state={state}
                                           product={product}
                                           editing={this.state.isEditing}
                                           disableEdit={disableEdit}
                                           disableDelete={disableDelete}
                                           onChange={(event) => { this.nameChangedHandler(event, product) }}
                                           onChange1={(event) => { this.priceChangedHandler(event, product) }}
                                           onClick={(event) => {this.updateProduct(event, product) }}
                                           onDoubleClick={() => {
                                             this.setSelectedProductToEdit(productToEditPayload)}}
                                           onClick1={() => {

                                             this.setSelectedProductToEdit(productToEditPayload)}}
                                           onClick2={() => { this.props.onDeleteProduct(product.id) }}/>
                         })
    }

    return (
      <div className="Products">
        <table className="table">
          <thead>
            <tr>
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
  return {
    products : state.products.map((product) => {
      let prices = state.prices.filter(priceSet => {
        return priceSet.id === product.id;
      });
      // console.log(dt);

      return { id : product.id,
        name : product.name,
        ...(prices && {prices : prices[0]})
      };
    })
  }
};

// actions
const mapDispatchToProps = dispatch => {
  return {
    onDeleteProduct     : (id) => dispatch({
                                             type    : 'REMOVE_PRODUCT',
                                             payload : { index : id }
                                           }),
    onSaveEditedProduct : (product) => dispatch({
                                                  type    : 'EDIT_PRODUCT',
                                                  payload : { product }
                                                }),
    setInitialState     : (products) => dispatch(setInitialState({ products }))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
