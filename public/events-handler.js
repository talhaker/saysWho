"use strict";
/*=====================================================
This block manages the quote and user repositories
=======================================================*/

class EventsHandler {
    constructor(QuotesRepository, QuotesRenderer) {
        this.quotesRepository = QuotesRepository;
        this.quotesRenderer = QuotesRenderer;
        this.indexReturnedQuote = 0;
        this.indexQuote = 0

    }

    registerUserLogin() {
        // Get all user's quotes
        $('#login').on('click', () => {
            let self = this;
            let $name = "Rachel";
            let $email = "racheltaz@gmail.com";
            let $password = "rachelTaz";
            if ($name === '' || $email === '' || $password === '') {
                alert('Please enter name, email and password!');
            } else {
                this.quotesRepository.userLogin($name, $email, $password)
                    .then(() => {
                        console.log('User ' + $name + ' successfully logged in');
                        // this.quotesRenderer.renderPosts(this.postsRepository.posts);
                    })
                    .catch(() => { console.log('catch - error adding user ' + $name); });
            }
            // let $name = $('#name');
            // let $email = $('#email');
            // let $password = $('#password');
            // if ($name.val() === '' || $email.val() === '' || $password.val() === '') {
            //     alert('Please enter name, email and password!');
            // } else {
            //     this.quotesRepository.userLogin($name.val(), $email.val(), $password.val()).then(() => {
            //         console.log('User ' + $name + ' successfully logged in');
            //         this.quotesRenderer.renderPosts(this.postsRepository.posts);
            //     }).catch(() => { console.log('catch - error adding user ' + $name); });
            //     $name.val('');
            //     $email.val('');
            //     $password.val('');
            // }
        });
    }

    registerGetInspirationBook() {
        // Get all user's quotes
        $('#book').on('click', () => {
            if (this.userLoginData.email === "") {
                alert('To see your inspirational book, please log into your account');
                return;
            }
            this.quotesRepository.getUserQuotes();

        });
    }

    registerNextQuote() {
        // on page-Quotes  show the next quote
        $('#next').on('click', () => {
            if (this.indexReturnedQuote >= this.quotesRepository.returnedQuotes.length - 1)
                this.indexReturnedQuote = 0;
            else
                this.indexReturnedQuote++
                this.quotesRepository.NextOrPreviousQuote(this.indexReturnedQuote);

        });
    }

    registerPreviousQuote() {
        // on page-Quotes  show the previous  Quote
        $('#previous').on('click', () => {
            if (this.indexReturnedQuote <= 0)
                this.indexReturnedQuote = this.quotesRepository.returnedQuotes.length - 1;
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
            var toFind = '';
            let findby = $('#findBy').val(); ///tag,filter,author

            switch ($('#findQuote').val()) {
                case "filter": // /?filter=funny
                    toFind = "/?filter=" + findby;
                    break;
                case "tag":
                    toFind = "/?filter=" + findby + "&type=tag";
                    break;
                default: //author
                    toFind = "/?filter=" + findby + "&type=author";
            }
            debugger
            this.quotesRepository.getQuotes(toFind);
            //alert(toFind)
        })


    }
    registerAddQuote() {
        $('#save').on('click', () => {


            let myTags = [];
            let indexReturnedQuote = this.indexReturnedQuote;
            let quoteBody = this.quotesRepository.returnedQuotes[indexReturnedQuote].body;
            let quoteId = this.quotesRepository.returnedQuotes[indexReturnedQuote].id;
            let tags = this.quotesRepository.returnedQuotes[indexReturnedQuote].tags;
            let author = this.quotesRepository.returnedQuotes[indexReturnedQuote].author;
            let note = [$('#note').val()];
            myTags.push($('#tag').val());

            this.quotesRepository.saveQuote(quoteBody, quoteId, tags, author, note, myTags).then(() => {
                console.log("good job")
            }).catch(() => { console.log('catch- error in adding Quote function'); });


        });

    }

    registerRemoveQuote() {

    }


    registerAddTags() {
        $('#save2').on('click', () => {


            let indexReturnedQuote = this.indexReturnedQuote;
            let quoteBody = this.quotesRepository.returnedQuotes[indexReturnedQuote].body;
            let quoteId = this.quotesRepository.returnedQuotes[indexReturnedQuote].id;
            let tags = this.quotesRepository.returnedQuotes[indexReturnedQuote].tags;
            let author = this.quotesRepository.returnedQuotes[indexReturnedQuote].author;
            //userId
            this.quotesRepository.saveQuote(quoteBody, quoteId, tags, author, "5b2830a0c467cf187457a874").then(() => {
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