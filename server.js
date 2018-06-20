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
let path = require('path');
mongoose.Promise = global.Promise;

/*=====================================================
Connect to MongoDB and check the connection
=======================================================*/
let myConnection = process.env.CONNECTION_STRING || 'mongodb://localhost/saysWhoDB'
mongoose.connect(myConnection, { useMongoClient: true })
    .then(() => { console.log('DB connection established!'); })
    .catch((error) => console.error(error));


/*=====================================================
MongoDB schema models
=======================================================*/
let Quote = require('./models/QuoteModel');
let User = require('./models/UserModel');

/*=====================================================
Express setup
=======================================================*/
let app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));


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

          /* 2) Save a quote         quote_note:note,
        user_tag:myTags                       */
        
app.post('/save_quote', (req, res) => {
    let apiId=req.body.quote_id;
    let userId=req.body.user;
    let myTags=req.body.user_tag;


     Quote.find({api_id:apiId}, function (err, dataQuote) {
     
        console.log( "meir  "+dataQuote)
        console.log( "aaaaaaaaaaaaaaaaaaaaa")
        if(dataQuote.length===0)//if new
        {
            console.log("new qoute")
             Quote.create({
             text: req.body.quote_text,
             author: req.body.quote_author,
             api_id: req.body.quote_id,
             api_tags: req.body.quote_tags
           }, (err, Result) => {
             if (err) throw err;
                 User.findById(userId, function (err, _user) {
             let new_quote={
                 quote:Result.id,
                 notes:req.body.user_note,
                 tags:myTags
             }
             var temp=_user.quotes;
                 temp.push(new_quote)
                 _user.quotes=temp;
                 console.log("quote  "+Result.id) 
                 console.log("user  "+_user.id)
                 _user.save();
                 res.send(User);
               
                   });
 
           });
           
        }
        else    //if Exists
        {
         console.log("Exists")
              User.findById(userId, function (err, _user) {
          let new_quote={
              quote:dataQuote[0]._id,
              notes:req.body.user_note,
              tags:dataQuote[0].api_tags
                 }

          let temp=new_quote.tags;
              temp.push(req.body.user_tag[0])
              _user.quotes.tags=temp

           var temp1=_user.quotes;
              temp1.push(new_quote)
              _user.quotes=temp1;
              
              console.log("quote  "+dataQuote[0]._id) 
              console.log("user  "+_user.id)
              _user.save();
              res.send(new_quote);

                  });
        }

   })
});



//get qoute from user
app.post('/quotes1', function (req, res) {
    User.
    findOne({ name: "myName" }).
    populate(). // 
    exec(function (err, user) {
      if (err) return handleError(err);
  
      console.log('The user ', user);

    });
    res.send('Hello World!');
  });




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

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public', 'index.html'));
// })


/*=====================================================
PORT
=======================================================*/
const SERVER_PORT = process.env.PORT || 8080;
app.listen(SERVER_PORT, () => console.log(`Server up and running on port ${SERVER_PORT}...`));

