import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError, Operator, of } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';

const helper = new JwtHelperService();

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
};

declare const $: any;

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient, private router: Router) {
    
  } 

  //รายการข่าวสารทั่วไป
  listNews(): Observable<any> {
    return this.http.get('https://api.logo-design360.com/wmta-api/public/api/news').pipe(catchError((err) => this.handlerError(err)));
  }

  handlerError(error: any): Observable<any> {
    let errorMessage = 'Error unknown';
    if (error) {
      errorMessage = `Error ${error.error.message}`;
    }
    Swal.fire(
      "Warning!", //title
      ''+ errorMessage, //main text
      "error" //icon
    );
    return throwError(error.error);
    // console.error(error); 
    // return of(error.error as any);
  }

}