const relatedProductsReducer = (state = '', action) => {
  switch (action.type) {
    case 'UPDATE_ALL' :
      return action.payload;
    default:
      return state;
  }
}

export default relatedProductsReducer