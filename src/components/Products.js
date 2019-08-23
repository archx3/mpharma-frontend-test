import React, { Component } from 'react';
import axios from 'axios'

class Products extends Component
{
  state = {};

  // Catches exceptions generated in descendant components.
  // Unhandled exceptions will cause
  // the entire component tree to unmount.
  componentDidCatch (error, errorInfo) {}

  // Called immediately after a component is mounted.
  // Setting state here will trigger re-rendering
  componentDidMount () {}

  // Called immediately after updating occurs. Not called for the initial render.
  // The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null
  componentDidUpdate (prevProps, prevState, snapshot) {}

  // Called immediately before a component is destroyed.
  // Perform any necessary cleanup in this method, such as
  // cancelled network requests, or cleaning up any DOM elements created in componentDidMount.
  componentWillUnmount () {}

  render (props)
  {
    return (
      <div className="Products">
        <table>
          <thead>
            <tr>
              <th className="check"><input type="checkbox"/></th>
              <th>Product</th>
              <th>Price</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="check"><input type="check"/></td>
              <td>Product</td>
              <td>Price</td>
              <td>
                <button><i className="fa fa-pencil"></i></button>
                <button><i className="fa fa-bin"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default Products;
