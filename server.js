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
/* 1) Signup/Login                                     */
app.post('/saysWho/login', (req, res) => {
    User.findOne({ $or: [{ name: req.body.name }, { email: req.body.email }] })
        .populate('quotes.quote')
        .exec((err, user) => {
            if (err) {
                throw err;
            }
            if (user !== null) {
                // user already exists - return it
                res.send(user);
            } else {
                // User doesn't exist yet - create it
                let newUser = new User({
                    name: req.body.name,
                    password: req.body.password,
                    email: req.body.email,
                    quotes: []
                });
                newUser.save((err, user) => {
                    if (err) {
                        throw err;
                    }
                    res.send(user);
                });
            }
        })
});
          /* 2) Save a quote         quote_note:note,
        user_tag:myTags                       */
        


        
     app.post('/save_quote', (req, res) => {
          let apiId=req.body.quote_id;
        //    let apiId="417"
           let userId=req.body.user;
          let myTags=req.body.user_tag;
     Quote.findOne({api_id:apiId}, function (err,dataQuote) {
        if (err) {
            res.send(err);
            return console.error(err);
          }
        if(dataQuote==null)//if new
        {
            console.log("new qoute")
             Quote.create({
             text: req.body.quote_text,
             author: req.body.quote_author,
             api_id: req.body.quote_id,
             api_tags: req.body.quote_tags
           }, (err, Result) => {
             if (err) throw err;
             User.findById(userId).populate('quotes.quote').exec(function (err, _user) {
             let new_quote={
                 quote:Result.id,
                 notes:req.body.user_note,
                 tags:req.body.user_tag
             }
              var temp=_user.quotes;
                 temp.push(new_quote)
                 _user.quotes=temp;

                   _user.save();
                   
                //    res.send(_user.quotes[_user.quotes.length-1]);
              
                   });
                   User.findById(userId).populate('quotes.quote').exec(function (err, _user) {
                    res.send(_user.quotes[_user.quotes.length-1]);
                   });
               
           });
           
        }
        else    //if Exists
        {
         console.log("Exists")
      User.findById(userId).populate('quotes.quote').exec(function (err, _user) {
          let flag=true;
      for(let i=0;i<_user.quotes.length;i++)
      {
          if(dataQuote.id==_user.quotes[i].quote.id) //if quote  is  Exists in user 
          {
            console.log(_user.quotes[i].quote.id);
            console.log(dataQuote.id);
            if(req.body.user_tag[0]!="") {
                let temp=_user.quotes[i].tags;
                    temp.push(req.body.user_tag[0]);
                    _user.quotes[i].tags=temp;
                    console.log("new tag") ;
            }
            if(req.body.user_note[0]!="") {
                let temp=_user.quotes[i].notes;
                    temp.push(req.body.user_note[0]);
                    _user.quotes[i].notes=temp;
                    console.log("new note") ;
            }
            res.send(_user.quotes[i]);
            flag=false;

          }
      }
             if(flag)
         {  
             let new_quote={
              quote:dataQuote.id,
              notes:req.body.user_note,
              tags:req.body.user_tag,
            }
          let temp=_user.quotes;
              temp.push(new_quote)
              _user.quotes=temp;
              
              _user.save();
            //   res.send(_user.quotes[_user.quotes.length-1]);
            User.findById(userId).populate('quotes.quote').exec(function (err, _user) {
                res.send(_user.quotes[_user.quotes.length-1]);
               });
            }

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

