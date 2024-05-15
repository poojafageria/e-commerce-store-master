// In your Redux action creators file (e.g., commentActions.js)
import {
    SUBMIT_COMMENT_REQUEST,
    SUBMIT_COMMENT_SUCCESS,
    SUBMIT_COMMENT_FAILURE,
  } from './commentActionTypes';
  
  export const submitComment = (commentData) => async (dispatch) => {
    try {
      dispatch({ type: SUBMIT_COMMENT_REQUEST });
  
      // Make the API call to submit the comment data to the backend
      const response = await fetch('/api/comments/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }
  
      dispatch({ type: SUBMIT_COMMENT_SUCCESS });
    } catch (error) {
      console.error(error);
      dispatch({ type: SUBMIT_COMMENT_FAILURE, payload: error.message });
    }
  };
  