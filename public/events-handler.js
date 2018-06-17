"use strict";
/*=====================================================
This block manages the quote and user repositories
=======================================================*/

class EventsHandler {
    constructor(QuotesRepository, QuotesRenderer) {
        this.quotesRepository = QuotesRepository;
        this.quotesRenderer = QuotesRenderer;



        // this.$posts = $(".posts");
    }
    registerOnLoadPage() {
        //call to all  Quotes user  
    }

    registerNextQuote() {
        // on page-Quotes  show the next  Quote
        $('#next').on('click', () => {
            this.quotesRepository.getQuotes();

        });
    }

    registerPreviousQuote() {
        // on page-Quotes  show the previous  Quote
        $('#previous').on('click', () => {});
    }

    registerAddQuote() {
        // $('#addpost').on('click', () => {
        //     let $inputText = $('#postText');
        //     let $inputTitle = $('#postTitle');
        //     let $inputUser = $('#postUser');
        //     if ($inputText.val() === '' || $inputTitle.val() === '' || $inputUser.val() === '') {
        //         alert('Please enter text, username and title!');
        //     } else {
        //         this.postsRepository.addPost($inputText.val(), $inputTitle.val(), $inputUser.val()).then(() => {
        //             this.postsRenderer.renderPosts(this.postsRepository.posts);
        //         }).catch(() => { console.log('catch- error in adding post function'); });
        //         $inputText.val('');
        //         $inputTitle.val('');
        //         $inputUser.val('');
        //     }
        // });

    }

    registerRemoveQuote() {

    }


    registerAddTags() {

    }

    registerRemoveTags() {

    }

    registerAddNote() {

    }

    registerRemoveNote() {

    }

}

export default EventsHandler;