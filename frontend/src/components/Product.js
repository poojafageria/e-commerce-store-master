import "./Product.css";
import { Link } from "react-router-dom";

const Product = ({ imageUrl, description, price, name, productId }) => {

  const getImageSrc = () => {
    if (imageUrl.startsWith('http') || imageUrl.startsWith('https')) {
      // If imageUrl is an online link, return it
      return imageUrl;
    } else {
      // If imageUrl is a filename, construct the path to the local image
      return `/upload/${imageUrl}`;
    }
  };

  return (
    <div className="product">
      <img src={getImageSrc()} alt={name} />

      <div className="product__info">
        <p className="info__name">{name}</p>

        <p className="info__description">{description.substring(0, 100)}...</p>

        <p className="info__price">${price}</p>

        <Link to={`/product/${productId}`} className="info__button">
          View
        </Link>
      </div>
    </div>
  );
};

export default Product;
