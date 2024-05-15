import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Import useHistory hook

const AddProductPage = () => {
  const [product, setProduct] = useState({
    name: '',
    image: null,
    description: '',
    price: 0,
    countInStock: 0
  });

  const history = useHistory(); // Initialize useHistory hook

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      // File input has a selected file
      console.log(files[0]);
      if (name === 'image') {
        setProduct(prevProduct => ({
          ...prevProduct,
          image: files[0]
        }));
      }
    } else {
      // File input doesn't have a selected file
      console.log("No file selected");
    }    
    if (name !== 'image') {
      setProduct(prevProduct => ({
        ...prevProduct,
        [name]: value
      }));
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('image', product.image);
      formData.append('description', product.description);
      formData.append('price', product.price);
      formData.append('countInStock', product.countInStock);

      const response = await axios.post('http://localhost:3001/api/cart/addProduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data);
      history.push('/'); 
    } catch (error) {
      console.error('Error adding product:', error);
      history.push('/');
    }
  };

  return (
    <div>
      <div className="container mt-5">
        <h2>Add Product</h2>
        <form method="POST" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={product.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Image:</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              name="image"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description:</label>
            <textarea
              className="form-control"
              name="description"
              value={product.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Price:</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={product.price}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Count in Stock:</label>
            <input
              type="number"
              className="form-control"
              name="countInStock"
              value={product.countInStock}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
