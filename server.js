/**
 * Group 29
 * 1155143490 Ng Ka Chun
 * 1155143499 Wan Yee Kid
 * 1155133260 Lam Wai To Keith
 * 1155127101 Ng Wing Yin
 * 1155127221 HE Zhanbo
 * 1155125257 Ho Cheuk Hin
 */

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const papa = require('papaparse');
const request = require('request');
const bcrypt = require('bcrypt');
const path = require('path')

require('dotenv').config();

const app = express();
const uri = process.env.MONGODB_URI;

const geodata_url =
  'https://geodata.gov.hk/gs/api/v1.0.0/geoDataQuery?q=%7Bv%3A%221%2E0%2E0%22%2Cid%3A8806a56e-6f68-4f3e-8320-095a23516320%2Clang%3A%22ENG%22%7D';
const humidity_csv_url = 'https://data.weather.gov.hk/weatherAPI/hko_data/regional-weather/latest_1min_humidity.csv';
const wind_csv_url = 'https://data.weather.gov.hk/weatherAPI/hko_data/regional-weather/latest_10min_wind.csv';
const air_csv_url = 'https://data.weather.gov.hk/weatherAPI/hko_data/regional-weather/latest_1min_temperature.csv';
const url_list = [humidity_csv_url, air_csv_url, wind_csv_url];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')))

// Use CORS
app.use(cors({ origin: '*' }));
app.get('/', (req, res) => {
    console.log('login')
    res.sendFile(__dirname + '/index.html');
})
// Connection
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

//Upon connection failure
db.on('error', console.error.bind(console, 'Connection error:'));

