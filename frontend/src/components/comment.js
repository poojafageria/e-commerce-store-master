// Comment.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitComment } from '../redux/actions/commentActions';

const Comment = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(submitComment({ userName, email, comment }));
    // Clear input fields after submission
    setUserName('');
    setEmail('');
    setComment('');
  };

  return (
    <div className="container mt-4">
      <h3>write your feedback</h3>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Your Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <textarea
          className="form-control"
          placeholder="Your Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Comment;
