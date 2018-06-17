"use strict";
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

/*=====================================================
QuoteSchema contains the relevant data, returned from
the favqs API. only one copy kept in DB
=======================================================*/

//design the two schema below and use sub docs 
//to define the relationship between posts and comments


let QuotesSchema = new Schema({
    text: String,
    author: String,
    api_id: String,
    api_tags: [String]
});


let Quote = mongoose.model('quote', QuotesSchema);
module.exports = Quote;