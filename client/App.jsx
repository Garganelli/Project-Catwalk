
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Overview from './overview/components/Overview.jsx';
import RatingsAndReviews from './ratings_and_reviews/RatingsAndReviews.jsx';
import axios from 'axios';
import token from './env/config.js';
import {updateAll} from '../store/actions/updateAll.js';
import {updateCache} from '../store/actions/updateCache.js';
import RelatedProductsContainer from './related_products/RelatedProductsContainer.jsx'

function App () {
  const [currentAppId, setCurrentAppId] = useState(11004);
  const [currentChosenStyle, setCurrentChosenStyle] = useState(51174);
  const[isOpenOutfit, setIsOpenOutfit] = useState(false);
  const dispatch = useDispatch();

  /***********************
   *  DATA TO BE CACHED
   ***********************/
  let cachedData = useSelector(state => state.cache) || null;
  let cachedKeys = Object.keys(cachedData)
  let dataToBeCached = {
    currentProduct: useSelector(state => state.currentProduct),
    currentProductStyles: useSelector(state => state.currentProductStyles),
    currentMetaReviews: useSelector(state => state.currentMetaReviews)
  }
  useEffect(() => {
    if (cachedData['11004'] === undefined || cachedData[`${dataToBeCached.currentProduct.data.id}`] === undefined) {
      if (dataToBeCached.currentProduct !== '' || dataToBeCached.currentProductStyles !== '' || dataToBeCached.currentMetaReviews !== '') {
        cachedData[`${dataToBeCached.currentProduct.data.id}`] = dataToBeCached;
        dispatch(updateCache(cachedData))
      }
    }
    if (cachedData[`${currentAppId}`]) {
      if (cachedData[`${dataToBeCached.currentProduct.data.id}`] === undefined) {
        cachedData[dataToBeCached.currentProduct.data.id] = dataToBeCached;
        dispatch(updateCache(cachedData));
      }
      dispatch(updateAll(cachedData[currentAppId]));
/**********************************
 * API CALLS IN CASE NO CACHE DATA
 **********************************/
    } else {
      axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization : token
      };
      let currentProductData = axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${currentAppId}`);
      let currentProductStylesData = axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${currentAppId}/styles`);
      let relatedProductsIds = axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${currentAppId}/related`);
      let currentMetaReviewsData = axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews/meta', {
        params: {
          product_id: currentAppId || 11004
        }
      });
      return Promise.all([currentProductData, currentProductStylesData, currentMetaReviewsData, relatedProductsIds])
        .then((results) => {
          let [currentProductData, currentProductStylesData, currentMetaReviewsData, relatedProductsIds] = results;
          return Promise.all([currentProductData, currentProductStylesData, currentMetaReviewsData, fetchRelatedProducts(relatedProductsIds)])
        })
        .then((results) => {
          let [currentProductData, currentProductStylesData, currentMetaReviewsData, relatedProductsData] = results;

          let updateAllPayload = {
            currentProduct: currentProductData,
            currentProductStyles: currentProductStylesData,
            currentMetaReviews: currentMetaReviewsData,
            relatedProductsData: relatedProductsData
          }
          dispatch(updateAll(updateAllPayload))
        })
        .catch(error => {
          console.error(error)
        })
    }
  }, [currentAppId])


  const fetchRelatedProducts = (results) => {
    let relatedProductIds = results.data
    let relatedProductsData = relatedProductIds.map(relatedProduct =>
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${relatedProduct}`))
    let relatedProductsStyles = relatedProductIds.map(relatedProduct =>
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${relatedProduct}/styles`))
    let relatedProductsReviews = relatedProductIds.map(relatedProduct =>
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews/meta`, {params: {
        product_id: relatedProduct
      }}))
    return Promise.all(relatedProductsData.concat(relatedProductsStyles).concat(relatedProductsReviews))
  }

  const togglePopupOutfit = () => {
    setIsOpenOutfit(!isOpenOutfit);
  }

  return(
    <div className="App">
      <Overview setCurrentChosenStyle={setCurrentChosenStyle} togglePopupOutfit={togglePopupOutfit} isOpenOutfit={isOpenOutfit}/>
      <RelatedProductsContainer setCurrentAppId={setCurrentAppId} currentChosenStyleId={currentChosenStyle} isOpenOutfit={isOpenOutfit}/>
      <RatingsAndReviews />
    </div>
  );
}

export default App;