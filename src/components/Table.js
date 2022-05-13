import React from 'react';
import { MDBDataTable } from 'mdbreact';
import { useEffect } from 'react';

function Table(props) {
  
  return <MDBDataTable striped bordered small data={props.data} sortRows={[]}/>;
}
export default Table;
