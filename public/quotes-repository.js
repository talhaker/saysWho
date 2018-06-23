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
        let $name = "";
        let $email = "";
        let $password = "";
        this.user = {
            id: "",
            name: "",
            email: "",
            password: "",
            // id: "5b2a0be50b67f359bc2bf5c9",
            // name: "Rachel",
            // email: "racheltaz@gmail.com",
            // password: "rachelTaz",
            quotes: []
                // quotes: [],
                // name: "",
                // email: "",
                // password: "",
                // id: "5b296b53571da13b783101f0" >>>
        };
        this.returnedQuotes = [];
        this.numOfQuotes = 0;
        this.quoteIndex = 0;
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
    getQuotes(toFind) {

        let self = this;
        $.ajax({
            url: APP_API_URL + 'quotes' + toFind,
            headers: {
                'Authorization': 'Token token=' + this.sessionToken,
                'Authorization': 'Token token=' + APP_API_TOKEN,
                'Content-Type': 'application/json'
            },
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                // self.returnedQuotes = data.quotes;
                self.returnedQuotes = [];
                data.quotes.forEach((quote) => {
                    self.returnedQuotes.push({
                        api_tags: quote.tags,
                        api_d: quote.id,
                        text: quote.body,
                        author: quote.author
                    });
                });

                $('#quoteText').text(self.returnedQuotes[0].text);
                $('#author').text(self.returnedQuotes[0].author);
                $("#quoteIx").text('Quote 1 of ' + self.returnedQuotes.length);
                console.log('succes: ' + self.returnedQuotes);
            }
        });
    }


    // Login
    userLogin(name, email, password) {
        let self = this;
        return $.ajax({
            method: 'POST',
            url: '/saysWho/login',
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
                $('#userName').val("");
                $('#userEmail').val("");
                $('#userPass').val("");

                localStorage.setItem("UserName", self.user.name);
                localStorage.setItem("UserEmail", self.user.email);
                localStorage.setItem("UserPass", self.user.password);
                localStorage.setItem("login", true);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('userLogin(): ' + textStatus);
            }
        });
    }


    // request all the posts from the DB
    getUserQuotes() {
        $('#quoteText').text(this.user.quotes[0].quote.text);
        $('#author').text(this.user.quotes[0].quote.author);
        $("#quoteIx").text('Quote 1 of ' + this.user.quotes.length);

        this.numOfQuotes = this.user.quotes.length;
        this.quoteIndex = 0;

        console.log('succes: ' + this.user.quotes);
    }

    //saveQuote
    saveQuote(quoteBody, quoteId, tags, author, note, myTags) {
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
            url: '/saysWho/quote/save',
            data: newQuote,
            dataType: 'json',
            success: (quotes) => {
                self.user.quotes = quotes;
                // let myindex = self.user.quotes.length;
                // for (let i = 0; i < self.user.quotes.length; i++) {
                //     if (self.user.quotes[i].api_d == newQuote.quote_id)
                //         myindex = i;

                // }
                // self.user.quotes[myindex] = data_Quote;
                $('#note').val("");
                $('#tag').val("");
                $('#modalSave').modal('toggle');
                console.log("add qoute")

            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
    }

    NextOrPreviousQuote(index) {
        $('#quoteText').text(this.returnedQuotes[index].text);
        $('#author').text(this.returnedQuotes[index].author);
        $('#quoteIx').text("Quote " + (index + 1) + " of " + this.returnedQuotes.length);
    }

    NextOrPreviousQuoteBook(index) {
        $('#quoteText-book').text(this.user.quotes[index].quote.text);
        $('#author-book').text(this.user.quotes[index].quote.author);
        $('#quoteIx-book').text("Quote " + (index + 1) + " of " + this.user.quotes.length);
    }

    EditTagsAndNote(myQuote) {
        self = this;
        let infoQuote = {
            myQuote: myQuote,
            userId: this.user.id
        }

        $.ajax({
            method: 'POST',
            url: '/saysWho/tagsAndNote/edit',
            data: infoQuote,
            dataType: 'json',
            success: (data_Quote) => {
                debugger
                console.log(data_Quote)

                // self.user.quotes[myindex] = data_Quote;
                // $('#note').val("");
                // $('#tag').val("");
                // $('#modalSave').modal('toggle');
                // console.log("add qoute")

            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });

    }

    removeQuote(quoteId) {
        let editQuote = {
            quoteId: quoteId,
            userId: user.id
        }
        $.ajax({
            method: 'POST',
            url: '/saysWho/quote/remove',
            data: editQuote,
            dataType: 'json',
            success: (data_Quote) => {
                console.log("Qoute removed");

            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });

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