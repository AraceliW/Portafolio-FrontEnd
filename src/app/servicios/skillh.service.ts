import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skillh } from '../model/skillh';

@Injectable({
  providedIn: 'root'
})


export class SkillhService {

  ENDPOINT = 'http://localhost:8080/skillh';

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Skillh[]> {
    return this.httpClient.get<Skillh[]>(this.ENDPOINT + '/lista');
  }

  public detail(id: number): Observable<Skillh> {
    return this.httpClient.get<Skillh>(this.ENDPOINT + `/detail/${id}`);
  }

  public save(skillh: Skillh): Observable<any> {
    return this.httpClient.post<any>(this.ENDPOINT + '/create', skillh);
  }

  public update(id: number, skillh: Skillh): Observable<any> {
    return this.httpClient.put<any>(this.ENDPOINT + `/update/${id}`, skillh);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.ENDPOINT + `/delete/${id}`);
  }


}
