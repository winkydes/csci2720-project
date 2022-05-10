import React, { useEffect } from "react";
import '../css/admin.css';
import Table from './Table'
function Admin() {
    const [long, setLong] = React.useState('');
    const [lat, setLat] = React.useState('');
    const [name, setName] = React.useState('');

    const [location, setLocation] = React.useState([]);


    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [userList, setUserList] = React.useState([]);


    const [tableData, setTableData] = React.useState([]);
    const [data_list, setDataList] = React.useState([]);
    const [location_list, setLocationList] = React.useState([]);
    const [temp_list, setTempList] = React.useState(new Array(49).fill('N/A'));
    const [direction_list, setDirectionList] = React.useState(new Array(49).fill('N/A'));
    const [speed_list, setSpeedList] = React.useState(new Array(49).fill('N/A'));
    const [gust_list, setGustList] = React.useState(new Array(49).fill('N/A'));
    const [humid_list, setHumidList] = React.useState(new Array(49).fill('N/A'));

    // locations functions
    const changeLocationState = (data) => {
        setLocation(data);
    }

    const createLocation = (event) => {
        event.preventDefault();
        if (name === "" || long === "" || lat === "")
            alert("Please fill in all fields");
        else {
            fetch('http://localhost/createLocation', {
                method: 'POST',
                body: JSON.stringify({
                    name: name,
                    long: long,
                    lat: lat,
                }),
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            })
                .then((res) => {
                    return res.text()
                })
                .then(res => alert(res))
        }
    }

    const retreiveLocation = (event) => {
        event.preventDefault();
        if (name === "" && long === "" && lat === "") {
            fetch('http://localhost/listLocation', {
                method: 'POST',
                modes: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            })
                .then((res) => {
                    return res.json();
                })
                .then(res => {
                    changeLocationState(res);
                })

        }

        else {
            fetch('http://localhost/findLocation', {
                method: 'POST',
                body: JSON.stringify({
                    name: name,
                    long: long,
                    lat: lat,
                }),
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            }).then((res) => {
                return res.json();
            }).then(res => changeLocationState(res))
        }
    }

    const updateLat = (event) => {
        event.preventDefault();
        if (name === "" || long === "" || lat === "")
            alert("Please fill in all fields");
        else {
            fetch('http://localhost/updateLat', {
                method: 'POST',
                body: JSON.stringify({
                    name: name,
                    long: long,
                    lat: lat,
                }),
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            })
                .then((res) => {
                    return res.text()
                })
                .then(res => alert(res))
        }

    }

    const updateLong = (event) => {
        event.preventDefault();
        if (name === "" || long === "" || lat === "")
            alert("Please fill in all fields");
        else {
            fetch('http://localhost/updateLong', {
                method: 'POST',
                body: JSON.stringify({
                    name: name,
                    long: long,
                    lat: lat,
                }),
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            })
                .then((res) => {
                    return res.text()

                })
                .then(res => alert(res))
        }

    }
    const updateName = (event) => {
        event.preventDefault();
        if (name === "" || long === "" || lat === "")
            alert("Please fill in all fields");
        else {
            fetch('http://localhost/updateName', {
                method: 'POST',
                body: JSON.stringify({
                    name: name,
                    long: long,
                    lat: lat,
                }),
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            })
                .then((res) => {
                    return res.text()

                })
                .then(res => alert(res))
        }

    }

    const deleteLocation = (event) => {
        event.preventDefault();
        if (name === "" || long === "" || lat === "")
            alert("Please fill in all fields");
        else {
            fetch('http://localhost/deleteLocation', {
                method: 'POST',
                body: JSON.stringify({
                    name: name,
                    long: long,
                    lat: lat,
                }),
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            })
                .then((res) => {
                    return res.text()
                })
                .then(res => alert(res));

        }
    }


    // user functions
    const createUserAdmin = (event) => {
        event.preventDefault();
        if (username === "" || password === "")
            alert("Please fill in all fields");
        else {
            fetch('http://localhost/createUserAdmin', {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            })
                .then((res) => {
                    return res.text()
                })
                .then(res => alert(res))
        }

    }

    const retreiveUser = (event) => {
        event.preventDefault();
        if (username === "" && password === "") {
            fetch('http://localhost/listUser', {
                method: 'POST',
                modes: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            })
                .then((res) => {
                    return res.json();
                }
                ).then(res => {
                    setUserList(res);
                })
        }

        else {
            console.error('hi')
            fetch('http://localhost/findUser', {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            })
                .then((res) => {
                    return res.json();
                })
                .then(res => {
                    setUserList(res)
                })
            }
    }

    const updateUsername = (event) => {
        event.preventDefault();
        if (username === "" || password === "")
            alert("Please fill in all fields");
        else {
            fetch('http://localhost/updateUsername', {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            })
                .then((res) => {
                    return res.text();
                })
                .then(res => alert(res))
        }

    }

    const updatePassword = (event) => {
        event.preventDefault();
        if (username === "" || password === "")
            alert("Please fill in all fields");
        else {
            fetch('http://localhost/updatePassword', {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            })
                .then(res => {
                    console.log(res)
                    return res.text();
                })
                .then(res => alert(res))
        }
    }

    const deleteUser = (event) => {
        event.preventDefault();
        if (username === "" || password === "")
            alert("Please fill in all fields");
        else {
            fetch('http://localhost/deleteUser', {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            })
                .then((res) => {
                    return res.text()
                })
                .then(res => alert(res))
        }
    }

    // when fetch_data is called, the data of the table is updated from the fetched csv directly
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
            console.log(res.length)
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
            <section className="location-form">

                <form>
                    <h1 className="text-center">Location Data</h1>
                    <div className="mb-3">
                        <input className="form-control" type="text" placeholder="Lat" name="lat" value={lat} onChange={(e) => setLat(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <input className="form-control" type="text" placeholder="Long" name="long" value={long} onChange={(e) => setLong(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <input className="form-control" type="text" placeholder="Name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-primary d-block w-100" type="submit" onClick={createLocation}>Create</button>
                        <button className="btn btn-primary d-block w-100" type="submit" onClick={retreiveLocation}>Retrieve</button>

                        <div className="btn-group w-100" role="group" aria-label="location update">
                            <button className="btn btn-primary" type="submit" onClick={updateLat}>Update Latitude</button>
                            <button className="btn btn-primary" type="submit" onClick={updateLong}>Update Longtitude</button>
                            <button className="btn btn-primary" type="submit" onClick={updateName}>Update Name</button>
                        </div>

                        <button className="btn btn-primary d-block w-100" type="submit" onClick={deleteLocation}>Delete</button>
                    </div>

                    {location.length !== 0 &&
                        <div className="table-responsive text-nowrap">
                            <table className="table table-striped table-dark table-hover">
                                <thead>
                                    <tr>
                                        <th>Latitude</th>
                                        <th>Longtitude</th>
                                        <th>Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        location.map((loc) => (
                                            <tr key={loc.name}>
                                                <td>{loc.latitude}</td>
                                                <td>{loc.longtitude}</td>
                                                <td>{loc.name}</td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>
                    }
                </form>


            </section>

            <section className="location-form">

                <form>
                    <h1 className="text-center">User Data</h1>
                    <div className="mb-3">
                        <input className="form-control" type="text" placeholder="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <input className="form-control" type="text" placeholder="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-primary d-block w-100" type="submit" onClick={createUserAdmin}>Create</button>
                        <button className="btn btn-primary d-block w-100" type="submit" onClick={retreiveUser}>Retrieve</button>


                        <button className="btn btn-primary d-block w-100" type="submit" onClick={updatePassword}>Update Password</button>


                        <button className="btn btn-primary d-block w-100" type="submit" onClick={deleteUser}>Delete</button>
                    </div>

                    {userList.length !== 0 &&
                        <div className="table-responsive text-nowrap">
                            <table className="table table-striped table-dark table-hover">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Password</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        userList.map((u) => (
                                            <tr key={u.username}>
                                                <td>{u.username}</td>
                                                <td>{u.password}</td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>
                    }

                </form>
            </section>
            <div>
            <button onClick={() => fetch_data()}>Fetch data</button>
            <Table data={tableData}/>
            </div>
        </div>

    )


}

export default Admin;
