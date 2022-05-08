import React, { useEffect } from "react";
//import {usePapaParse} from 'react-papaparse'
import Table from "./Table";

function Home(props) {
  const [tableData, setTableData] = React.useState([]);
  const [data_list, setDataList] = React.useState([]);
  const [location_list, setLocationList] = React.useState([]);
  const [temp_list, setTempList] = React.useState(new Array(49).fill('N/A'));
  const [direction_list, setDirectionList] = React.useState(new Array(49).fill('N/A'));
  const [speed_list, setSpeedList] = React.useState(new Array(49).fill('N/A'));
  const [gust_list, setGustList] = React.useState(new Array(49).fill('N/A'));
  const [humid_list, setHumidList] = React.useState(new Array(49).fill('N/A'));

  function fetch_data(){
    fetch('http://localhost/home',{
      method: 'GET',
      // mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // store all location into a list, later set data according to thi list
        let i = 0
        while(i<res.length){
          if (res[i][0]!='Date time' && !location_list.includes(res[i][1])){
            location_list.push(res[i][1])
          }
          setLocationList(location_list)
          i++;
        }
        console.log("location list:", location_list)
        // getting data according to the locations
        let toGet = null
        let k = 0
        while(k<92){
          // change the target data if encounter a Date Time line
          if (res[k][0]=='Date time'
          ){
            if (res[k][2]=="Air Temperature(degree Celsius)"){
              toGet = 'temp'
              k++
            }
            if (res[k][2]=="10-Minute Mean Wind Direction(Compass points)"){
              toGet = 'wind'
              k++
            }
            if (res[k][2]=="Relative Humidity(percent)"){
              toGet = 'humid'
              k++
            }
          }
          else{
          // toGet target data and allocate to the corresponding index
          let index = location_list.indexOf(res[k][1])
          if (toGet == 'temp'){
            temp_list[index] = res[k][2]
          }
          if (toGet == 'wind'){
            gust_list[index] = res[k][4]
            speed_list[index] = res[k][3]
            direction_list[index] = res[k][2]
          }
          if (toGet == 'humid'){
            humid_list[index] = res[k][2]
          }
          k++
          }
          // setting list inside loop
          setGustList(gust_list)
          setTempList(temp_list)
          setHumidList(humid_list)
          setSpeedList(speed_list)
          setDirectionList(direction_list)
        }//endOf while
        console.log(gust_list)
        console.log(location_list.length)
        let j = 0
        setDataList([])
        while(j<location_list.length){
          // setDataList(curr => curr.push(
          //   {
          //     location: location_list[j],
          //     temp: temp_list[j],
          //     direction: direction_list[j],
          //     speed: speed_list[j],
          //     gust: gust_list[j],
          //     humid: humid_list[j]
          //   }
          // ))
          data_list.push(
            {
              location: location_list[j],
              temp: temp_list[j],
              direction: direction_list[j],
              speed: speed_list[j],
              gust: gust_list[j],
              humid: humid_list[j]
            }
          )
          setDataList(data_list)
          j++
        }
        console.log(data_list)
        setTableData({
          columns: [
            {
              label: 'Location',
              field: 'location',
              sort: 'asc',
              width: 150
            },
            {
              label: 'Air tamperature',
              field: 'temp',
              sort: 'asc',
              width: 270
            },
            {
              label: 'Wind direction',
              field: 'direction',
              sort: 'asc',
              width: 200
            },
            {
              label: 'Wind speed',
              field: 'speed',
              sort: 'asc',
              width: 100
            },
            {
              label: 'Maximum gust',
              field: 'gust',
              sort: 'asc',
              width: 150
            },
            {
              label: 'Humidity',
              field: 'humid',
              sort: 'asc',
              width: 150
            },
          ],   
          rows : data_list.slice(data_list.length-49,data_list.length)          
        })
      })
  }

  return (
    <div>
      <div className="bg-light">This is homepage. Try commit.</div>
      <button onClick={() => props.callback(false)}>Logout</button>
      <button onClick={() => fetch_data()}>Fetch data</button>
      <Table data={tableData}/>
    </div>);
}

export default Home;
