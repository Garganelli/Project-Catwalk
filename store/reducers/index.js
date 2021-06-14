import productReducer from './product.js';
import styleReducer from './styleReducer.js';
import metaReviewsReducer from './metaReviewsReducer.js';
import ratingReducer from './rating.js';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  currentProduct: productReducer,
  currentStyle: styleReducer,
  currentRating: ratingReducer,
  currentMetaReviews: metaReviewsReducer
});

export default rootReducer;