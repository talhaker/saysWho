"use strict";
/*=====================================================
This block manages the quote and user repositories
=======================================================*/

class EventsHandler {
    constructor(QuotesRepository) {
        this.quotesRepository = QuotesRepository;
        this.indexReturnedQuote = 0;
        this.indexQuote = 0

    }

    registerGoHome() {
        // Go back to homepage
        $('#go-home').on('click', () => {
            $('.imagPag').show();
            $('.body-quote').hide();
            $('.body-quote-book').hide();
        });
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
        $('#book').click(() => {
            this.indexQuote = 0;
            if (localStorage.getItem("login") != null) {
                if (this.quotesRepository.user.quotes.length > 0) {
                    this.quotesRepository.NextOrPreviousQuoteBook(this.indexQuote);
                } else {
                    this.quotesRepository.NextOrPreviousQuoteBook(this.indexQuote);
                }

                $('.imagPag').hide();
                $('.body-quote').hide();
                $('.body-quote-book').show();
            } else {
                alert('To see your inspirational book, please log into your account');
            }
        })

        $('#next-book').on('click', () => {
            if (this.indexQuote === this.quotesRepository.user.quotes.length - 1) {
                this.indexQuote = 0;
            } else {
                this.indexQuote++;
            }
            this.quotesRepository.NextOrPreviousQuoteBook(this.indexQuote);
        });

        $('#previous-book').on('click', () => {
            if (this.indexQuote === 0)
                this.indexQuote = this.quotesRepository.user.quotes.length - 1;
            else
                this.indexQuote--;
            this.quotesRepository.NextOrPreviousQuoteBook(this.indexQuote);
        });

    }


    registerOnLoadPage() {
        // Get login info from local storage
        if (localStorage.getItem("UserName") != null & localStorage.getItem("UserPass") != null) {

            let name = localStorage.getItem("UserName");
            let email = localStorage.getItem("UserEmail");
            let password = localStorage.getItem("UserPass");
            this.quotesRepository.userLogin(name, email, password)

        }
    }


    registerNextQuote() {
        // on page-Quotes, show the next quote
        $('#next').on('click', () => {
            if (this.indexReturnedQuote === this.quotesRepository.returnedQuotes.length - 1)
                this.indexReturnedQuote = 0;
            else
                this.indexReturnedQuote++
                this.quotesRepository.NextOrPreviousQuote(this.indexReturnedQuote);

        });
    }


    registerPreviousQuote() {
        // on page-Quotes, show the previous quote
        $('#previous').on('click', () => {
            if (this.indexReturnedQuote === 0)
                this.indexReturnedQuote = this.quotesRepository.returnedQuotes.length - 1;
            else
                this.indexReturnedQuote--;
            this.quotesRepository.NextOrPreviousQuote(this.indexReturnedQuote);
        });
    }


    registerFindQuoteFromApi() {
        $('#find').on('click', () => {
            this.indexReturnedQuote = 0;

            var toFind = '';
            let findby = $('#findBy').val(); ///tag,filter,author

            switch ($('#findQuote').val()) {
                case "filter": // /?filter=funny
                    toFind = "/?filter=" + findby;
                    break;
                case "tag":
                    toFind = "/?filter=" + findby + "&type=tag";
                    break;
                case "author": //author
                    toFind = "/?filter=" + findby + "&type=author";
                    break;
                default: //author
                    toFind = "/?filter=" + findby + "&type=author";
            }
            if ($('#findBy').val() == "") {
                toFind = "";
                alert("No search criteria specified. Performing random search")
            }
            this.quotesRepository.getQuotes(toFind)
                .then(() => {
                    $('.imagPag').hide();
                    $('.body-quote').show();
                    $('.body-quote-book').hide();
                })
        })
    }


    registerFindByImg() {
        let part;
        $('.imgClick').mouseover(function(e) {
            part = this.title;
        })

        $('.imgClick').click(() => {
            let toFind = "/?filter=" + part
            this.quotesRepository.getQuotes(toFind);

            $('.imagPag').hide();
            $('.body-quote').show();
            $('.body-quote-book').hide();
        })
    }

    registerAddQuote() {
        $('#save').on('click', () => {
            if (localStorage.getItem("login") != null) {
                let myTags = [];
                let indexReturnedQuote = this.indexReturnedQuote;
                let quoteBody = this.quotesRepository.returnedQuotes[indexReturnedQuote].text;
                let quoteId = this.quotesRepository.returnedQuotes[indexReturnedQuote].api_d;
                let tags = this.quotesRepository.returnedQuotes[indexReturnedQuote].api_tags;
                let author = this.quotesRepository.returnedQuotes[indexReturnedQuote].author;
                let note = [$('#note').val()];
                myTags.push($('#tag').val());

                this.quotesRepository.saveQuote(quoteBody, quoteId, tags, author, note, myTags)
                    .then(() => {
                        console.log("good job")
                    })
                    .catch(() => {
                        console.log('catch- error in adding Quote function');
                    });
            } else {
                alert('To save a quote into your inspirational book, please log into your account');
            }
            $('#note').val("");
            $('#tag').val("");
            $('#modalSave').modal('toggle');
        });
    }


    registerRemoveQuote() {
        $('#removeQuote').on('click', () => {
            let myQuote = this.quotesRepository.user.quotes[this.indexQuote];
            this.quotesRepository.user.quotes.splice(this.indexQuote, 1);
            this.indexQuote--;
            this.quotesRepository.RemoveQuote(myQuote.tags, myQuote._id)
                .then(() => {
                    this.quotesRepository.NextOrPreviousQuoteBook(this.indexQuote);
                })
        });
    }


    registerEditTagsAndNote() {
        $('#editInBook').on('click', () => {
            let myQuote = this.quotesRepository.user.quotes[this.indexQuote];
            if ($('#tag-book').val() != "") {

                let newTag = $('#tag-book').val();
                myQuote.tags.push(newTag);
                // this.quotesRepository.addTags(myQuote.tags,myQuote._id);
            }
            if ($('#note-book').val() != "") {
                let newNote = $('#note-book').val();
                myQuote.notes.push(newNote)
                console.log(" new info  note " + myQuote.notes);
                console.log(" new info  tags " + myQuote.tags)
            }
            this.quotesRepository.EditTagsAndNote(myQuote);
        })

    }
}


export default EventsHandler;