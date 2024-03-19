import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, BehaviorSubject } from 'rxjs';
import { Score } from './score';
@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  apiUrl = 'http://localhost:4000'


  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'content-Type': 'application/json',
    }),
  };

  getScores(): Observable<Score[]> { 
    return this.http.get<Score[]>(this.apiUrl + '/scores') 
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  

  addScores(data: { playerName: any, score: any, timer: any, level: any }): Observable<Score> {
    const requestData = {
      playerName: data.playerName,
      score: data.score,
      timer: data.timer,
      level: data.level
    };
    console.log(requestData);
    return this.http.post<Score>(
      this.apiUrl + '/scores',
      JSON.stringify(requestData),
      this.httpOptions
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }


  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code : ${error.status}\nMessage:${error.message}`
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    })
  }
}
