export const initialState = {
  basket: [],
  user: null,
  apiKey: "http://localhost:5000",
  products: [],
};

export const CalculateTotal = (basket) => {
  let sum = 0;
  basket.map((item) => {
    sum = sum + parseFloat(item?.Prod_price);
  });
  return sum;
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.products,
      };

    case "INSERT_SEARCH":
      return {
        ...state,
        searchValue: action.searchValue,
      };

    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.basket],
      };

    case "ADD_MULTIPLE_BASKET":
      return {
        ...state,
        basket: action.basket,
      };

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (BasketItem) => BasketItem.UUID === action.id
      );
      let newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in basket`
        );
      }
      return {
        ...state,
        basket: newBasket,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "REMOVE_USER":
      return {
        ...state,
        user: null,
      };
    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    default:
      return state;
  }
};

export default reducer;
