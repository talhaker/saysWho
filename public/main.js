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
eventsHandler.registerNextQuote();
eventsHandler.registerPreviousQuote();

eventsHandler.registerAddQuote();
eventsHandler.registerRemoveQuote();

eventsHandler.registerAddNote();
eventsHandler.registerRemoveNote();
eventsHandler.registerFindQuoteFromApi() ;


$('#searchResults').on('click', () => {

window.location = "searchResults.html";
  });