import React, { Component } from 'react';
import * as PropTypes       from "prop-types";

export class Product extends Component {
  render () {
    let props = this.props;
console.log(props.product.prices, );
    return <tr>
      {/*region: SECTION  product name*/}
      <td>
        {
          props.state.isEditing && props.state.selectedProductId === props.product.id ?
          <input type="text" value={props.state.product.name}
                 onChange={props.onChange}
                 readOnly={!(props.state.isEditing && props.state.selectedProductId === props.product.id)}/> : null
        }
        {
          !props.state.isEditing || (props.state.isEditing && props.state.selectedProductId !== props.product.id) ?
          <input type="text" value={props.product.name}
                 onDoubleClick={props.onDoubleClick}
                 readOnly={true}/> : null
        }
      </td>
      {/*endregion: SECTION  product name*/}

      {/*region: SECTION product price*/}
      <td style={{ width : "200px" }}>
        {props.product.prices.prices[1] && !props.editing ?
         <span className="old-price mr-3" title={`Previously : ${props.product.prices.prices[1].price}`}>
                                  {props.product.prices.prices[1].price}
                                </span> : null}
        {
          props.state.isEditing && props.state.selectedProductId === props.product.id ?
          <input type="text" className="font-weight-bold"
                 style={{ maxWidth : "100px" }}
                 title={`Current Price : ${props.state.product.price}`}
                 onChange={props.onChange1}
                 value={props.state.product.price}

                 readOnly={!(props.state.isEditing && props.state.selectedProductId === props.product.id)}/> : null
        }
        {
          !props.state.isEditing || (props.state.isEditing && props.state.selectedProductId !== props.product.id) ?
          <input type="text" className="font-weight-bold"
                 style={{ maxWidth : "100px" }}
                 title={`Current Price : ${props.product.prices.prices[0].price}`}
                 onDoubleClick={props.onDoubleClick}
                 value={props.product.prices.prices[0].price}
                 readOnly={true}/> : null
        }
      </td>
      {/*endregion: SECTION product price*/}

      {/*region: SECTION Buttons Cell*/}
      <td className="text-center">
        {
          props.state.isEditing && props.state.selectedProductId === props.product.id ?
          <button className="btn btn-success mr-3"
                  onClick={props.onClick}> Save</button> : null
        }
        <button className={`${props.disableEdit} btn btn-dark mr-3`}
                onClick={props.onClick1}> Edit
        </button>
        <button className={`${props.disableDelete} btn btn-danger mr-3`}
                onClick={props.onClick2}> Delete
        </button>
      </td>
      {/* endregion/SECTION Buttons Cell*/}
    </tr>;
  }
}

Product.propTypes = {
  state         : PropTypes.shape({
                                    loaded            : PropTypes.bool,
                                    price             : PropTypes.string || PropTypes.number,
                                    isEditing         : PropTypes.bool,
                                    name              : PropTypes.string,
                                    loading           : PropTypes.bool,
                                    selectedProductId : PropTypes.number,
                                  }),
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
