import React, { Component } from 'react';

import * as PropTypes       from "prop-types";

class Product extends Component {
  render () {
    return <tr>
      <td className="check"><input type="checkbox"/></td>
      {/*region: SECTION  product name*/}
      <td>
        {
          this.props.state.isEditing && this.props.state.selectedProductId === this.props.product.id ?
          <input type="text" value={this.props.state.product.name}
                 onChange={this.props.onChange}
                 readOnly={!(this.props.state.isEditing && this.props.state.selectedProductId === this.props.product.id)}/> : null
        }
        {
          !this.props.state.isEditing || (this.props.state.isEditing && this.props.state.selectedProductId !== this.props.product.id) ?
          <input type="text" value={this.props.product.name}
                 onDoubleClick={this.props.onDoubleClick}
                 readOnly={true}/> : null
        }
      </td>
      {/*endregion: SECTION  product name*/}

      {/*region: SECTION product price*/}
      <td style={{ width : "200px" }}>
        {this.props.product.prices[1] && !this.props.editing ?
         <span className="old-price mr-3" title={`Previously : ${this.props.product.prices[1].price}`}>
                                  {this.props.product.prices[1].price}
                                </span> : null}
        {
          this.props.state.isEditing && this.props.state.selectedProductId === this.props.product.id ?
          <input type="text" className="font-weight-bold"
                 style={{ maxWidth : "100px" }}
                 title={`Current Price : ${this.props.state.product.price}`}
                 onChange={this.props.onChange1}
                 value={this.props.state.product.price}

                 readOnly={!(this.props.state.isEditing && this.props.state.selectedProductId === this.props.product.id)}/> : null
        }
        {
          !this.props.state.isEditing || (this.props.state.isEditing && this.props.state.selectedProductId !== this.props.product.id) ?
          <input type="text" className="font-weight-bold"
                 style={{ maxWidth : "100px" }}
                 title={`Current Price : ${this.props.product.prices[0].price}`}
                 onDoubleClick={this.props.onDoubleClick}
                 value={this.props.product.prices[0].price}
                 readOnly={true}/> : null
        }
      </td>
      {/*endregion: SECTION product price*/}

      {/*region: SECTION Buttons Cell*/}
      <td className="text-center">
        {
          this.props.state.isEditing && this.props.state.selectedProductId === this.props.product.id ?
          <button className="btn btn-success mr-3"
                  onClick={this.props.onClick}> Save</button> : null
        }
        <button className={`${this.props.disableEdit} btn btn-dark mr-3`}
                onClick={this.props.onClick1}> Edit
        </button>
        <button className={`${this.props.disableDelete} btn btn-danger mr-3`}
                onClick={this.props.onClick2}> Delete
        </button>
      </td>
      {/* endregion/SECTION Buttons Cell*/}
    </tr>;
  }
}

Product.propTypes = {
  state         : PropTypes.shape({
                                    loaded            : PropTypes.bool,
                                    product           : PropTypes.shape({ price : PropTypes.string, name : PropTypes.string }),
                                    price             : PropTypes.string,
                                    isEditing         : PropTypes.bool,
                                    name              : PropTypes.string,
                                    loading           : PropTypes.bool,
                                    selectedProductId : PropTypes.number,
                                    products          : PropTypes.any
                                  }),
  product       : PropTypes.any,
  onChange      : PropTypes.func,
  onDoubleClick : PropTypes.func,
  editing       : PropTypes.bool,
  onChange1     : PropTypes.func,
  onClick       : PropTypes.func,
  disableEdit   : PropTypes.any,
  onClick1      : PropTypes.func,
  disableDelete : PropTypes.any,
  onClick2      : PropTypes.func
};

export default Product;
