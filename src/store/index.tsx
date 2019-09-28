import { applyMiddleware, createStore, combineReducers } from "redux";
import { entitiesReducer, queriesReducer, queryMiddleware } from 'redux-query';
import mockNetworkInterface from "../mock-network-interface";

export const getQueries = (state: { queries: any; }) => state.queries;
export const getEntities:any = (state: { entities: any; }) => state.entities;

// Add the entitiesReducer and queriesReducer to your combined reducer.
const reducer = combineReducers({
  entities: entitiesReducer,
  queries: queriesReducer,
});

// queryMiddleware requires two arguments: a selector that returns entities state, and a selector for the queries state.
export const store = createStore(
  reducer,
  applyMiddleware(queryMiddleware(mockNetworkInterface, getQueries, getEntities)),
);
