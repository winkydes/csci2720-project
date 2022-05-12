import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
//import {usePapaParse} from 'react-papaparse'
import Table from './Table';
import Header from './Header';

function Home(props) {
  const [tableData, setTableData] = React.useState([]);
  const [data_list, setDataList] = React.useState([]);
  const [location_list, setLocationList] = React.useState([]);
  const [temp_list, setTempList] = React.useState(new Array(49).fill('N/A'));
  const [direction_list, setDirectionList] = React.useState(new Array(49).fill('N/A'));
  const [speed_list, setSpeedList] = React.useState(new Array(49).fill('N/A'));
  const [gust_list, setGustList] = React.useState(new Array(49).fill('N/A'));
  const [humid_list, setHumidList] = React.useState(new Array(49).fill('N/A'));

  // when fetch_data is called, data from database is fetched and displayed
  function fetch_data() {
    fetch('http://localhost/userhome', {
      method: 'GET',
      // mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // store all location into a list, later set data according to thi list
        //console.log('HOMEJS,', res[0].gust);
        //console.log(location_list.length);
        for (var k = 0; k < 49; k++) {
          gust_list.push(res[k].gust);
          temp_list.push(res[k].temp);
          direction_list.push(res[k].direction);
          humid_list.push(res[k].humid);
          speed_list.push(res[k].speed);
          location_list.push(res[k].location);
          setGustList(gust_list);
          setTempList(temp_list);
          setHumidList(humid_list);
          setSpeedList(speed_list);
          setDirectionList(direction_list);
          setLocationList(location_list);
        } //endOf while
        let j = 0;
        setDataList([]);
        let list = [];
        while (j < location_list.length) {
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
          list.push({
            location: <Link to={{ pathname: `/locationDetail/:${location_list[j]}` }}>{location_list[j]}</Link>,
            temp: temp_list[j],
            direction: direction_list[j],
            speed: speed_list[j],
            gust: gust_list[j],
            humid: humid_list[j],
          });
          j++;
        }
        setDataList((data_list) => (data_list = list));
        setTableData({
          columns: [
            {
              label: 'Location',
              field: 'location',
              sort: 'asc',
              width: 150,
            },
            {
              label: 'Air tamperature',
              field: 'temp',
              sort: 'asc',
              width: 270,
            },
            {
              label: 'Wind direction',
              field: 'direction',
              sort: 'asc',
              width: 200,
            },
            {
              label: 'Wind speed',
              field: 'speed',
              sort: 'asc',
              width: 100,
            },
            {
              label: 'Maximum gust',
              field: 'gust',
              sort: 'asc',
              width: 150,
            },
            {
              label: 'Humidity',
              field: 'humid',
              sort: 'asc',
              width: 150,
            },
          ],
          rows: data_list.slice(data_list.length - 49, data_list.length),
        });
      });
  }
  useEffect(fetch_data, [data_list, direction_list, gust_list, humid_list, location_list, speed_list, temp_list]);
  return (
    <div>
      <Header username={props.username} />
      <Table data={tableData} />
      <button className="btn btn-secondary" onClick={() => props.callback(false)}>
        Logout
      </button>
    </div>
  );
}

export default Home;
