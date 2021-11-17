/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

export const CHANGE_QUERY_SEARCH = 'CHANGE_QUERY_SEARCH';

interface SearchQueryState {
  searchQuery: string;
}

let searchQueryState: SearchQueryState;
let listeners: Array<React.Dispatch<React.SetStateAction<SearchQueryState>>> = [];
let actions: any = {};

interface UseSearchProps {
  searchQueryState: SearchQueryState;
  dispatch: (actionIdentifier: string, payload: any) => void;
}

const useSearch = (shouldListen = true): UseSearchProps => {
  const [, setSearchQuery] = useState(searchQueryState);

  const dispatch = (actionIdentifier: string, payload: any) => {
    const newSearchQueryState = actions[actionIdentifier](searchQueryState, payload);
    searchQueryState = { ...searchQueryState, ...newSearchQueryState };

    listeners.forEach((listener) => listener(searchQueryState));
  };

  useEffect(() => {
    if (shouldListen) {
      listeners.push(setSearchQuery);
    }
    return () => {
      if (shouldListen) {
        listeners = listeners.filter((listener) => listener !== setSearchQuery);
      }
    };
  }, [shouldListen]);

  return {
    searchQueryState,
    dispatch
  };
};

const initSearchQueryState = (userActions: any, initialState: SearchQueryState): void => {
  searchQueryState = { ...searchQueryState, ...initialState };

  actions = { ...actions, ...userActions };
};

export const configureSearchQueryState = (): void => {
  const userActions = {
    CHANGE_QUERY_SEARCH: (
      currentSearchQueryState: SearchQueryState,
      newSearchQuery: string
    ): SearchQueryState => {
      return { ...currentSearchQueryState, searchQuery: newSearchQuery };
    }
  };

  const initialSearchQueryState: SearchQueryState = { searchQuery: '' };

  initSearchQueryState(userActions, initialSearchQueryState);
};

export default useSearch;
