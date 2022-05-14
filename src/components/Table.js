/**
 * Group 29
 * 1155143490 Ng Ka Chun
 * 1155143499 Wan Yee Kid
 * 1155133260 Lam Wai To Keith
 * 1155127101 Ng Wing Yin
 * 1155127221 HE Zhanbo
 * 1155125257 Ho Cheuk Hin
 */

import React from 'react';
import { MDBDataTable } from 'mdbreact';

function Table(props) {
  
  return <MDBDataTable striped bordered small data={props.data} sortRows={[]}/>;
}
export default Table;