db.once('open', function () {
  console.log('Connection is open...');

  const CommentSchema = mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  });

  const Comment = mongoose.model('Comment', CommentSchema);

  const LocationSchema = mongoose.Schema({
    latitude: {
      type: String,
      required: true,
    },
    longtitude: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    comments: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    },
  });

  const Location = mongoose.model('Location', LocationSchema);

  const LastUpdateSchema = mongoose.Schema({
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  });

  const LastUpdate = mongoose.model('LastUpdate', LastUpdateSchema);

  const DataSchema = mongoose.Schema({
    temp: {
      type: String,
      required: true,
    },
    direction: {
      type: String,
      required: true,
    },
    speed: {
      type: String,
      required: true,
    },
    gust: {
      type: String,
      required: true,
    },
    humid: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },
  });

  const Data = mongoose.model('Data', DataSchema);

  const UserSchema = mongoose.Schema({
    admin: {
      type: Boolean,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    favouriteLocation: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }],
    },
  });

  const User = mongoose.model('User', UserSchema);

  // check if username is duplicated in database
  app.post('/checkUsername', (req, res) => {
    User.findOne({ username: req.body['username'] }, (err, user) => {
      if (err) res.send('cannot find user');
      else if (user) res.send({ verified: false });
      else res.send({ verified: true });
    });
  });

  // create user when all conditions are checked
  app.post('/createUser', (req, res) => {
    bcrypt.hash(req.body['password'], 5, (err, hash) => {
      if (err) console.log(err);
      else {
        User.create(
          {
            admin: false,
            username: req.body['username'],
            password: hash,
            favouriteLocation: [],
          },
          (err, user) => {
            if (err) res.status(500).set('content-type', 'text/plain').send('Error in creating user');
            else
              res
                .status(201)
                .set('content-type', 'text/plain')
                .send({ message: `User created with username ${user.username}, and password ${user.password}` });
          }
        );
      }
    })
    
  });

  // verify login input data
  app.post('/verifyLogin', (req, res) => {
    User.findOne({ username: req.body['username'] }, (err, user) => {
      if (err) console.log(err);
      else if (user === null)
        res.send({
          passwordVerified: false,
          usernameVerified: false,
        });
      else{
        bcrypt.compare(req.body['password'], user.password, (err, result) => {
          res.send({
            passwordVerified: result,
            usernameVerified: true,
            isAdmin: user.admin,
          });
        })
      }
        
    });
  });

  // submit comment
  app.post('/postComment', (req, res) => {
    Comment.create(
      { username: req.body['username'], content: req.body['content'], date: Date.now() },
      (err, newComment) => {
        if (err) console.log(err);
        else {
          // console.log(req.body['location']);
          Location.findOneAndUpdate(
            { name: req.body['location'] },
            { $push: { comments: newComment } },
            { new: true }
          ).exec((err, loc) => {
            if (err) console.log(err);
            else res.send({ success: true });
          });
        }
      }
    );
  });

  // fetch comment
  app.get('/fetchComment/:location', (req, res) => {
    Location.findOne({ name: req.params['location'] })
      .populate('comments')
      .exec((err, loc) => {
        if (err) console.log(err);
        else if (loc == null) {
          res.send('not found');
        } else {
          res.send(loc.comments);
        }
      });
  });

  //  location data CRUD
  app.post('/createLocation', (req, res) => {
    Location.create(
      {
        latitude: req.body['lat'],
        longtitude: req.body['long'],
        name: req.body['name'],
      },
      // () => res.send('Done'),
      // () => res.send('Error')
      (err, loc) => {
        if (err) res.send('Error');
        else res.send('Done');
      }
    );
  });

  // app.post('/createLocation', (req, res) => {
  //   let myData = new Location({
  //     latitude: req.body['lat'],
  //     longtitude: req.body['long'],
  //     name: req.body['name'],
  //   });

  //   myData.save(err)
  //     .then((meg) => {
  //       console.log(meg);
  //       res.send('Done');
  //     })
  // })

  app.get('/geodata', (req, res) => {
    fetch(geodata_url)
      .then((data) => data.json())
      .then((data) => res.send(data.features));
  });

  app.post('/listLocation', (req, res) => {
    Location.find({}, (err, list) => {
      if (err) console.log(err);
      else res.send(list);
    });
  });

  app.post('/findLocation', (req, res) => {
    let temp = {};
    req.body['lat'] ? (temp['latitude'] = req.body['lat']) : null;
    req.body['long'] ? (temp['longtitude'] = req.body['long']) : null;
    req.body['name'] ? (temp['name'] = req.body['name']) : null;
    Location.find(temp, (err, location) => {
      if (err) console.log(err);
      else res.send(location);
    });
  });

  app.post('/updateLat', (req, res) => {
    Location.findOneAndUpdate(
      {
        longtitude: req.body['long'],
        name: req.body['name'],
      },
      {
        latitude: req.body['lat'],
      },
      (err, location) => {
        if (err) res.send('Error');
        else if (location) res.send('Done');
        else res.send('No such record');
      }
    );
  });

  app.post('/updateLong', (req, res) => {
    Location.findOneAndUpdate(
      {
        latitude: req.body['lat'],
        name: req.body['name'],
      },
      {
        longtitude: req.body['long'],
      },
      (err, location) => {
        if (err) res.send('Error');
        else if (location) res.send('Done');
        else res.send('No such record');
      }
    );
  });

  app.post('/updateName', (req, res) => {
    Location.findOneAndUpdate(
      {
        latitude: req.body['lat'],
        longtitude: req.body['long'],
      },
      {
        name: req.body['name'],
      },
      (err, location) => {
        if (err) res.send('Error');
        else if (location) res.send('Done');
        else res.send('No such record');
      }
    );
  });

  app.post('/deleteLocation', (req, res) => {
    Location.deleteMany(
      { latitude: req.body['lat'], longtitude: req.body['long'], name: req.body['name'] },
      (err, location) => {
        if (err) res.send('Error');
        else if (location.deletedCount) res.send('done');
        else res.send('No such record');
      }
    );
  });

  // user CRUD
  app.post('/createUserAdmin', (req, res) => {
    bcrypt.hash(req.body['password'], 5, (err, hash) => {
      User.create(
        {
          admin: false,
          username: req.body['username'],
          password: hash,
        },
        (err, user) => {
          if (err) {
            console.log(err);
            res.send('Error');
          }
          else res.send('Done');
        }
      );
    })
    
  });

  app.post('/listUser', (req, res) => {
    User.find({}, (err, list) => {
      if (err) console.log(err);
      else res.send(list);
    });
  });

  app.post('/findUser', (req, res) => {
    let temp = {};
    req.body['username'] ? (temp['username'] = req.body['username']) : null;
    req.body['password'] ? (temp['password'] = req.body['password']) : null;
    temp['admin'] = false;
    // console.log(temp);
    User.find(temp, (err, user) => {
      if (err) console.log(err);
      else res.send(user);
    });
  });

  app.post('/updatePassword', (req, res) => {
    bcrypt.hash(req.body['password'], 5, (err, hash) => {
      User.findOneAndUpdate(
        {
          username: req.body['username'],
        },
        {
          password: hash,
        },
        (err, user) => {
          if (err) res.send('Error');
          else if (user) res.send('Done');
          else res.send('No such record');
        }
      );
    })
    
  });

  app.post('/deleteUser', (req, res) => {
    User.findOne({username: req.body['username']}, (err, user) => {
      if (err) console.log(err);
      else if (user === null) res.send('No such user');
      else User.deleteOne({username: req.body['username']}, (err) => {
        if (err) console.log(err);
        else res.send('Done');
      });
    })
  });

  app.post('/createAdmin', (req, res) => {
    User.create(
      {
        admin: true,
        username: 'admin',
        password: 'admin',
      },
      () => res.status(200).send('Done')
    );
  });

  // ref from : https://github.com/mholt/PapaParse/issues/440, update data on database
  app.get('/home', (req, res) => {
    let currentDate = new Date();
    // console.log(currentDate.toDateString());
    // console.log(currentDate.toLocaleTimeString('en-US'));
    // update last updated time on database
    LastUpdate.findOneAndUpdate(
      {
        __v: 0,
      },
      {
        date: currentDate.toDateString(),
        time: currentDate.toLocaleTimeString('en-US', {timeZone: 'Asia/Hong_Kong'}),
      },
      (err, update) => {
        if (err) console.log(err);
        else console.log('Done');
      }
    );
    let data = [];
    let i = 0;
    while (i < 3) {
      const parseStream = papa.parse(papa.NODE_STREAM_INPUT, { download: true });
      const dataStream = request.get(url_list[i]).pipe(parseStream);
      parseStream.on('data', (chunk) => {
        data.push(chunk);
      });
      if (i == 2) {
        dataStream.on('finish', () => {
          let i = 0;

          location_list = [];
          temp_list = new Array(49).fill('N/A');
          direction_list = new Array(49).fill('N/A');
          speed_list = new Array(49).fill('N/A');
          gust_list = new Array(49).fill('N/A');
          humid_list = new Array(49).fill('N/A');

          while (i < data.length) {
            if (data[i][0] != 'Date time' && !location_list.includes(data[i][1])) {
              location_list.push(data[i][1]);
            }
            i++;
          }
          // getting data according to the locations
          let toGet = null;
          let k = 0;
          while (k < data.length) {
            // change the target data if encounter a Date Time line
            if (data[k][0] == 'Date time') {
              if (data[k][2] == 'Air Temperature(degree Celsius)') {
                toGet = 'temp';
                k++;
              }
              if (data[k][2] == '10-Minute Mean Wind Direction(Compass points)') {
                toGet = 'wind';
                k++;
              }
              if (data[k][2] == 'Relative Humidity(percent)') {
                toGet = 'humid';
                k++;
              }
            } else {
              // toGet target data and allocate to the corresponding index
              let index = location_list.indexOf(data[k][1]);
              if (toGet == 'temp') {
                temp_list[index] = data[k][2];
              }
              if (toGet == 'wind') {
                gust_list[index] = data[k][4];
                speed_list[index] = data[k][3];
                direction_list[index] = data[k][2];
              }
              if (toGet == 'humid') {
                humid_list[index] = data[k][2];
              }
              k++;
            }
          } //endOf while

          for (var p = 0; p < location_list.length; p++) {
            Data.findOneAndUpdate(
              {
                location: location_list[p],
              },
              {
                temp: temp_list[p],
                direction: direction_list[p],
                speed: speed_list[p],
                gust: gust_list[p],
                humid: humid_list[p],
              },
              (err, location) => {
                if (err) console.log(err);
                else console.log('Done');
              }
            );
          }

          // for (var p = 0; p < location_list.length; p++){
          //   Data.create({
          //     location: location_list[p],
          //     temp: temp_list[p],
          //     direction: direction_list[p],
          //     speed: speed_list[p],
          //     gust: gust_list[p],
          //     humid: humid_list[p]
          //   }, (err, location) => {
          //     if (err) console.log("error");
          //     else console.log("Done")
          //   })
          // }
          ///////////////////////////
          res.send(data);
          i++;
        });
      }
      i++;
    }
  });

  app.get('/userhome', (req, res) => {
    Data.find({}, (err, list) => {
      if (err) console.log(err);
      else {
        LastUpdate.find({}, (err, update) => {
          if (err) console.log(err);
          else {
            let arr = [list, update];
            // console.log(arr);
            res.send(arr);
          }
        });
      }
    });
  });

  app.get('/fetchLocationDetails/:location', (req, res) => {
    let details = {};
    Data.findOne({ location: req.params['location'] }, (err, loc) => {
      if (err) console.log(err);
      else if (loc === null) console.log('null');
      else {
        details = {
          temp: loc.temp,
          direction: loc.direction,
          speed: loc.speed,
          gust: loc.gust,
          humid: loc.humid,
        };
        Location.findOne({ name: req.params['location'] }, (err, loc) => {
          if (err) console.log(err);
          else if (loc === null) res.send("location not found");
          else {
            details = { ...details, latitude: loc.latitude, longtitude: loc.longtitude };
            res.send(details);
          }
        });
      }
    });
  });

  app.get('/favLocation/:username', (req, res) => {
    User.findOne({ username: req.params['username'] })
      .populate('favouriteLocation')
      .exec((err, user) => {
        if (err) console.log(err);
        else res.send({ list: user.favouriteLocation });
      });
  });

  app.get('/addFavLocation/:location/:username', (req, res) => {
    Location.findOne({ name: req.params['location'] }, (err, loc) => {
      if (err) console.log(err);
      else {
        User.findOneAndUpdate({ username: req.params['username'] }, { $push: { favouriteLocation: loc } }, (err) => {
          if (err) console.log(err);
          else res.send({ success: true });
        });
      }
    });
  });

  app.get('/delFavLocation/:location/:username', (req, res) => {
    Location.findOne({ name: req.params['location'] }, (err, loc) => {
      if (err) console.log(err);
      else {
        User.findOneAndUpdate(
          { username: req.params['username'] },
          { $pull: { favouriteLocation: loc._id } },
          (err) => {
            if (err) console.log(err);
            else res.send({ success: true });
          }
        );
      }
    });
  });

  app.get('/checkFavLocation/:location/:username', (req, res) => {
    Location.findOne({ name: req.params['location'] }, (err, loc) => {
      if (err) console.log(err);
      else if (loc === null) res.send("No such location");
      else {
        User.findOne({ username: req.params['username'] }).exec((err, user) => {
          if (err) console.log(err);
          else if (user.favouriteLocation.includes(loc._id)) res.send({ isFavLoc: true });
          else res.send({ isFavLoc: false });
        });
      }
    });
  });
  //app.get('/*', (req, res) => res.send('Success'));
});


const server = app.listen(80, "0.0.0.0");
