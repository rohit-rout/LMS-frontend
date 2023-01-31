import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,private titleService:Title) { }

  
  apiUrl = 'http://localhost:4000';
  user:any;

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
  loadUser(current_user: any){
  
      localStorage.setItem('user',JSON.stringify(current_user));
      this.user=current_user;

  }
  setUser(){
    if(localStorage.getItem('user')){
      this.user=localStorage.getItem('user');
      this.user=JSON.parse(this.user);
      console.log(this.user);
   }
    
  }
  getUser():Observable<any>{
    return this.user;
  }

  login(data:any):Observable<any> {
    return this.http.post(`${this.apiUrl +'/login'}`,data);
  }

  createBooks(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl + '/book/new'}`,data)
  }
  getBooks(): Observable<any> {
    return this.http.get(`${this.apiUrl+'/books'}`);
  }
  getParticularBook(id:any):Observable<any> {
    return this.http.get(`${this.apiUrl+'/book'}/${id}`);
  }
  deleteBook(id: any): Observable<any> {
    console.log(id);
    return this.http.delete(`${this.apiUrl + '/book/delete'}/${id}`);
  }
  updateBook(id:any,data:any):Observable<any>{
    return this.http.post(`${this.apiUrl + '/book/edit'}/${id}`,data)
  }
}
