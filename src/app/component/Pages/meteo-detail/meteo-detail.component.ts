import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Cities } from 'src/app/model/cities';
import { CityService } from 'src/app/service/city.service';
import { WeatherService } from 'src/app/service/weather.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/service/app.state';
import { Error } from 'src/app/model/error';
import { TypeError } from 'src/app/model/type-error.enum';
import { SharedService } from 'src/app/global';
import { Weather } from 'src/app/model/weather';
import * as moment from 'moment';



@Component({
  selector: 'app-meteo-detail',
  templateUrl: './meteo-detail.component.html',
  styleUrls: ['./meteo-detail.component.css']
})
export class MeteoDetailComponent implements OnInit {

  currentCity: Cities;
  currentWeather: Weather;
  language: string;
  
  loading = true;
  id: any;

  constructor(
    private route: ActivatedRoute,
    private cityService: CityService,
    private weatherService: WeatherService,
    private translate: TranslateService,
    private store: Store<AppState>,
    private sharedService: SharedService
  ) {
    this.currentCity = new Cities();
    this.currentWeather = new Weather();
  }

  ngOnInit() {
    this.language = this.translate.currentLang;
    this.route.snapshot.paramMap.get('id');
    this.route.paramMap.subscribe((params : ParamMap)=> {  
      this.id=params.get('id');  
      this.findCity(this.id);
      this.findWeather(this.id);
    }); 
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.language = this.translate.currentLang;
      this.loading = true;
      this.findCity(this.id);
      this.findWeather(this.id);
    });
  }

  private findCity(id: string) {
    this.cityService.findOne(id, this.language)
      .subscribe(response => {
        this.currentCity = response.body;
        this.sharedService.titleCity.emit(this.currentCity.LocalizedName);
      }, // success path
        (res: HttpErrorResponse) => {
          this.store.dispatch({
            type: 'ADD_ERROR',
            payload: <Error>{
              type: TypeError.ERROR,
              message: res.message,
              title: res.statusText
            }
          });
        });
  }

  private findWeather(id: string) {
    this.weatherService.findOneByCityId(id, this.language).subscribe(response => { 
        this.currentWeather = this.DateParse(response.body);
        this.loading= false;
      }, // success path
      (res: HttpErrorResponse) => {
        this.store.dispatch({
          type: 'ADD_ERROR',
          payload: <Error>{
            type: TypeError.ERROR,
            message: res.message,
            title: res.statusText
          }
        });
      });
  }
  DateParse(body: Weather): Weather {
      body.Headline.EffectiveDate =  moment(body.Headline.EffectiveDate).format('MM/DD/YYYY');
      body.DailyForecasts.forEach((value) => {
        console.log(value);
        value.Date = moment(value.Date).format('MM/DD/YYYY');
      });
      return body;
  }
}
