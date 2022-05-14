/**
 * Group 29
 * 1155143490 Ng Ka Chun
 * 1155143499 Wan Yee Kid
 * 1155133260 Lam Wai To Keith
 * 1155127101 Ng Wing Yin
 * 1155127221 HE Zhanbo
 * 1155125257 Ho Cheuk Hin
 */

import React from 'react';

function CommentBlock(props) {
  return (
    <div className="card m-2">
      <div className="card-body">
        <div className="d-flex flex-row">
          <h6 className="card-title">{props.comment.username}</h6>
        </div>
       
        <p className="card-subtitle" style={{fontSize: "10px"}}><em>{props.comment.date.toLocaleString().substring(0, 10)}</em></p>
        <p className="card-text d-flex">{props.comment.content}</p>
      </div>
    </div>
  );
}

export default CommentBlock;
