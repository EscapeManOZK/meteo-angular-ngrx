import { TypeError } from './type-error.enum'

export interface Error {
    id: number;
    type: TypeError;
    message: string;
    title: string;
}
