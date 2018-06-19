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
const APP_USER_LOGIN = "taltal.haker@gmail.com";
const APP_USER_PWD = "TelAviv62";
const APP_API_URL = 'https://favqs.com/api/';
class QuotesRepository {
    constructor() {
        this.quotes = [];
        this.user = {
             name: "",
             email: "",
             password: "",
             id:"5b2830a0c467cf187457a874"
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
        //         "user": {
        //             "login": APP_USER_LOGIN,
        //             "password": APP_USER_PWD
        //         }
        //     },
        //     success: function(data) {
        //         //                    self.sessionToken = data.User - Token);
        //         console.log('session token = ' + data);

        //     }
        // });


        this.getUserQuotes();
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
//   author = /?filter=Mark+Twain&type=author
    getQuotes() {

        let self = this;
        $.ajax({
            url: APP_API_URL + 'quotes',
            headers: {
                'Authorization': 'Token token=' + this.sessionToken,
                'Authorization': 'Token token=' + APP_API_TOKEN,
                'Content-Type': 'application/json'
            },
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                self.returnedQuotes = data.quotes;
                console.log('succes: ' + self.returnedQuotes);
            }
        });

    }


    // request all the posts from the DB
    getUserQuotes() {
        // return $.ajax({
        //     method: 'Get',
        //     url: 'inspiration',
        //     success: (inspiration) => {
        //         // add the quotes
        //         this.quotes = inspirtion.quotes;
        //         this.users = inspirtion.users;
        //     },
        //     error: function(jqXHR, textStatus, errorThrown) {
        //         console.log(textStatus);
        //     }
        // });
    }

    saveQuote(quoteBody,quoteId, tags, author) {
        let self = this;

        /*
            text: String,
            author: String,
            api_id: String,
            api_tags: [String]
        */ 
       let newQuote={
        quote_text:quoteBody,
        quote_id: quoteId,
        quote_tags: tags[0],
        quote_author: author,
        user_id: self.user.id
       }
       
        return $.ajax({
            method: 'POST',
            url: 'quotes',
            data: newQuote,
            dataType: 'json',
            success: (data_Quote) => {
                // Push quote if not already in array
                debugger
                self.quotes.push(data_Quote);
                console.log("add qoute")

            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
        // this.quotesUser.push({ quote: quoteId, tags: [], notes: myNotes });

    }
    NextOrPreviousQuote(index) {
    let quote= this.returnedQuotes[index].body;
    
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