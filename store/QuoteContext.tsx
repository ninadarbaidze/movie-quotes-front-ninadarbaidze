/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useReducer, useState } from 'react';
import { Children, QuoteContextTypes, QuoteStateTypes } from 'types';

const initialState = {
  quoteEN: '',
  quoteGE: '',
  image: '',
  movieId: '',
  userId: '',
  _id: '',
};
const reducer = (
  state: QuoteStateTypes | any,
  action: { type: string; payload: QuoteStateTypes }
) => {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        ...action.payload,
      };
  }
};

export const QuoteContext = createContext({
  quoteCreationModal: false,
  quoteCreationStateHandler: (value: boolean) => {},
  isMovieQuote: false,
  movieQuoteCreationHandler: (value: boolean) => {},
  quoteState: initialState,
  getQuote: (data: QuoteStateTypes) => {},
  editQuoteModal: false,
  editQuoteHandler: (value: boolean) => {},
  refreshQuotes: false,
  refreshQuotesHandler: () => {},
  notificationState: false,
  notificationStateHandler: (value: boolean) => {},
});

export const QuoteContextProvider: React.FC<Children> = (props) => {
  const [quoteCreationModal, setQuoteCreationModal] = useState(false);
  const [isMovieQuote, setIsMovieQuote] = useState(false);
  const [editQuoteModal, setEditQuoteModal] = useState(false);
  const [refreshQuotes, setRefreshQuotes] = useState(false);
  const [notificationState, setNotificationState] = useState(false);

  const [quoteState, dispatchQuoteAction] = useReducer(reducer, initialState);

  const getQuote = (data: QuoteStateTypes) => {
    dispatchQuoteAction({
      type: 'ADD',
      payload: data,
    });
  };

  const quoteCreationStateHandler = (value: boolean) => {
    setQuoteCreationModal(value);
  };

  const movieQuoteCreationHandler = (value: boolean) => {
    setIsMovieQuote(value);
  };

  const refreshQuotesHandler = () => {
    setRefreshQuotes(!refreshQuotes);
  };
  const notificationStateHandler = (value: boolean) => {
    setNotificationState(value);
  };

  const editQuoteHandler = (value: boolean) => {
    setEditQuoteModal(value);
  };

  const contextValue: QuoteContextTypes = {
    quoteCreationStateHandler,
    quoteCreationModal,
    isMovieQuote,
    movieQuoteCreationHandler,
    quoteState,
    getQuote,
    editQuoteModal,
    editQuoteHandler,
    refreshQuotes,
    refreshQuotesHandler,
    notificationState,
    notificationStateHandler,
  };

  return (
    <QuoteContext.Provider value={contextValue}>
      {props.children}
    </QuoteContext.Provider>
  );
};
