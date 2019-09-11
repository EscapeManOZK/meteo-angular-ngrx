import { Error } from '../model/error';

export interface AppState {
  readonly error: Error[];
}