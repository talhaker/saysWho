"use strict";
/*=====================================================
Main file - initialization & setup done here
=======================================================*/
import QuotesRepository from './quotes-repository.js';
import QuotesRenderer from './quotes-renderer.js';
import EventsHandler from './events-handler.js';

let quotesRepository = new QuotesRepository();
let quotesRenderer = new QuotesRenderer();
let eventsHandler = new EventsHandler(quotesRepository, quotesRenderer);

eventsHandler.onLoadPage();
eventsHandler.nextQuote();
eventsHandler.previousQuote();

eventsHandler.registerAddQuote();
eventsHandler.registerRemoveQuote();

eventsHandler.registerAddNote();
eventsHandler.registerRemoveNote();