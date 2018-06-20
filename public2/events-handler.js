import { getMaxListeners } from "cluster";

"use strict";
/*=====================================================
This block manages the quote and user repositories
=======================================================*/

class EventsHandler {
    constructor(QuotesRepository, QuotesRenderer) {
        this.quotesRepository = QuotesRepository;
        this.quotesRenderer = QuotesRenderer;
        this.userLoginData = {
            name: "",
            password: "",
            email: ""
        };



        // this.$posts = $(".posts");
    }

    registerUserLogin() {
        // Get all user's quotes
        $('#login').on('click', () => {
            // let $name = $('#name');
            // let $email = $('#email');
            // let $password = $('#password');
            let $name = "Rachel";
            let $email = "racheltaz@getMaxListeners.com";
            let $password = "rachelTaz";
            if ($name.val() === '' || $email.val() === '' || $password.val() === '') {
                alert('Please enter name, email and password!');
            } else {
                this.quotesRepository.userLogin($name.val(), $email.val(), $password.val()).then(() => {
                    console.log('User ' + $name + ' successfully logged in');
                    this.quotesRenderer.renderPosts(this.postsRepository.posts);
                }).catch(() => { console.log('catch - error adding user ' + $name); });
                $name.val('');
                $email.val('');
                $password.val('');
            }
        });
    }

    registerGetInspirationBook() {
        // Get all user's quotes
        $('#book').on('click', () => {
            if (this.userLoginData.email === "") {
                alert('To see your inspirational book, lease log into your account');
                return;
            }
            this.quotesRepository.getUserQuotes();

        });
    }

    registerNextQuote() {
        // on page-Quotes  show the next quote
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