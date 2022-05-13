import React from 'react';

function CommentBlock(props) {
  return (
    <div className="card m-2">
      <div className="card-body">
        <div className="d-flex flex-row">
          <h6 className="card-title">{props.comment.username}</h6>
        </div>
        <p className="card-text d-flex">{props.comment.content}</p>
        <p className="card-text" style={{fontSize: "10px"}}><em>{props.comment.date.toLocaleString().substring(0, 10)}</em></p>
      </div>
    </div>
  );
}

export default CommentBlock;
