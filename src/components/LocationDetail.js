import React from 'react';

function LocationDetail(props) {
  return (
    <div className="h-100 d-flex flex-column">
      <div
        id="map"
        className="h-50 position-sticky sticky-top d-flex align-items-center justify-content-center border border-dark bg-white"
        style={{ 'min-height': '50vh' }}
      >
        This is where the map is located at.
      </div>
      <div>
        <h1 className="w-100 d-flex m-2">Location Name</h1>
      </div>
      <div className="d-flex m-2 flex-column">
        <span>The paragraph here shows the info for the location</span>
      </div>
    </div>
  );
}

export default LocationDetail;
