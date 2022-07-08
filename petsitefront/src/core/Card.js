import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';


import { addItem , updateItem , removeItem} from './cartHelpers'
const Card = ({product , showViewProductButton=true , showAddToCartButton=true,
cartUpdate = false ,setRun = f => f, // default value of function
run = undefined ,// default value of undefined
showRemoveProductButton = false,

}) => {
  var moment = require('moment'); 
  const [count, setCount] = useState(product.count); //def value what the loc store holds
  const [redirect, setRedirect] = useState(false);

    const showViewButton = showViewProductButton => {
        return (
          showViewProductButton && (
            <Link to={`/product/${product._id}`} className="mr-2">
              <button className="btn btn-outline-primary mt-2 mb-2 ">View Product</button>
            </Link>
          )
        );
      };

      const addToCart = () => {
        // console.log('added');
        addItem(product, setRedirect(true)); 
      };

      const shouldRedirect = redirect => {
        if (redirect) {
          return <Redirect to="/cart" />;
        }
      };

      const showAddToCartBtn = showAddToCartButton => {   
        // showbutton here cause checkking if t or f
        return (
          showAddToCartButton && (
            <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2 card-btn-1  ">
              Add to your cart
            </button>
          )
        );
      };
      
      const showCartUpdateOption = cartUpdate =>{
        return cartUpdate && (
      <div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Adjust Quantity</span>
          </div>
          {/* which product to change quantity handleChange */}
          <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
        </div>
     </div>
        )
      };

      const handleChange = productId => event => {
        setRun(!run); // run useEffect in parent Cart
        //grabbibg what user types : come on should be one atleast
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
          updateItem(productId, event.target.value);
        }
      };

      const showStock = quantity => {
        return quantity > 0 ? (
          <span className="badge badge-primary badge-pill">In Stock </span>
        ) : (
          <span className="badge badge-primary badge-pill"> Sorry Out of Stock </span>
        );
      };

      const showRemoveButton = showRemoveProductButton => {
        return (
          showRemoveProductButton && (
            <button
              onClick={() => {
                removeItem(product._id);
                setRun(!run); // run useEffect in parent Cart
              }}
              className="btn btn-outline-danger mt-2 mb-2"
            >
              Remove Product
            </button>
          )
        );
      };

    return(
            <div className="card">
                <div className="card-header name">{product.name}</div>
                <div className="card-body">
                    {shouldRedirect(redirect)}
                    <ShowImage item={product} url ="product"/>
                    <p className="card-p  mt-2">{product.description.substring (0,500)}</p>
                    <p className=" card-p black-10">{product.price}</p>  
                    <p className="black-9">Category: {product.category && product.category.name}</p>  
                    <p className="black-8">Added on {moment(product.createdAt).fromNow()}</p> 
                    {showStock(product.quantity)}
                    <br/>
                    {showViewButton(showViewProductButton)}
                    {showRemoveButton(showRemoveProductButton)}
                    <hr/>
                    {showAddToCartBtn(showAddToCartButton)}
                    {showCartUpdateOption(cartUpdate)}


                </div>

            </div>
    );
};

export default Card;