import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';

const helper = new JwtHelperService();

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private user : any;

  constructor(private http: HttpClient, private router: Router) {
    //this.checkToken();
  } 
  

  login(email: string, password: string): Observable<any> {
    return this.http.post('https://api.logo-design360.com/wmta-api/public/api/login', {
      email,
      password
    }, httpOptions).pipe(map((user: any) => {
      this.saveLocalStorage(user);
      this.user.next(user);
      return user;
    }));
  }

  handlerError(error: any): Observable<never> {
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
  }

  //เช็คข้อมูล localStorage
  public checkToken(): void {
    const user = JSON.parse(localStorage.getItem('user') || '0');
    if (user) {
      const isExpired = helper.isTokenExpired(user.token);
      if (isExpired) {
        this.logout();
      } else {
        this.user.next(user);
      }
    } else {
      this.logout();
    }
  }

  //บันทึกข้อมูล localStorage
  public saveLocalStorage(user: UserResponse): void {
    const { email, message, ...rest } = user;
    localStorage.setItem('user', JSON.stringify(rest));
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }

  
  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
      this.user.next(null);
    });
    
  }


}

export interface User {
  email: any;
  password: any;
}

export interface UserResponse extends User {
  code: any;
  status: any;
  message: any;
  token: any;
  data: [];
}

