import React from 'react';
import { Link } from 'react-router-dom';
import BackToHomeHeader from './BackToHomeHeader';

const baseURL = 'http://localhost';

function FavLocation(props) {
  const [favLocationList, setFavLocationList] = React.useState([]);

  React.useEffect(() => {
    fetch(baseURL + `/favLocation/${props.username}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        let tempArr = [];
        for (const [key, value] of Object.entries(res.list)) {
          tempArr.push(value.name);
        }
        setFavLocationList((favLocationList) => (favLocationList = tempArr));
      });
  }, [props.username]);

  return (
    <div>
      <BackToHomeHeader />
      <h1>Below are your favourite locations!</h1>
      {favLocationList.length === 0 ? (
        <p>You have not add any favourite locations yet.</p>
      ) : (
        favLocationList.map((item) => (

          <ul className="list-group list-group-flush mx-auto w-50">
            <li className="list-group-item">
              <h5><Link to={{ pathname: `/locationDetail/:${item}` }}>{item}</Link></h5>
            </li>
          </ul>
        ))
      )}
    </div>
  );
}

export default FavLocation;
