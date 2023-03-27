import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Header } from '../model/header';

@Injectable({
  providedIn: 'root'
})


export class HeaderService {

  ENDPOINT = 'http://localhost:8080/header';


  constructor(private http: HttpClient) { }


  public lista(): Observable<Header[]> {
    return this.http.get<Header[]>(this.ENDPOINT + '/lista');
  }


  public getHeader(): Observable<Header> {
    return this.http.get<Header>(this.ENDPOINT + '/traer-header');
  }


  public detail(id: number): Observable<Header> {
    return this.http.get<Header>(this.ENDPOINT + `/detail/${id}`);
  }


  /*public save(header: Header): Observable<any> {
    return this.http.post<any>(this.ENDPOINT + 'create', header);
  }*/


  public update(id: number, header: Header): Observable<any> {
    return this.http.put<any>(this.ENDPOINT + `/update/${id}`, header);
  }


  /*public delete(id: number): Observable<any> {
    return this.http.delete<any>(this.ENDPOINT + `delete/${id}`);
  }*/


}
