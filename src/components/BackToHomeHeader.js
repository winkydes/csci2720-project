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
