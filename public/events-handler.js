"use strict";
/*=====================================================
This block manages the quote and user repositories
=======================================================*/

class EventsHandler {
    constructor(QuotesRepository, QuotesRenderer) {
        this.quotesRepository = QuotesRepository;
        this.quotesRenderer = QuotesRenderer;
        this.indexReturnedQuote=0;
        this.indexQuote=0
     



        // this.$posts = $(".posts");
    }
    registerOnLoadPage() {
        //call to all  Quotes user  
        // this.quotesRepository.getQuotes();
    }

    registerNextQuote() {
        // on page-Quotes  show the next  Quote
        $('#next').on('click', () => {
            if(this.indexReturnedQuote>=this.quotesRepository.returnedQuotes.length-1)
             this.indexReturnedQuote=0;
             else
             this.indexReturnedQuote++
        this.quotesRepository.NextOrPreviousQuote(this.indexReturnedQuote);

        });
    }

    registerPreviousQuote() {
        // on page-Quotes  show the previous  Quote
        $('#previous').on('click', () => {   
            if(this.indexReturnedQuote<=0)
            this.indexReturnedQuote=this.quotesRepository.returnedQuotes.length-1;
            else
            this.indexReturnedQuote--;  
            this.quotesRepository.NextOrPreviousQuote(this.indexReturnedQuote);
        });
    }

    registerFindQuoteFromApi() {
                // $('#findQuote').on('change', () => {
                //     alert($('#findQuote').val());
                // })
                $('#find').on('click', () => { 
                    var toFind='';
                    let findby=$('#findBy').val();  ///tag,filter,author
                    
                    switch($('#findQuote').val()) {
                        case "filter":// /?filter=funny
                        toFind="/?filter="+findby; 
                            break;
                        case "tag":
                        toFind="/?filter="+findby+"&type=tag" ; 
                            break;
                        default:  //author
                        toFind="/?filter="+findby+"&type=author" ; 
                    } 
                    debugger
                    this.quotesRepository.getQuotes(toFind);
                    //alert(toFind)
                })
                

    }
    registerAddQuote() {
        $('#save').on('click', () => {


            let indexReturnedQuote= this.indexReturnedQuote;
            let quoteBody =this.quotesRepository.returnedQuotes[indexReturnedQuote].body;
            let quoteId=this.quotesRepository.returnedQuotes[indexReturnedQuote].id;
            let tags=this.quotesRepository.returnedQuotes[indexReturnedQuote].tags;
            let author=this.quotesRepository.returnedQuotes[indexReturnedQuote].author;
                                                                           //userId
            this.quotesRepository.saveQuote(quoteBody,quoteId,tags,author,"5b2830a0c467cf187457a874").then(() => {
                  console.log("good job")
                 }).catch(() => { console.log('catch- error in adding Quote function'); });
 
            
        });

    }

    registerRemoveQuote() {

    }


    registerAddTags() {
        $('#save2').on('click', () => {


            let indexReturnedQuote= this.indexReturnedQuote;
            let quoteBody =this.quotesRepository.returnedQuotes[indexReturnedQuote].body;
            let quoteId=this.quotesRepository.returnedQuotes[indexReturnedQuote].id;
            let tags=this.quotesRepository.returnedQuotes[indexReturnedQuote].tags;
            let author=this.quotesRepository.returnedQuotes[indexReturnedQuote].author;
                                                                           //userId
            this.quotesRepository.saveQuote(quoteBody,quoteId,tags,author,"5b2830a0c467cf187457a874").then(() => {
                  console.log("good job")
                 }).catch(() => { console.log('catch- error in adding Quote function'); });
 
            
        });

    }

    registerRemoveTags() {

    }

    registerAddNote() {

    }

    registerRemoveNote() {

    }

}

export default EventsHandler;