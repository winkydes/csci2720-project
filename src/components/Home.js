import React, { useEffect } from "react";
//import {usePapaParse} from 'react-papaparse'

function Home(props) {

  function fetch_data(){
    fetch('http://localhost/home',{
      method: 'GET',
      // mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res)=>console.log(res))
  }

  function handleReadRemoteFile(){
    fetch('https://react-papaparse.js.org/static/csv/normal.csv')
    .then((res)=>res.text())
    .then((res) => console.log(res))
  }

  useEffect(fetch_data); 
  return (
    <div>
      <div className="bg-light">This is homepage. Try commit.</div>
      <button onClick={() => props.callback(false)}>Logout</button>
      <button onClick={() => handleReadRemoteFile()}>readRemoteFile</button>
    </div>);
}

export default Home;
