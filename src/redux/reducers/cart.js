const initialState = {
  cart: [],
  totalPriceSelected: 0,
};

const cartReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case 'ADDTOCART': {
      prevState.cart.push({
        ...action.payload,
        number: 1,
        isChecked: true,
        priceBasedNumber: action.payload.price,
      });
      return {
        ...prevState,
      };
    }
    case 'INCQ': {
      prevState.cart[action.payload].number++;
      prevState.cart[action.payload].priceBasedNumber =
        Number(prevState.cart[action.payload].priceBasedNumber) +
        Number(prevState.cart[action.payload].price);
      return {
        ...prevState,
      };
    }
    case 'DECQ': {
      if (prevState.cart[action.payload].number >= 2) {
        prevState.cart[action.payload].number--;
        prevState.cart[action.payload].priceBasedNumber =
          Number(prevState.cart[action.payload].priceBasedNumber) -
          Number(prevState.cart[action.payload].price);
      } else if (prevState.cart[action.payload].number <= 1) {
        prevState.cart[action.payload].number - 0;
      }
      return {
        ...prevState,
      };
    }
    case 'DEL': {
      let newCart = prevState.cart.filter((item) => {
        return item.isChecked === false;
      });
      return {
        ...prevState,
        cart: newCart,
      };
    }
    case 'CHECK': {
      prevState.cart[action.payload].isChecked = !prevState.cart[action.payload]
        .isChecked;
      if (
        !prevState.cart[action.payload].isChecked &&
        prevState.cart[action.payload].number >= 1
      ) {
        prevState.totalPriceSelected =
          Number(prevState.totalPriceSelected) -
          Number(prevState.cart[action.payload].priceBasedNumber);
      } else if (prevState.cart[action.payload].isChecked) {
        prevState.totalPriceSelected =
          Number(prevState.totalPriceSelected) +
          Number(prevState.cart[action.payload].priceBasedNumber);
      }
      return {
        ...prevState,
      };
    }
    case 'TOTALPRICE': {
      let total = prevState.cart
        .filter((item) => {
          return item.isChecked;
        })
        .map((item) => {
          return Number(item.priceBasedNumber);
        });

      let totalValue = 0;
      for (let i = 0; i < total.length; i++) {
        totalValue += Number(total[i]);
      }
      return {
        ...prevState,
        totalPriceSelected: totalValue,
      };
    }
    default:
      return prevState;
  }
};

export default cartReducer;
