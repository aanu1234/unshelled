import { DELETE_ORDER, FETCH_ALL, VIEW_ORDER } from "./constants";

export const initalState = {
  products: [],
  product: null,
  productsPerPage: 0,
  totalProducts: 0,
};

const OrderReducer = (state = initalState, action) => {
  switch (action.type) {
    case FETCH_ALL: {
      return {
        ...state,
        products: action.payload.data,
        productsPerPage: action.payload.limit,
        totalProducts: action.payload.total,
      };
    }
    case VIEW_ORDER: {
      return {
        ...state,
        product: action.payload,
      };
    }
    case DELETE_ORDER: {
      return {
        ...state,
        products: state.products.filter(
          (item) => item.product_id !== action.payload
        ),
      };
    }
    default:
      return state;
  }
};

export default OrderReducer;
