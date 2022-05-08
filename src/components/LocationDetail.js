import React from 'react';
import CommentBlock from './CommentBlock';

function LocationDetail(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    let submission = document.getElementById('comment').value;
    if (submission === '') return;
    fetch('http://localhost/postComment', {
      method: 'POST',
      body: JSON.stringify({
        location: 'testLocation',
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

  return (
    <div className="h-100 d-flex flex-column">
      <div
        id="map"
        className="h-50 position-sticky sticky-top d-flex align-items-center justify-content-center border border-dark bg-white"
        style={{ minHeight: '50vh' }}
      >
        This is where the map is located at.
      </div>
      <div>
        <h1 className="w-100 d-flex my-2 ms-2">Location Name</h1>
      </div>
      <div>
        <div className="row">
          <div id="detailSession" className="col-6 bg-secondary" style={{ textAlign: 'left' }}>
            <h3 className="ms-2">Weather Details</h3>
          </div>
          <div id="commentSession" className="col-6 bg-secondary bg-gradient" style={{ textAlign: 'left' }}>
            <h3>Comments</h3>
            <CommentBlock />
            <form className="my-2 d-flex flex-row align-items-center" onSubmit={handleSubmit}>
              <textarea id="comment" className="me-2 w-75 h-25" type="text" placeholder="Comment..." />
              <input type="submit" className="h-25" value="Comment" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationDetail;
