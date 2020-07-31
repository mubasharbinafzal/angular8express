import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private ROOT_URL = "https://angular8express.herokuapp.com/expressjs/api/user";
  constructor(private http: HttpClient , private router:Router) { }

  register(user){
    return this.http.post<any>(`${this.ROOT_URL}/register`,user);
  }
  login(user){
    return this.http.post<any>(`${this.ROOT_URL}/login`,user);  
  }

  logOut(){
    localStorage.removeItem("token");
    this.router.navigate(["/listing"]);
  } 
  loggedIn(){
    return !!localStorage.getItem("token");
  } 
}
 
