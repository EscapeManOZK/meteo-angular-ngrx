import { Injectable, EventEmitter } from '@angular/core';

export const apikey: string = '6D0NKl1qVpvibU0QV2VE6QraISzSLrKJ';

@Injectable()
export class SharedService {
    titleCity = new EventEmitter<any>();
}