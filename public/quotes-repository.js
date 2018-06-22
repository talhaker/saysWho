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
        this.user = {
            quotes : [],
             name: "",
             email: "",
             password: "",
             id:"5b296b53571da13b783101f0"
        };
        this.returnedQuotes = [];
        this.sessionToken = "3miH8uYml17fD/Ie7Ry+YbntH7C5/Dw42a66kXCu9IGnkRp287zHYVxcE4SJy55l0UdBNxuj/dzkTpt19gKDwQ==";
    }
    getQuotes(toFind) {
        if($('#findBy').val()=="")
        {
            toFind="";
            alert("You got random quotes")
        }
            
        let self = this;
        $.ajax({
            url: APP_API_URL + 'quotes'+toFind,
            headers: {
                'Authorization': 'Token token=' + this.sessionToken,
                'Authorization': 'Token token=' + APP_API_TOKEN,
                'Content-Type': 'application/json'
            },
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                // self.returnedQuotes = data.quotes; 
                 for(let i=0;i<data.quotes.length;i++){
                    self.returnedQuotes[i]=  {
                        api_tags:data.quotes[i].tags,
                        api_d: data.quotes[i].id,
                        text: data.quotes[i].body,
                        author: data.quotes[i].author
                    }
                 }


                $('#QuoteText').text(self.returnedQuotes[0].text);
                console.log('succes: ' + self.returnedQuotes);
            }
        });

    }

    userLogin(name, email, password) {
        debugger
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


    saveQuote (quoteBody,quoteId,tags,author,note,myTags)  {
        debugger
        let self = this;
       let newQuote={
        quote_text:quoteBody,
        quote_id: quoteId,
        quote_tags: tags,
        quote_author: author,
        user: self.user.id,
        user_note:note,
        user_tag:myTags
       }
       
        return $.ajax({
            method: 'POST',
            url: 'save_quote',
            data: newQuote,
            dataType: 'json',
            success: (data_Quote) => {         
                let myindex= self.user.quotes.length;  
                debugger
                for(let i=0;i<self.user.quotes.length;i++)  
                    {
                         if(self.user.quotes[i].api_d==newQuote.quote_id)
                           myindex=i;
                        
                    } 
                self.user.quotes[myindex]=data_Quote;
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
    let quote= this.returnedQuotes[index].text;
    
    $('#QuoteText').text(quote);
    }
    NextOrPreviousQuoteBook(index){
        debugger
        let quote= this.user.quotes[index].quote.text;
    
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