import React from 'react';
import Button from 'react-bootstrap/Button';

const Product = (props) => {
  const { id, image, name, description, price, isCompared } = props;
  
  return (
  <div className="col-md-3">
    <div className="product-container shadow-sm rounded">
      <div className="product-image">
          <img src={image}/>
          <div className="image-overlay" style={{ display: isCompared? 'block' : 'none' }}>
            <Button className="button_compare" onClick={ () => props.productClicked(id, isCompared)}> {isCompared? "REMOVE": "COMPARE"}</Button>
          </div>
      </div>
      <div className="product-details">
          <div className="product-price">
            {price}
          </div>
          <div className="product-description">
            <p className="title">{name}</p>
            <p className="sub-title">{description}</p>
          </div>  
      </div>
    </div>
  </div>    
  );
}

export default Product;
