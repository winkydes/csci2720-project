import React from 'react';

function CommentBlock(props) {
  return (
    // <div className="bg-info me-2 my-2 p-2 rounded">
    //   <h6>{props.comment.username}</h6>
    //   <p>{props.comment.content}</p>
    // </div>
    <div className="card m-2">
      <div className="card-body">
        <h5 className="card-title">{props.comment.username}</h5>
        <p className="card-text">{props.comment.content}</p>
      </div>
    </div>
  );
}

export default CommentBlock;
