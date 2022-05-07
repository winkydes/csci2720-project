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
        });
    });
  });

  app.get('/listUser', (req, res) => {
    User.find({}, (err, list) => {
      if (err) console.log(err);
      else res.send(list);
    });
  });

  app.get('/deleteAllUSer', (req, res) => {
    User.deleteMany({}, (err) => {
      if (err) console.log(err);
      else res.send('done');
    });
  });

  app.get('/createAdmin', (req, res) => {
    User.create(
      {
        admin: true,
        username: 'admin',
        password: 'admin',
      },
      () => res.send('Done')
    );
  });

  // ref from : https://github.com/mholt/PapaParse/issues/440
  app.get('/home',(req, res) => {
    const parseStream = papa.parse(papa.NODE_STREAM_INPUT,{download: true,})
    const dataStream = request
      .get(humidity_csv_url)
      .pipe(parseStream);
    let data = [];
    parseStream.on("data", chunk => {
        data.push(chunk);
    });
    
    dataStream.on("finish", () => {
        console.log(data);
        console.log(data.length);
    });
    res.send(data)
  })
  //app.get('/*', (req, res) => res.send('Success'));
});

const server = app.listen(80);
