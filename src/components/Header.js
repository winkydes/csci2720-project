import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header(props) {
  const navigate = useNavigate();

  function navigateToFavLoc() {
    navigate(`/favLocation/:${props.username}`);
  }

  return (
    <div className="d-flex justify-content-between bg bg-light">
      <h3 className="ms-2 mt-2">Welcome back! {props.username}</h3>
      <button className="btn btn-primary m-2" onClick={() => navigateToFavLoc()}>
        Show my favourite location!
      </button>
    </div>
  );
}

export default Header;
