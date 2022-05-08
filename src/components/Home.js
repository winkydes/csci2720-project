import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import {usePapaParse} from 'react-papaparse'

function Home(props) {
  let navigate = useNavigate();

  function fetch_data() {
    fetch('http://localhost/home', {
      method: 'GET',
      // mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res[0]));
  }

  useEffect(fetch_data, []);
  return (
    <div>
      <div className="bg-light">This is homepage. Try commit.</div>
      <button onClick={() => props.callback(false)}>Logout</button>
      <button onClick={() => navigate('../locationDetail')}>Check Location</button>
    </div>
  );
}

export default Home;
