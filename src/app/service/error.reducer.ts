import { Action } from '@ngrx/store';
import { Error } from '../model/error';

export const ADD_ERROR = 'ADD_ERROR';
export const DELETE_ERROR = 'DELETE_ERROR';


export function addErrorReducer(state: Error[] = [], action) {
  switch (action.type) {
    case ADD_ERROR:
        var id = 0;
        if (state.length > 0) {
           id = state[state.length -1].id;
           id++;
        }
        action.payload.id = id;
        return [...state, action.payload];
    case DELETE_ERROR:
        if (action.id > -1) {
            state.splice(action.id, 1);
         }
        return [...state];
    default:
        return state;
    }
}