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
     
    }

    registerGoHome()
    {
        $('#goHome').on('click', () => {

              $('.imagPag').show();
              $('.body-quote').hide();
         })     
    }  

    registerUserLogin() {
        // Get all user's quotes
        $('#login').on('click', () => {
            
            let self = this;
            let $name = $('#userName');
            let $email = $('#userEmail');
            let $password = $('#userPass');
            if ($name.val() === '' || $email.val() === '' || $password.val() === '') {
                alert('Please enter name, email and password!');
            } else {
                $('#modalLogin').modal('toggle');

                this.quotesRepository.userLogin($name.val(), $email.val(), $password.val())
                    .then(() => {
                        console.log('User ' + $name.val() + ' successfully logged in');
                    })
                    .catch(() => { console.log('catch - error logging-in user ' + $name.val()); });
            }
        });
    }
    registerGetInspirationBook() {
        $('#book').on('click', () => {
            if (this.quotesRepository.user.email === "") {
                alert('To see your inspirational book, please log into your account');
                return;
            }

            $('.imagPag').hide();
            $('.body-quote').show();

            this.quotesRepository.getUserQuotes();

        });
    }
    registerOnLoadPage() {
        //call to all  Quotes user  
        debugger
        if (localStorage.getItem("UserName") != null & localStorage.getItem("UserPass") != null)
            {
                debugger
               let  name=  localStorage.getItem("UserName");
               let  email= localStorage.getItem("UserEmail");
               let  password=  localStorage.getItem("UserPass");
               this.quotesRepository.userLogin(name,email,password)

            }
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
                    $('.imagPag').hide();
                    $('.body-quote').show();


                    // $('.imagPag').show();
                    // $('.body-quote').hide();

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
                    this.quotesRepository.getQuotes(toFind);
                    //alert(toFind)
                })
                

    }

    registerFindByImg(){
        let part;
        $('.imgClick').mouseover( function(e){
        part= this.title;
        })

        $('.imgClick').click(()=>{          
            $('.imagPag').hide();
            $('.body-quote').show();
          let toFind="/?filter="+part
              this.quotesRepository.getQuotes(toFind);

        })
    }
    registerAddQuote() {
        $('#save').on('click', () => {
            if(localStorage.getItem("login")!=null)  {  
                debugger

               let myTags=[];
            let indexReturnedQuote= this.indexReturnedQuote;
            let quoteBody =this.quotesRepository.returnedQuotes[indexReturnedQuote].text;
            let quoteId=this.quotesRepository.returnedQuotes[indexReturnedQuote].api_d;
            let tags=this.quotesRepository.returnedQuotes[indexReturnedQuote].api_tags;
            let author=this.quotesRepository.returnedQuotes[indexReturnedQuote].author;
            let note=[$('#note').val()];
               myTags.push($('#tag').val());
            
            this.quotesRepository.saveQuote(quoteBody,quoteId,tags,author,note,myTags).then(() => {
                  console.log("good job")
                 }).catch(() => { console.log('catch- error in adding Quote function'); });
              }
              else{
                  alert("you need to login")
                $('#note').val("");
                $('#tag').val("");
                $('#modalSave').modal('toggle');
              }
 
            
        });

    }

    registerFindInBook(){
        $('#myBook').click(()=>{

            if(localStorage.getItem("login")!=null)  { 
                alert("asdasda")
        debugger
                // $('.imagPag').hide();
                // $('.body-quote').hide();
                // $('.body-quote').hide();
                if(this.quotesRepository.user.quotes.length>0)
                $('#QuoteText').text(this.quotesRepository.user.quotes[0].quote.text);
                else
                 $('#QuoteText').text("no quote yet");
        
             }
             
             $('#next-book').on('click', () => {
                if(this.indexQuote>=this.quotesRepository.user.quotes.length-1)
                 this.indexQuote=0;
                 else
                 this.indexQuote++
              this.quotesRepository.NextOrPreviousQuoteBook(this.indexQuote);
    
            });
            $('#previous-book').on('click', () => {   
                if(this.indexQuote<=0)
                this.indexQuote=this.quotesRepository.indexQuote.length-1;
                else
                this.indexQuote--;  
                this.quotesRepository.NextOrPreviousQuoteBook(this.indexQuote);
            });
        
        })
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