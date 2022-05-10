import React from 'react';

function CommentBlock(props) {
  return (
    <div className="bg-info me-2 my-2 p-2 rounded">
      <h6>{props.comment.username}</h6>
      <p>{props.comment.content}</p>
    </div>
  );
}

export default CommentBlock;
