import React, {useState} from "react";
import {MDBDataTable} from 'mdbreact'

function Table(props){
    //console.log(props.data)
    return (
        <MDBDataTable
        striped
        bordered
        small
        data={props.data}
      />
    );
	
}
export default Table;
