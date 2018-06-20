"use strict";
/*=====================================================
Our Setup - 
we are going to send requests to favqs (Fav Quotes) API 
so we need a bit more than usual!
=======================================================*/
let bodyParser = require('body-parser');
let express = require('express');
let mongoose = require('mongoose');
let ObjectID = require('mongodb').ObjectID;
mongoose.Promise = global.Promise;

/*=====================================================
Connect to MongoDB and check the connection
=======================================================*/
// let myConnection = process.env.CONNECTION_STRING || 'mongodb://localhost/saysWhoDB'
// mongoose.connect(myConnection, { useMongoClient: true })
//     .then(() => { console.log('DB connection established!'); })
//     .catch((error) => console.error(error));


/*=====================================================
MongoDB schema models
=======================================================*/
let Quote = require('./models/QuoteModel');
// let User = require('./models/UserModel');

/*=====================================================
Express setup
=======================================================*/
let app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/*=====================================================
Here we need to create the different server routes
These will define your API:
=======================================================*/
/* 1) Get user's quotes and their related data         */
// app.get('/posts', (req, res) => {
//   Post.find({}, (err, postResult) => {
//     if (err) throw err;
//     res.send(postResult);
//   });
// });

/* 2) Save a quote                                     */
// app.post('/posts', (req, res) => {
//   Post.create({
//     title: req.body.title,
//     text: req.body.text,
//     username: req.body.username,
//     time: req.body.time,
//     comments: []
//   }, (err, postResult) => {
//     if (err) throw err;
//     res.send(postResult);
//   });
// });

/* 3) Delete a quote                                   */
// app.delete('/posts/:id', (req, res) => {
//   var id = req.params.id;
//   // Check if the ID is a valid mongoose id
//   if (!ObjectID.isValid(id)) {
//     return res.status(400).send('Id not in the correct format');
//   }
//   // delete the post from the DB collection
//   Post.findByIdAndRemove(id, (err, deletedPost) => {
//     if (err) throw err;
//     res.json(deletedPost);
//   });
// });

/* 4) Add tag(s) to an existing quote                  */
// app.post('/posts/:id/comments', (req, res) => {
//     var id = req.params.id;
//     // Check if the ID is a valid mongoose id
//     if (!ObjectID.isValid(id)) {
//         return res.status(400).send('Id not in the correct format');
//     }
//     // update the comments array in the DB
//     Post.findByIdAndUpdate(id, { $push: { comments: req.body } }, { new: true }, (err, updatedPost) => {
//         if (err) throw err;
//         res.send(updatedPost);
//     });
// });

/* 5) Add note to an existing quote                    */

/* 5) Update note to an existing quote                 */
// app.put('/posts/:postId', (req, res) => {
//     var id = req.params.postId;
//     // Check if the ID is a valid mongoose id
//     if (!ObjectID.isValid(id)) {
//         return res.status(400).send('Id not in the correct format');
//     }
//     // update the post in the DB collection
//     Post.findByIdAndUpdate(id, { $set: { text: req.body.text } }, { new: true }, (err, updatedPost) => {
//         if (err) throw err;
//         console.log(updatedPost);
//         res.json(updatedPost);
//     });
// });



/*=====================================================
PORT
=======================================================*/
const SERVER_PORT = process.env.PORT || 8080;
app.listen(SERVER_PORT, () => console.log(`Server up and running on port ${SERVER_PORT}...`));


//