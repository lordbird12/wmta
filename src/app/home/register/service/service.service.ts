import {
  HttpClient,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';
import { catchError, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
};

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  new(register: FormData): Observable<Register> {
    return this.http
      .post<Register>('https://api.logo-design360.com/wmta-api/public/api/register', register, httpOptions)
      .pipe(catchError((err) => this.handlerError(err)));
  }

  addAccount(register: FormData): Observable<dataResponse> {
    return this.http.post<dataResponse>('https://api.logo-design360.com/wmta-api/public/api/register', register, httpOptions)
    .pipe( 
      map((register: dataResponse) => {
      return register;
    }));
  }
  
  handlerError(error : any): Observable<never> {
    let errorMessage = 'Error unknown';
    if (error) {
      errorMessage = `Error ${error.error}`;
    }
    Swal.fire(
      "Warning!", //title
      ''+ errorMessage, //main text
      "error" //icon
    );
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }

}

export interface Register {
  //id: number;
  age: number;
  password: string;
  fname: string;
  lname: string;
  status: string;
  sex: string;
  phone: string;
  email: string;
  image: any;
  line: string;
  type: string;
  files: any;
}


export interface RegisterResponse extends Register {
  select_file: string;
}


export interface ForgotPassword {
  id: number;
  name_th: string;
  email: string;
  name_en: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}


export interface dataResponse extends dataRes {
  code: number;
  status: string;
  message: string;
  data: any[];
}

export interface dataRes {
  name: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
  status: string;
}