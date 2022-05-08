import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
//import {usePapaParse} from 'react-papaparse'

function Home(props) {
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
      <Link to="/locationDetail">Check Location</Link>
    </div>
  );
}

export default Home;
