import { Component, OnInit } from '@angular/core';
import { Error } from 'src/app/model/error';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/service/app.state';
import { NzNotificationService } from 'ng-zorro-antd';
import { TypeError } from 'src/app/model/type-error.enum'


@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  list_error: Error[];

  errors: Observable<Error[]>;
  constructor(private store: Store<AppState>,
    private notification: NzNotificationService) {
    this.errors = this.store.select(state => state.error);
    this.list_error = [];
  }

  ngOnInit() {
    this.errors.subscribe(
      (res) => {
        let new_errors = [];
        res.forEach((value) => {
          let find = false;
          this.list_error.forEach((value2) => {
            if (value.id == value2.id) {
              find = true;
            }
          });
          if (!find) {
            new_errors.push(value);
          }
        });
        if (new_errors.length > 0) {
          let type = '';

          for (let i = 0; i < new_errors.length; i++) {
            this.notification.create(
              this.defineType(new_errors[i].type),
              new_errors[i].title,
              new_errors[i].message
            ).onClose.subscribe((value) => {
              this.deleteError(new_errors[i].id);
            });
          }
        }
        this.list_error = res;
      });
  }

  defineType(type: TypeError): string {
    switch (type) {
      case TypeError.SUCCESS:
      return 'success';
      case TypeError.INFO:
      return 'info';
      case TypeError.WARNING:
      return 'warning';
      case TypeError.ERROR:
      return 'error';
      default:
        return '';
    }
  }

  deleteError(value: number) {
    let index = -1;
    for(let i=0; i < this.list_error.length && index == -1; i++) {
      if (this.list_error[i].id == value) {
        index = i;
      }
    }
    if (index !== -1) {
      this.store.dispatch({
        type: 'DELETE_ERROR',
        id: value
      });
    }
  }
}
