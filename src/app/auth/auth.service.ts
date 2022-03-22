import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

const SIGN_UP_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBKxXjGYGxWz9gNY3yX90rQgiYqo2SMW50'
const SIGN_IN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBKxXjGYGxWz9gNY3yX90rQgiYqo2SMW50'

@Injectable({providedIn: 'root'})
export class AuthService {

  user = new BehaviorSubject<User>(null)
  constructor(private http: HttpClient){

  }

  signUp(email: string, password: string, ){
    return this.http.post<AuthResponseData>(SIGN_UP_URL, {
      email,
      password,
      returnSecureToken: true,
    }).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
    }))
  }

  logIn(email: string, password: string){
    return this.http.post<AuthResponseData>(SIGN_IN_URL, {
      email,
      password,
      returnSecureToken: true,
    }).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
    }))
  }

  private handleAuthentication(email: string, userId: string,  token: string, expiresIn: number){
    const expiraionDate = new Date(new Date().getTime() + +expiresIn*1000)
    const user = new User(email, userId, token, expiraionDate);

    this.user.next(user)
  }

  private handleError(errorRes: HttpErrorResponse){
    const error = errorRes?.error?.error?.message || 'Unknown error'
    return throwError(error);
  }
}
