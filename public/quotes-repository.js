"use strict";
/*=====================================================
Our Setup - 
we are going to send requests to favqs (Fav Quotes) API 
so we need a bit more than usual!
=======================================================*/
/**
 * Class responsible for storing and manipulating quotes and user data, in-memory
 */
const APP_API_TOKEN = "effa3280e38d5dbf9b31ea6aca416fd1";
const APP_USER_EMAIL = "taltal.haker@gmail.com";
const APP_USER_LOGIN = "talhaker@gmail.com";
const APP_USER_PWD = "TelAviv62";
const APP_API_URL = 'https://favqs.com/api/';
class QuotesRepository {
    constructor() {
        this.user = {
            id: "",
            name: "",
            email: "",
            password: "",
            quotes: []
                // quotes: [],
                // name: "",
                // email: "",
                // password: "",
                // id: "5b296b53571da13b783101f0" >>>
        };
        this.returnedQuotes = [];
        /* 
                POST /api/session HTTP/1.1
                Host: favqs.com
                Content-Type: application/json
                Authorization: Token token="effa3280e38d5dbf9b31ea6aca416fd1"
                Cache-Control: no-cache
                Postman-Token: 0d372af7-e66a-9dfe-d10a-529512b7dd40
                { 
                  "user": {
                    "login": "taltal.haker@gmail.com",
                    "password": "TelAviv62"
                  }
                }        
        */


        this.sessionToken = "3miH8uYml17fD/Ie7Ry+YbntH7C5/Dw42a66kXCu9IGnkRp287zHYVxcE4SJy55l0UdBNxuj/dzkTpt19gKDwQ==";
        // let self = this;
        // $.ajax({
        //     url: APP_API_URL + 'session',
        //     headers: {
        //         'Authorization': 'Token token=' + APP_API_TOKEN,
        //         'Content-Type': 'application/json'
        //     },
        //     method: 'POST',
        //     dataType: 'json',
        //     data: {
        //         user: {
        //             login: APP_USER_LOGIN,
        //             password: APP_USER_PWD
        //         }
        //     },
        //     success: function(data) {
        //         //                    self.sessionToken = data.User - Token);
        //         console.log('session token = ' + data);

        //     },
        //     error: function(jqXHR, textStatus, errorThrown) {
        //         console.log(textStatus);
        //     }
        // });
    }

    /*
    GET /api/quotes HTTP/1.1
    Host: favqs.com
    User-Token: "EDt2V1TBumIGR/tOeCbotEQ6FQSIi3rEFlj/WfumSth2vBCjtVfdkMKvxnl2sbXQfXLHOZdSD3s2mzX6aJGU4g=="
    Authorization: Token token="effa3280e38d5dbf9b31ea6aca416fd1"
    Content-Type: application/json
    Cache-Control: no-cache
    Postman-Token: be99f101-4f82-d8b0-0dda-6dc4b61213cc
    */

    //// tag = /?filter=funny&type=tag
    ///       "/?filter=funny&type=tag"
    //   author = /?filter=Mark+Twain&type=author
    getQuotes(toFind) {

        let self = this;
        $.ajax({
            url: APP_API_URL + 'quotes' + toFind,
            headers: {
                'Authorization': 'Token token=' + APP_API_TOKEN,
                'User-Token': this.sessionToken,
                'Content-Type': 'application/json'
            },
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                self.returnedQuotes = data.quotes;
                $('#QuoteText').text(data.quotes[0].body);
                console.log('succes: ' + self.returnedQuotes);
                console.log('succes: ');
                for (let i = 0; i < data.quotes.length; i++) {
                    console.log(self.returnedQuotes[i].author + ' :  ' + self.returnedQuotes[i].body);
                    console.log(self.returnedQuotes[i].id + ' :  ' + self.returnedQuotes[i].tags);
                }
            }
        });

    }

    // Login
    userLogin(name, email, password) {
        let self = this;
        return $.ajax({
            method: 'POST',
            url: 'login',
            data: {
                name: name,
                email: email,
                password: password
            },
            dataType: 'json',
            success: (data) => {
                // Update user parameters
                self.user = {
                    id: data._id,
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    quotes: data.quotes
                };

                console.log(self.user);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('userLogin(): ' + textStatus);
            }
        });
    }

    // request all the posts from the DB
    getUserQuotes() {
        // return $.ajax({
        //     method: 'GET',
        //     url: 'book',
        //     data: { Id: this.user.id },
        //     dataType: 'json',
        //     success: (quotes) => {
        //         // add the quotes
        //         this.user.quotes = quotes;
        //     },
        //     error: function(jqXHR, textStatus, errorThrown) {
        //         console.log(textStatus);
        //     }
        // });
    }

    saveQuote(quoteBody, quoteId, tags, author, note, myTags) {
        debugger
        let self = this;
        let newQuote = {
            quote_text: quoteBody,
            quote_id: quoteId,
            quote_tags: tags,
            quote_author: author,
            user: self.user.id,
            user_note: note,
            user_tag: myTags
        }

        return $.ajax({
            method: 'POST',
            url: 'save_quote',
            data: newQuote,
            dataType: 'json',
            success: (data_Quote) => {
                // Push quote if not already in array

                self.user.quotes.push(data_Quote);
                console.log("add qoute")

            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
        // this.quotesUser.push({ quote: quoteId, tags: [], notes: myNotes });

    }
    NextOrPreviousQuote(index) {
        let quote = this.returnedQuotes[index].body;

        $('#QuoteText').text(quote);
    }
    addTags(quoteId, tags) {

    }

    removeTag(quoteId, tag) {

    }

    addNote(quoteId, note) {

    }

    removeNote(quoteId, noteId) {

    }

}

export default QuotesRepository;