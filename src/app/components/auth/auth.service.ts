import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { User, UserResponse } from '@app/shared/models/user.interface';
import { catchError, map } from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { 
    this.checkToken();
  }

  get isLogged():Observable<boolean>{
    return this.loggedIn.asObservable();
  }

  login(authData:User):Observable<UserResponse | void>{

    return this.http.post<UserResponse>(`${environment.API_URL}/auth/login`,
     authData).pipe(
       map((res:UserResponse) =>{
        this.saveToken(res.token);
        this.loggedIn.next(true);
        return res;


}),

       catchError( (err) => this.handlerError(err))
     );   
  }

  logout():void{
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  
  }
  private checkToken():void{
    const userToken = localStorage.getItem('token');
    const isExpired = helper.isTokenExpired(userToken);
    console.log('isExpired->', isExpired);

    isExpired ? this.logout() : this.loggedIn.next(true);
    // if(isExpired){
    //   this.logout();
    // }else{

    //  this.loggedIn.next(true);
    // }
    //set userisLogged = isExpired
  }
  private saveToken(token: string):void{
    localStorage.setItem('token',token);
  }
  
  
  private handlerError(err):Observable<never>{

    let errorMessage = 'An error occured restrienving data';
    if(err){

      errorMessage = `Error: code ${err.message}`;

    }

    window.alert(errorMessage);

    return throwError(errorMessage);
    
    
    

  }

}
