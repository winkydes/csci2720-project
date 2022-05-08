import React from 'react';

function CommentBlock(props) {
  return (
    <div>
      <h6>{props.username}</h6>
      <p>{props.content}</p>
      <p>hi</p>
    </div>
  );
}

export default CommentBlock;
