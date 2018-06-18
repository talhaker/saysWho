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
MongoDB schema models
=======================================================*/
let Quote = require('./models/QuoteModel');
let User = require('./models/UserModel');

/*=====================================================
Connect to MongoDB and check the connection
=======================================================*/
//let myConnection = process.env.CONNECTION_STRING || 'mongodb://localhost/saysWhoDB'
let myConnection = 'mongodb://localhost/saysWhoDB'
mongoose.connect(myConnection, { useMongoClient: true })
    .then(() => {
        console.log('DB connection established!');
        // Only generate dummy data on the first time
        generateDummyData();
    })
    .catch((error) => console.error(error));


/*=====================================================
Express setup
=======================================================*/
let app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Dummy data to populate the database

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



/*=====================================================
Here we need to create the different server routes
These will define your API:
=======================================================*/
/* 1) Signup/Login                                     */
app.post('/login', (req, res) => {
    User.find({ $or: [{ name: request.body.name }, { email: request.body.email }] }, (err, users) => {
        if (err) throw err;
        if (users.length > 0) {
            // user already exists - return it
            res.send(users[0]);
        }
        // User doesn't exist yet - create it
        let user = new User({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email
        });
        user.save((err, user) => {
            if (err) throw err;
            res.send(user);
        });
    })
});

/* 2) Get user's quotes and their related data         */
// app.get('/posts', (req, res) => {
//   Post.find({}, (err, postResult) => {
//     if (err) throw err;
//     res.send(postResult);
//   });
// });

/* 3) Save a quote                                     */
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

/* 4) Delete a quote                                   */
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

/* 5) Add tag(s) to an existing quote                  */
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

/* 6) Add note to an existing quote                    */

/* 7) Update note to an existing quote                 */
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