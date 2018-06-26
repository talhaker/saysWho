"use strict";
/*=====================================================
Our Setup - 
we are going to send requests to favqs (Fav Quotes) API 
so we need a bit more than usual!
=======================================================*/
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
mongoose.Promise = global.Promise;

/*=====================================================
MongoDB schema models
=======================================================*/
let Quote = require('./models/QuoteModel');
let User = require('./models/UserModel');

/*=====================================================
Connect to MongoDB and check the connection
=======================================================*/

/*=====================================================
Express & express handlebars setup
=======================================================*/
let app = express();
//app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
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


/* 2) Save quote to user's book                    */
app.post('/saysWho/quote/save', (req, res) => {
    let apiId = req.body.quote_id;
    let userId = req.body.user;
    let myTags = req.body.user_tag;
    Quote.findOne({ api_id: apiId }, function(err, dataQuote) {
        if (err) {
            res.send(err);
            return console.error(err);
        }
        if (dataQuote == null) //if new quote in db   is new in user
        {
            Quote.create({
                text: req.body.quote_text,
                author: req.body.quote_author,
                api_id: req.body.quote_id,
                api_tags: req.body.quote_tags
            }, (err, Result) => {
                if (err) throw err;
                User.findById(userId).populate('quotes.quote').exec(function(err, _user) {
                    let new_quote = {
                        quote: Result.id,
                        notes: req.body.user_note,
                        tags: req.body.user_tag
                    }
                    var temp = _user.quotes;
                    temp.push(new_quote)
                    _user.quotes = temp;

                    _user.save(function(err, seveED) {
                        User.findById(userId).populate('quotes.quote').exec(function(err, _user) {
                            console.log(_user);
                            res.send(_user); // vvvvvvvvv if new quote in db   is new in user
                        });
                    });


                });
            });

        } else { //if Exists
            console.log("Exists")
            User.findById(userId).populate('quotes.quote').exec(function(err, _user) {
                let flag = true;
                for (let i = 0; i < _user.quotes.length; i++) {
                    if (dataQuote.id == _user.quotes[i].quote.id) //if quote  is  Exists in user  /  edit quote
                    {
                        console.log(_user.quotes[i].quote.id);
                        console.log(dataQuote.id);
                        if (req.body.user_tag[0] != "") {
                            let temp = _user.quotes[i].tags;
                            temp.push(req.body.user_tag[0]);
                            _user.quotes[i].tags = temp;
                            console.log("new tag");
                        }
                        if (req.body.user_note[0] != "") {
                            let temp = _user.quotes[i].notes;
                            temp.push(req.body.user_note[0]);
                            _user.quotes[i].notes = temp;
                            console.log("new note");
                        }
                        res.send(_user); /// מחזיר 1
                        flag = false;

                    }
                }
                if (flag) {
                    let new_quote = {
                        quote: dataQuote.id,
                        notes: req.body.user_note,
                        tags: req.body.user_tag,
                    }
                    let temp = _user.quotes;
                    temp.push(new_quote)
                    _user.quotes = temp;

                    _user.save(function(err, seveED) {
                        User.findById(userId).populate('quotes.quote').exec(function(err, _user) {
                            console.log(_user);
                            res.send(_user); ///     / new in user
                        });
                    });
                }

            });
        }

    })
});


/* 3) Delete a quote from user's book                */
app.post('/saysWho/quote/remove', (req, res) => {

    let userId = req.body.userId;
    let quoteId = req.body.quoteId;
    //{"quotes.id" : "5b2c24e88d61973478a2d5f2"}
    User.findById(userId).exec(function(err, _user) {
        console.log(_user)
        for (let i = 0; _user.quotes.length > i; i++) {
            console.log(_user.quotes[i]._id)
            if (_user.quotes[i]._id == quoteId) {
                _user.quotes[i].remove();
                _user.save();
            }
        }
    });

})


/* 4) Add a tag and/or note to an existing quote     */
app.post('/saysWho/tagsAndNote/edit', (req, res) => {
    console.log("stop")
    console.log(req.body.myQuote.tags)
    console.log(req.body.myQuote.notes)

    let userId = req.body.userId;
    let quoteId = req.body.myQuote._id;
    User.findById(userId).exec(function(err, _user) {
        for (let i = 0; _user.quotes.length > i; i++) {
            if (_user.quotes[i]._id == quoteId) {
                _user.quotes[i] = req.body.myQuote;
                res.send(_user.quotes[i]);
            }
        }
    });

})

