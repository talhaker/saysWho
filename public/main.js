"use strict";
/*=====================================================
Main file - initialization & setup done here
=======================================================*/
import EventsHandler from './events-handler.js';
import QuotesRepository from './quotes-repository.js';
import QuotesRenderer from './quotes-renderer.js';

let quotesRepository = new QuotesRepository();
let quotesRenderer = new QuotesRenderer();
let eventsHandler = new EventsHandler(quotesRepository, quotesRenderer);


eventsHandler.registerOnLoadPage();


eventsHandler.registerGoHome();
eventsHandler.registerUserLogin();
eventsHandler.registerNextQuote();
eventsHandler.registerPreviousQuote();

eventsHandler.registerAddQuote();
eventsHandler.registerEditTagsAndNote();

eventsHandler.registerFindQuoteFromApi();
eventsHandler.registerFindByImg();


eventsHandler.registerRemoveQuote();
eventsHandler.registerRemoveNote();

eventsHandler.registerGetInspirationBook();

// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}