import React from 'react';
import CommentBlock from './CommentBlock';
import { useParams } from 'react-router-dom';
import BackToHomeHeader from './BackToHomeHeader';

function LocationDetail(props) {
  const [comment, setComment] = React.useState('');
  const [commentData, setCommentData] = React.useState([]);
  const [locationDetail, setLocationDetail] = React.useState({});
  const [isFavLoc, setIsFavLoc] = React.useState(false);

  let { locationName } = useParams();
  locationName = locationName.substring(1);

  // the location name has to change to props.location, to be handled when navigation is done
  const handleSubmit = async (event) => {
    event.preventDefault();
    let submission = document.getElementById('comment').value;
    if (submission === '') return;
    document.getElementById('comment').value = '';
    await setComment((comment) => (comment = submission));
    await fetch('http://localhost/postComment', {
      method: 'POST',
      body: JSON.stringify({
        location: locationName,
        username: props.username,
        content: submission,
      }),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res.success));
  };

  // fetch comment
  React.useEffect(() => {
    fetch(`http://localhost/fetchComment/${locationName}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setCommentData((commentData) => (commentData = res));
      });
  }, [commentData, comment, locationName]);

  // fetch details of location
  React.useEffect(() => {
    fetch(`http://localhost/fetchLocationDetails/${locationName}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setLocationDetail((locationDetail) => (locationDetail = res));
      });
  }, [locationName]);

  // fetch whether this location is user's favourite location
  React.useEffect(() => {
    fetch(`http://localhost/checkFavLocation/${locationName}/${props.username}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.isFavLoc === true) setIsFavLoc((isFavLoc) => (isFavLoc = true));
        else setIsFavLoc((isFavLoc) => (isFavLoc = false));
      });
  }, [locationName, props.username, isFavLoc]);

  function addFavLocation() {
    fetch(`http://localhost/addFavLocation/${locationName}/${props.username}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then(() => {
        setIsFavLoc((isFavLoc) => (isFavLoc = true));
      });
  }

  function removeFavLocation() {
    fetch(`http://localhost/delFavLocation/${locationName}/${props.username}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then(() => {
        setIsFavLoc((isFavLoc) => (isFavLoc = false));
      });
  }

  return (
    <div className="h-100 d-flex flex-column">
      <BackToHomeHeader />
      <div
        id="map"
        className="h-50 position-sticky sticky-top d-flex align-items-center justify-content-center border border-dark bg-white"
        style={{ minHeight: '50vh' }}
      >
        This is where the map is located at.
      </div>
      <div className="d-flex my-2 ms-2 justify-content-between">
        <h1>{locationName}</h1>
        {isFavLoc ? (
          <button onClick={() => removeFavLocation()} className="btn btn-danger me-2">
            Remove from favourite
          </button>
        ) : (
          <button onClick={() => addFavLocation()} className="btn btn-success me-2">
            Add to favourite
          </button>
        )}
      </div>
      <div className="d-flex w-100 align-items-center justify-content-center">
        <div className="w-100 row">
          <div id="detailSession" className="col-6 bg-secondary bg-gradient" style={{ textAlign: 'left' }}>
            <h3>Details</h3>
            <table className="m-2">
              <tr>
                <td>Latitude: {locationDetail.latitude}</td>
              </tr>
              <tr>
                <td>Longtitude: {locationDetail.longtitude}</td>
              </tr>
              <tr>
                <td>Air Temperature: {locationDetail.temp}</td>
              </tr>
              <tr>
                <td>Wind Direction: {locationDetail.direction}</td>
              </tr>
              <tr>
                <td>Wind Speed: {locationDetail.speed}</td>
              </tr>
              <tr>
                <td>Maximum Gust: {locationDetail.gust}</td>
              </tr>
              <tr>
                <td>Humidity: {locationDetail.humid}</td>
              </tr>
            </table>
          </div>
          <div id="commentSession" className="col-6 bg-secondary bg-gradient" style={{ textAlign: 'left' }}>
            <h3>Comments</h3>
            {commentData !== null ? (
              commentData.map((item) => <CommentBlock key={item.id} comment={item} />)
            ) : (
              <p>There are no comments yet.</p>
            )}
            <form className="my-2 d-flex flex-row align-items-center" onSubmit={handleSubmit}>
              <textarea id="comment" className="me-2 w-75 h-25" type="text" placeholder="Comment..." />
              <input type="submit" className="btn btn-light" value="Post!" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationDetail;
