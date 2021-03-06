import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { ICities } from '../model/cities';
import { Observable } from 'rxjs';
import { apikey } from '../global';

type EntityResponseType = HttpResponse<ICities>;
type EntityArrayResponseType = HttpResponse<ICities[]>;


@Injectable({
  providedIn: 'root'
})
export class CityService {
  
  public resourceUrl = 'http://dataservice.accuweather.com/locations/v1';

  constructor(protected http: HttpClient) { }

  findOne(id: string, language: string): Observable<EntityResponseType> {
    return this.http
      .get<ICities>(`${this.resourceUrl}/${id}?apikey=${apikey}&language=${language}`, { observe: 'response' });
  }

  findAll(str: string, language: string): Observable<EntityArrayResponseType> {
    return this.http
      .get<ICities[]>(`${this.resourceUrl}/cities/autocomplete?apikey=${apikey}&q=${str}&language=${language}`, { observe: 'response' });
  }
}
