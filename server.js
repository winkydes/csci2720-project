const { type } = require("@testing-library/user-event/dist/type");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/new');
const db = mongoose.connection;

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

});
app.get('/*', (req,res) => res.send("Success"));
const server = app.listen(80);
