import React, { Component } from 'react';
import axios                from 'axios'

class Products extends Component {
  state = {
    products : []
  };

  // Catches exceptions generated in descendant components.
  // Unhandled exceptions will cause
  // the entire component tree to unmount.
  componentDidCatch (error, errorInfo) {}

  // Called immediately after a component is mounted.
  // Setting state here will trigger re-rendering
  componentDidMount () {
    // this is a good time to reach out the the 3rd Party api to get and get our initial data
    axios.get('http://www.mocky.io/v2/5c3e15e63500006e003e9795')
         .then((response) => response.data.products)
         .then((products) => {
           // time to update our state
           // TODO OUTsource managing the list to redux
           this.setState({ products : products });
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

  updateProduct () {

  }

  deleteProduct () {

  }
  render (props) {
    let state = this.state;

    // let's eternalise the conditional rendering of the list of products
    // so the returned template is clean
    let ProductList = null;
    if (state.products.length) {
      ProductList = state.products
                         .map((product, i) => {
                           return <tr key={i}>
                             <td className="check"><input type="checkbox"/></td>
                             <td>{product.name}</td>
                             <td>
                               <span className="old-price mr-3">{product.prices[1].price}</span>
                               {product.prices[0].price}</td>
                             <td className="text-center">
                               <button className="btn btn-primary mr-3"> Edit</button>
                               <button className="btn btn-danger"> Delete</button>
                             </td>
                           </tr>
                         })
    }
    else {
      ProductList = <tr>
        <td colSpan="4" className="check text-center">No products to display at the moment</td>
      </tr>
    }

    return (
      <div className="Products">
        <table className="table">
          <thead>
            <tr>
              <th className="check"><input type="checkbox"/></th>
              <th>Product</th>
              <th>Price</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>{ProductList}</tbody>
        </table>
      </div>
    )
  }
}

export default Products;
