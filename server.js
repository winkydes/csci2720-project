//import {usePapaParse} from 'react-papaparse'

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const papa = require("papaparse");
const request = require("request");

require('dotenv').config();

const app = express();
const uri = process.env.MONGODB_URI;
const humidity_csv_url = "https://data.weather.gov.hk/weatherAPI/hko_data/regional-weather/latest_1min_humidity.csv"
const wind_csv_url = "https://data.weather.gov.hk/weatherAPI/hko_data/regional-weather/latest_10min_wind.csv"
const air_csv_url = "https://data.weather.gov.hk/weatherAPI/hko_data/regional-weather/latest_1min_temperature.csv"
const url_list = [humidity_csv_url, air_csv_url, wind_csv_url]
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Use CORS
app.use(cors({ origin: '*' }));

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
    User.create(
      {
        admin: false,
        username: req.body['username'],
        password: req.body['password'],
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
      else
        res.send({
          passwordVerified: user.password === req.body['password'],
          usernameVerified: true,
          isAdmin: user.admin,
        });
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
      (err, loc) =>  {
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



  app.post('/listLocation', (req, res) => {
    Location.find({}, (err, list) => {
      if (err) console.log(err);
      else res.send(list);
      console.log(list);
    });
  });

  app.post('/findLocation', (req, res) => {
    let temp = {};
    req.body['lat'] ? (temp['latitude'] = req.body['lat']) : null;
    req.body['long'] ? (temp['longtitude'] = req.body['long']) : null;
    req.body['name'] ? (temp['name'] = req.body['name']) : null;

      console.log(temp);
    Location.find(
      temp , (err, location) => {
        console.log(location);
      if (err) console.log(err);
      else res.send(location);
    });
  });
  
  app.post('/updateLat', (req, res) => {
    Location.findOneAndUpdate({
      longtitude: req.body['long'],
      name: req.body['name'],
    }, {
      latitude: req.body['lat'],
    }, (err, location) => {
      if (err) res.send("Error");
      else if (location) res.send("Done");
      else res.send("No such record");
    });
  });
  
  app.post('/updateLong', (req, res) => {
    Location.findOneAndUpdate({
      latitude: req.body['lat'],
      name: req.body['name'],
    }, {
      longtitude: req.body['long'],
    }, (err, location) => {
      if (err) res.send("Error");
      else if (location) res.send("Done");
      else res.send("No such record");
    });
  });

  app.post('/updateName', (req, res) => {
    Location.findOneAndUpdate({
      latitude: req.body['lat'],
      longtitude: req.body['long'],
    }, {
      name: req.body['name'],
    }, (err, location) => {
      if (err) res.send("Error");
      else if (location) res.send("Done");
      else res.send("No such record");
    });
  });

  app.post('/deleteLocation', (req, res) => {
    Location.deleteMany({ latitude: req.body['lat'], longtitude: req.body['long'], name: req.body['name'], }, (err, location) => {
      if (err) res.send("Error");
      else if (location.deletedCount) res.send('done');
      else res.send('No such record');
    });
  });

  // user CRUD
  app.post('/createUserAdmin', (req, res) => {
    User.create(
      {
        admin: false,
        username: req.body['username'],
        password: req.body['password'],
      }, (err, user) => {
        if (err) res.send('Error');
        else res.send('Done');
      });
  });


  app.post('/listUser', (req, res) => {
    User.find({}, (err, list) => {
      if (err) console.log(err);
      else res.send(list);
    });
  });

  app.post('/findUser', (req, res) => {
    console.log('hi')
    let temp = {};
    req.body['username'] ? (temp['username'] = req.body['username']) : null;
    req.body['password'] ? (temp['password'] = req.body['password']) : null;
    temp['admin'] = false;
    console.log(temp);
    User.find(temp, (err, user) => {
      console.log(user);
      if (err) console.log(err);
      else res.send(user);
    });
  });

  app.post('/updatePassword', (req, res) => {
    User.findOneAndUpdate({
      username: req.body['username'],
    }, {
      password: req.body['password'],
    } , (err, user) => {
      console.log(user);
      if (err) res.send("Error");
      else if (user) res.send("Done");
      else res.send("No such record");
    });
  });

  app.post('/deleteUser', (req, res) => {
    User.deleteMany({ username: req.body['username'], password: req.body['password'], }, (err, user) => {
      if (err) res.send("Error");
      else if (user.deletedCount) res.send('done');
      else res.send('No such record');
    });
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

  // ref from : https://github.com/mholt/PapaParse/issues/440
  app.get('/home',(req, res) => {
    let data = [];
    let i = 0
    while (i<3){
    const parseStream = papa.parse(papa.NODE_STREAM_INPUT,{download: true,})
    const dataStream = request
      .get(url_list[i])
      .pipe(parseStream);
    parseStream.on("data", chunk => {
        data.push(chunk);
    });
    if (i == 2){
      dataStream.on("finish", () => {
      console.log(data);
      console.log(data.length);
      // make sure that all data is obtained correctly (not sure why sometimes not getting all data if used i == 2 )
      if (data.length==92){
        res.send(data)
      }
      i++;
      })
      }
    i++;
    }

  
    //res.send(data)
  })
  //app.get('/*', (req, res) => res.send('Success'));
});



const server = app.listen(80);