/*=====================================================
PORT
=======================================================*/




    ////////////////////////////////////////
    app.listen(process.env.PORT || '8080');
    mongoose.connect(process.env.CONNECTION_STRING||'mongodb://localhost/saysWhoDB');



    ////////////////////////////////
//     let myConnection = process.env.CONNECTION_STRING || 'mongodb://localhost/saysWhoDB'
// //let myConnection = 'mongodb://localhost/saysWhoDB'
// mongoose.connect(myConnection, { useMongoClient: true })
//     .then(() => {
//         console.log('DB connection established!');
//         // Only generate dummy data on the first time
//         //generateDummyData();
//     })
//     .catch((error) => console.error(error));

// const SERVER_PORT = process.env.PORT || 8080;
// app.listen(SERVER_PORT, () => console.log(`Server up and running on port ${SERVER_PORT}...`));



/*=====================================================
== Dummy data to populate the database
== Function should only be called once
=======================================================*/
let generateDummyData = () => {
    let quote1 = new Quote({
        text: "Man always dies before he is fully born.",
        author: "Erich Fromm",
        api_id: "13560",
        api_tags: ["death"]
    });

    let quote2 = new Quote({
        text: "I forgot to shake hands and be friendly. It was an important lesson about leadership.",
        author: "Lee Iacocca",
        api_id: "36327",
        api_tags: ["leadership"]
    });

    let quote3 = new Quote({
        text: "We hire people who want to make the best things in the world.",
        author: "Steve Jobs",
        api_id: "6937",
        api_tags: ["best"]
    });

    let quote4 = new Quote({
        text: "Only he is successful in his business who makes that pursuit which affords him the highest pleasure sustain him.",
        author: "Henry David Thoreau",
        api_id: "8000",
        api_tags: ["business"]
    });

    let quote5 = new Quote({
        text: "I think you can have 10,000 explanations for failure, but no good explanation for success.",
        author: "Paulo Coelho",
        api_id: "18213",
        api_tags: ["failure", "good", "success"]
    });

    let quote6 = new Quote({
        text: "To raise new questions, new possibilities, to regard old problems from a new angle, requires creative imagination and marks real advance in science.",
        author: "Albert Einstein",
        api_id: "34163",
        api_tags: ["imagination", "science"]
    });

    let quote7 = new Quote({
        text: "Well, I think that there's a very thin dividing line between success and failure. And I think if you start a business without financial backing, you're likely to go the wrong side of that dividing line.",
        author: "Richard Branson",
        api_id: "8392",
        api_tags: ["business", "failure", "success"]
    });

    let quote8 = new Quote({
        text: "My eyesight is not nearly as good. My hearing is probably going away. My memory is slipping too. But I'm still around.",
        author: "John Wooden",
        api_id: "27701",
        api_tags: ["good"]
    });

    let quote9 = new Quote({
        text: "A work of art is the unique result of a unique temperament.",
        author: "Oscar Wilde",
        api_id: "4326",
        api_tags: ["art", "work"]
    });

    let quote10 = new Quote({
        text: "There are a number of things wrong with Washington. One of them is that everyone is too far from home.",
        author: "Dwight D. Eisenhower",
        api_id: "32262",
        api_tags: ["home"]
    });

    quote1.save();
    quote2.save();
    quote3.save();
    quote4.save();
    quote5.save();
    quote6.save();
    quote7.save();
    quote8.save();
    quote9.save();
    quote10.save();

    let user1 = new User({
        name: "Rachel",
        password: "rachelTaz",
        email: "racheltaz@gmail.com",
        quotes: [{
                quote: quote1,
                tags: ["life", "grief"],
                notes: ["That's deep..."]
            },
            {
                quote: quote7,
                tags: ["clever"],
                notes: ["Worth thinking about"]
            },
            {
                quote: quote8,
                tags: ["oldage"],
                notes: []
            },
            {
                quote: quote6,
                tags: [],
                notes: ["Einstein, a philosopher as well..."]
            }
        ]
    });

    let user2 = new User({
        name: "Meir",
        password: "MeirSib",
        email: "66meir46@gmail.com",
        quotes: [{
                quote: quote2,
                tags: ["smile"],
                notes: ["Street smart"]
            },
            {
                quote: quote3,
                tags: ["ambition"],
                notes: []
            },
            {
                quote: quote6,
                tags: ["genious"],
                notes: ["Wish I could think like him"]
            }
        ]
    });

    user1.save();
    user2.save();

    console.log('Dummy data generated!');
}