import * as actionTypes from '../actions/actions';

const initialState = {
  products : [],
  pricesBin : null // this is trash bin where we'll be tossing price-histories of deleted items
};

const reducer = (state = initialState, action) => {
  // localising {{@link action.payload}} for faster lookup and cleaner code
  let payload = action.payload;
  let newState = null;

  switch (action.type) {
    case actionTypes.SET_INITIAL_STATE:
      console.log(payload);
      return {
        ...state,
        products : payload.products
      };

    case actionTypes.ADD_PRODUCT:
      // make transforms here
      console.log('in add reducer', payload.product);
      // return new state
      // create a new products array which will be used to replace the old one
      newState = {
        ...state,
        products : state.products.concat({
                                           id: state.products.length +  1,
                                           name: payload.product.name,
                                           prices: [
                                             {
                                               id: 1,
                                               price: payload.product.price,
                                               date: Date.now()
                                             }
                                           ]
                                         })
      };
      return newState;

    case actionTypes.EDIT_PRODUCT:
      console.log("'tell me we're here");
      // make transforms here
      // copying old state
      newState = Object.assign({}, state);
      // we first get the item we want to modify (which is the value at the index passed in the payload)
      // let's get the item by splicing the the array at that

      let products = newState.products.map( (product) =>
      {
        if(product.id === payload.product.id){
          if (payload.product.price) {
            // let's add the new price data to the start of the array
            product.prices.unshift({
                                     id : product.prices.length + 1, // let's add the new id
                                     price : payload.product.price, // set the price to the new one
                                     date : Date.now() // then add the modification data
                                   })
          }

          // modify product name if it's part of the payload we receive
          if (payload.product.name) {
            product.name = payload.product.name
          }

          return product
        }
        return product;
      });

      // no need to modify the product id
      // return new state
      return {
        ...state, products : products
      };

    case actionTypes.REMOVE_PRODUCT:
      // make transforms here

      // making a copy of our old state so we don't mutate if
      newState = Object.assign({}, state);


      let filteredArr = newState.products.filter((product, index) =>  {
        return product.id !== payload.index;
      });
      // we first get the item we want to modify (which is the value at the index passed in the payload)
      // let's get the item by splicing the the array at that
      // newState.products.splice(payload.index, 1);

      // TODO move prices to prices trash bin
      // no need to modify the product id
      // return new state
      return {
        ...state,
        products : filteredArr
      };
    default :
      return state;
  }
};

export default reducer;
