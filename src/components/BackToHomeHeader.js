import React from 'react';
import { useNavigate } from 'react-router-dom';

function BackToHomeHeader() {
  const navigate = useNavigate();

  function navigateToHome() {
    navigate(`/home`);
  }

  return (
    <div className="d-flex justify-content-between bg bg-light">
      <button className="btn btn-primary m-2" onClick={() => navigateToHome()}>
        Return to home page
      </button>
    </div>
  );
}

export default BackToHomeHeader;
