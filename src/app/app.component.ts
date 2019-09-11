import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';
import { SharedService } from './global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  liste_language = ['en', 'fr'];
  isCollapsed = false;
  title = 'MeteoAngularNgrx';
  listRoute = [];
  language = 'en';
  titleCity = '';
  isMeteo = false;
  constructor(private translate: TranslateService,
    private router: Router,
    private sharedService: SharedService) {
    this.sharedService.titleCity.subscribe(
      (data: any) => {
        console.log(data);
        this.titleCity = data;
      });

    translate.addLangs(this.liste_language)
    translate.setDefaultLang('en');
    translate.use('en');

    router.events.subscribe((val) => {
      // see also 
      if (val instanceof NavigationEnd) {
        this.listRoute = [];
        this.isMeteo = false;
        if (val.urlAfterRedirects === '/') {
          this.listRoute.push('home');
        } else {
          const url = val.urlAfterRedirects.split('/');
          url.forEach((str) => {
            if (str !== "") {
              this.listRoute.push(str);
            }
            if (str === "meteo") {
              this.isMeteo = true;
            }
          });
        }
      }
    });
  }

  languageEvent(data: string) {
    this.liste_language.forEach((str) => {
      if (str === data) {
        this.translate.use(str);
        this.language = str;
      }
    });
  }

}
