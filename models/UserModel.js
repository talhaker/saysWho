"use strict";
var mongoose = require('mongoose');

/*=====================================================
QuoteItemSchema contains the user-specific data, related
to the quote. It is a sub-doc of the UserSchema
=======================================================*/
let QuoteItemSchema = new mongoose.Schema({
    quote: [{ type: Schema.Types.ObjectId, ref: "quote" }],
    tags: [String],
    notes: [String]
});

/*=====================================================
UserSchema contains the user's data, including user's
collection of inspirational quotes
=======================================================*/
let UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    quotes: [QuoteItemSchema]
});


let User = mongoose.model('user', UserSchema);

module.exports = User;