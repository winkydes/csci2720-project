import React, {useState} from "react";
import {MDBDataTable} from 'mdbreact'

function Table({data, sorting}){
    console.log("HI")
    console.log(data)

    return (
        <MDBDataTable
        striped
        bordered
        small
        data={data}
      />
    );
	
}
export default Table;
