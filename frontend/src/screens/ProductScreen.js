import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductDetails } from '../redux/actions/productActions';
import { addToCart } from '../redux/actions/cartActions';
import Comment from "../components/comment"
import './ProductScreen.css'; // Import custom CSS if needed
import { submitComment } from '../redux/actions/commentActions';
const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.getProductDetails);
  const { loading, error, product } = productDetails;

  // Fetch product details
  useEffect(() => {
    if (product && match.params.id !== product._id) {
      dispatch(getProductDetails(match.params.id));
    }
  }, [dispatch, match, product]);

  // Add to cart handler
  const addToCartHandler = () => {
    if (user.userInfo.isLogin) {
      dispatch(addToCart(product._id, qty));
      history.push(`/cart`);
    } else {
      alert('You need to first login.');
    }
  };

  const handleSubmitComment = (commentData) => {
    dispatch(submitComment(commentData));
  };


  return (
    <div className="container mt-4">
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <div className="row">
            <div className="col-md-6">
              <div className="left__image">
                {product.imageUrl && (
                  <img
                    src={
                      product.imageUrl.startsWith('http') ||
                      product.imageUrl.startsWith('https')
                        ? product.imageUrl
                        : `/upload/${product.imageUrl}`
                    }
                    alt={product.name}
                    className="img-fluid"
                  />
                )}
              </div>
              <div className="left__info">
                <p className="left__name">{product.name}</p>
                <p>Price: ${product.price}</p>
                <p>Description: {product.description}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="right__info">
                <p>
                  Price: <span>${product.price}</span>
                </p>
                <p>
                  Status:{' '}
                  <span>
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </p>
                <p>
                  Qty
                  <select
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    className="form-select"
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </p>
                <p>
                  <button
                    type="button"
                    onClick={addToCartHandler}
                    className="btn btn-primary"
                  >
                    Add To Cart
                  </button>
                </p>
              </div>
            </div>
          </div>
          {/* Display Comment component */}
          <Comment onSubmit={submitComment} />
        </>
      )}
    </div>
  );
};

export default ProductScreen;
