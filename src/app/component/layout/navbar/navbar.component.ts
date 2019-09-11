import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cities } from 'src/app/model/cities';
import { HttpErrorResponse } from '@angular/common/http';
import { Error } from 'src/app/model/error';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/service/app.state';
import { TypeError } from 'src/app/model/type-error.enum';
import { CityService } from 'src/app/service/city.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() isCollapsed: Boolean;
  @Input() language: string;
  @Output() languageEvent = new EventEmitter<string>();

  inputValue: string;
  options: Cities[] = [];


  constructor(private cityService: CityService,
    private router: Router,
    private store: Store<AppState>) { 
    }

  ngOnInit() {
  }

  onInput(value: string): void {
      this.cityService.findAll(value, this.language)
      .subscribe(
        response => this.options = response.body, // success path
        (res: HttpErrorResponse) => {
          this.store.dispatch({
            type: 'ADD_ERROR',
            payload: <Error> {
              type: TypeError.ERROR,
              message: res.message,
              title: res.statusText
            }
          });
        }
      );
  }

  changeLanguage(data: string) {
    if (data !== this.language) {
      this.languageEvent.emit(data);
    }
  }

  searchCountrie() {
    let keys =  this.inputValue.split(' - ');
    if (keys.length == 2 && !isNaN(Number(keys[1]))) {
      let key = Number(keys[1]);
      this.router.navigate(['/meteo', key ]);
    }
  }

}
