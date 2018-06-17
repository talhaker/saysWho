"use strict";
/*=====================================================
Our Setup - 
we are going to send requests to favqs (Fav Quotes) API 
so we need a bit more than usual!
=======================================================*/
/**
 * Class responsible for storing and manipulating quotes and user data, in-memory
 */
class QuotesRepository {
    constructor() {
        this.quotes = [];
        this.users = [];
        this.returnedQuotes = [];

        this.getUserQuotes();
    }

    // request all the posts from the DB
    getUserQuotes() {
        return $.ajax({
            method: 'Get',
            url: 'inspiration',
            success: (inspiration) => {
                // add the quotes
                this.quotes = inspirtion.quotes;
                this.users = inspirtion.users;
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
    }

    saveQuote(quoteId, tags, notes) {

        // return $.ajax({
        //     method: 'POST',
        //     url: 'quotes',
        //     data: {
        //         _id: quoteId,
        //         tags: tags,
        //         notes: notes
        //     },
        //     dataType: 'json',
        //     success: (newQuote) => {
        //         // Push quote if not already in array
        //         this.quotes.push(newQuote);
        //     },
        //     error: function(jqXHR, textStatus, errorThrown) {
        //         console.log(textStatus);
        //     }
        // });
        // this.quotesUser.push({ quote: quoteId, tags: [], notes: myNotes });

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