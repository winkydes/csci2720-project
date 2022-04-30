const cors = require('cors');
const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();
const uri = process.env.MONGODB_URI;

// Use CORS
app.use(cors({ origin: '*' }));

// Connection
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

//Upon connection failure
db.on('error', console.error.bind(console,'Connection error:'));

db.once('open', function() {
    console.log("Connection is open...");

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
            type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
        }
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
        },
        password: {
            type: String,
            required: true,
        },
        favouriteLocation: {
           type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Location'}], 
        },
    });

    const User = mongoose.model('User', UserSchema);

    app.get('/*', (req,res) => res.send("Success"));

});
const server = app.listen(80);
