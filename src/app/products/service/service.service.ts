import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError, Operator, of } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';

const helper = new JwtHelperService();

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
};

const httpOptions2 = {
  headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data;' })
};

declare const $: any;

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient, private router: Router) {

   }

  
  //รายการสินค้าและคอร์สรักษาทั้งหมด
  listProduct(): Observable<any> {
    return this.http.get('https://api.logo-design360.com/wmta-api/public/api/products').pipe(catchError((err) => this.handlerError(err)));
  }

  //แสดงรายละเอียดสินค้าและคอร์สรักษา
  getProduct(id : any): Observable<any> {
    return this.http.get('https://api.logo-design360.com/wmta-api/public/api/products/'+ id).pipe(catchError((err) => this.handlerError(err)));
  }

  newProduct(register: FormData): Observable<Register> {
    return this.http
      .post<Register>('https://api.logo-design360.com/wmta-api/public/api/products', register, httpOptions2)
      .pipe(catchError((err) => this.handlerError(err)));
  }

  addProduct(products: FormData): Observable<dataResponse> {
    return this.http.post<dataResponse>('https://api.logo-design360.com/wmta-api/public/api/products', products, httpOptions2)
    .pipe( 
      map((products: dataResponse) => {
      return products;
    }));
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