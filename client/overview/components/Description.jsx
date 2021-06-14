import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import token from '../../env/config.js';
import axios from 'axios';
import Features from './Features.jsx';

const Description = () => {
  const currentProduct = useSelector(state => state.currentProduct);
  const[productDescription, setProductDescription] = useState({ features: [] });

  let currentProd = currentProduct.id || 11004;
  useEffect(() => {
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      Authorization: token
    };
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${currentProd}`, {
      params: {
        product_id: currentProduct.id,
        slogan: currentProduct.category,
        description: currentProduct.name,
        features: currentProduct.features
      }
    })
    .then((result) => {
      console.log('DOES SET PRODUCT DESCRIPTION GET FIRED?????')
      setProductDescription(result.data);
    })
  }, [currentProduct])

  return (
    <div className="description-features">
      <div className="slogan-features">
        <div className="productSlogan">
          <p>{productDescription.slogan}</p>
        </div>
        <div className="productFeatures">
        {productDescription.features.map((feature, i) => {
          return <Features key={i} feature={feature} />
          })
        }
        </div>
      </div>
      <div className="productDescription">
        <p>{productDescription.description}</p>
      </div>
    </div>
  )
};

export default Description;