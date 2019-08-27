import * as actionTypes from '../actions/actions';

const initialState = {
  products  : [],
  prices : [],
  pricesBin : null // this is trash bin where we'll be tossing price-histories of deleted items
};

const reducer = (state = initialState, action) => {
  // localising {{@link action.payload}} for faster lookup and cleaner code
  let payload = action.payload;
  let newState = null;

  switch (action.type) {
    case actionTypes.SET_INITIAL_STATE:
      let productsTable = payload.products.map((product) => {
        return {
          id   : product.id,
          name : product.name
        }
      });
      let pricesTable = payload.products.map((product) => {
        return {
          id   : product.id,
          prices : product.prices
        }
      });
      return {
        ...state,
        products : productsTable,
        prices   : pricesTable
      };

    case actionTypes.ADD_PRODUCT:
      // make transforms here
      // return new state
      // create a new products array which will be used to replace the old one
      let id = state.products.length + 1;
      newState = {
        ...state,
        products : state.products.concat({
                                           id   : id,
                                           name : payload.product.name,
                                         }),
        prices   : state.prices.concat({
                                           id     : id,
                                           prices : [
                                             {
                                               id    : 1,
                                               price : payload.product.price,
                                               date  : Date.now()
                                             }
                                           ]
                                         })
      };
      return newState;

    case actionTypes.EDIT_PRODUCT:
      // make transforms here
      // copying old state
      newState = Object.assign({}, state);
      // we first get the item we want to modify (which is the value at the index passed in the payload)
      // let's get the item by splicing the the array at that
      let products, prices;

      if (payload.product.name) {
        products = newState.products.map((product) => {
          if (product.id === payload.product.id) {
            // modify product name if it's part of the payload we receive
            product.name = payload.product.name;
            return product
          }
          return product;
        });
      }

      if (payload.product.price) {
        prices = newState.prices.map((prices) => {
          if (prices.id === payload.product.id) {
            if ( payload.product.price !== prices.prices[0].price )
            { // user didn't send down the old price
              // let's go ahead ahead add it
              // let's add the new price data to the start of the array
              prices.prices.unshift({
                                      id    : prices.length + 1, // let's add the new id
                                      price : payload.product.price, // set the price to the new one
                                      date  : Date.now() // then add the modification data
                                    });
            }
            return prices
          }
          return prices;
        });
      }

      // no need to modify the product id
      // return new state
      return {
        ...state, ...(payload.product.name && { products }), ...(payload.product.price && { prices }),
      };

    case actionTypes.REMOVE_PRODUCT:
      // make transforms here

      // making a copy of our old state so we don't mutate if
      newState = Object.assign({}, state);

      let filteredArr = newState.products.filter((product) => {
        return product.id !== payload.index;
      });
      // we first get the item we want to modify (which is the value at the index passed in the payload)
      // let's get the item by splicing the the array at that
      // newState.products.splice(payload.index, 1);

      // TODO move prices to prices trash bin
      // no need to modify the product id
      // return new state

      //set newState up for garbage collection
      newState = null;
      return {
        ...state,
        products : filteredArr
      };
    default :
      return state;
  }
};

export default reducer;
