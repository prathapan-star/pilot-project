import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { retry,catchError,BehaviorSubject } from 'rxjs';
import { Player } from './player';
@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  private playerNameSource = new BehaviorSubject<string>('');
  playerName$ = this.playerNameSource.asObservable();
  playerNameExists: boolean = false;
  apiUrl='http://localhost:3000'

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers:new HttpHeaders({
      'content-Type':'application/json',
    }),
  };

  createPlayers(player:any) : Observable<Player>{
    console.log(player);
    return this.http.post<Player>(
      this.apiUrl+'/players',JSON.stringify(player),this.httpOptions
    ).pipe(retry(1),catchError(this.handleError));
  }

  setPlayerName(playerName: string) {
    this.playerNameSource.next(playerName);
  }

  handleError(error:any)  {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage=error.error.message;
    } else {
      errorMessage = `Error Code : ${error.status}\nMessage:${error.message}`
    }
    window.alert(errorMessage);
    return throwError(()=>{
      return errorMessage;
    })
  }

}
